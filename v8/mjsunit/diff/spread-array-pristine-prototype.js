// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
// NOTE:
// Tests in this file are meant to run in the presence of a valid
// NoElementsProtector. Do not touch Array.prototype here.
(function TestBasics() {
  var a = [1, 2];
  var b = [...a];
  [1, 2];
  b;
  ['a', 'b', 'c', 'd', 'e', 'f'];
  ['a', ...'bc', 'd', ...'ef'];
})();

var log = [];

function* gen1(n) {
  log.push(n, 1);
  yield 1;
  log.push(n, 2);
  yield 2;
  log.push(n, 3);
  yield 3;
  log.push(n, 'done');
}

function id(v) {
  log.push(v);
  return v;
}

(function TestGenerator() {
  [1, 2, 3];
  [...gen('a')];
  ['x', 1, 2, 3, 'y', 1, 2, 3, 'z'];
  ['x', ...gen('a'), 'y', ...gen('b'), 'z'];
})();

(function TestOrderOfExecution() {
  log = [];
  ['x', 1, 2, 3, 'y', 1, 2, 3, 'z'];
  [id('x'), ...gen('a'), id('y'), ...gen('b'), id('z')];
  ['x', 'a', 1, 'a', 2, 'a', 3, 'a', 'done', 'y', 'b', 1, 'b', 2, 'b', 3, 'b', 'done', 'z'];
  log;
})();

(function TestNotIterable() {
  var a;

  (function () {
    a = [...42];
  })();

  TypeError;
  undefined;
  a;
})();

(function TestInvalidIterator() {
  var iter = {
    [Symbol.iterator]: 42
  };
  var a;

  (function () {
    a = [...iter];
  })();

  TypeError;
  undefined;
  a;
})();

(function TestIteratorNotAnObject() {
  var iter = {
    [Symbol.iterator]() {
      return 42;
    }

  };
  var a;

  (function () {
    a = [...iter];
  })();

  TypeError;
  undefined;
  a;
})();

(function TestIteratorNoNext() {
  var iter = {
    [Symbol.iterator]() {
      return {};
    }

  };
  var a;

  (function () {
    a = [...iter];
  })();

  TypeError;
  undefined;
  a;
})();

(function TestIteratorResultDoneThrows() {
  function MyError() {
    ;
  }

  var iter = {
    [Symbol.iterator]() {
      return {
        next() {
          return {
            get done() {
              throw new MyError();
            }

          };
        }

      };
    }

  };
  var a;

  (function () {
    a = [...iter];
  })();

  MyError();
  undefined;
  a;
})();

(function TestIteratorResultValueThrows() {
  function MyError() {
    ;
  }

  var iter = {
    [Symbol.iterator]() {
      return {
        next() {
          return {
            done: false,

            get value() {
              throw new MyError();
            }

          };
        }

      };
    }

  };
  var a;

  (function () {
    a = [...iter];
  })();

  MyError();
  undefined;
  a;
})();

(function TestOptimize() {
  function f() {
    return [...'abc'];
  }

  ['a', 'b', 'c'];
  f();
  ['a', 'b', 'c'];
  f();
})();

(function TestDeoptimize() {
  var iter = {
    [Symbol.iterator]() {
      var i = 0;
      return {
        next() {
          return {
            value: ++i,
            done: i === 3
          };
        }

      };
    }

  };

  function f() {
    return [0, ...iter];
  }

  [0, 1, 2];
  f();
})();