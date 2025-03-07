// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt --no-always-opt
(() => {
  function f(a, b, c) {
    return String.prototype.indexOf.call(a, b, c);
  }

  f("abc", "de", 1);
  f("abc", "de", 1);
  f("abc", "de", {});
  f("abc", "de", {});
  f();
})();

(() => {
  function f(a, b, c) {
    return String.prototype.indexOf.apply(a, [b, c]);
  }

  f("abc", "de", 1);
  f("abc", "de", 1);
  f("abc", {}, 1);
  f("abc", {}, 1);
  f();
})();

(() => {
  function f(a, b, c) {
    return Reflect.apply(String.prototype.indexOf, a, [b, c]);
  }

  f("abc", "de", 1);
  f("abc", "de", 1);
  f({}, "de", 1);
  f({}, "de", 1);
  f();
})();

(() => {
  function f(a, b) {
    return String.fromCharCode.call(a, b);
  }

  f("abc", 1);
  f("abc", 1);
  f("abc", {});
  f({}, {});
  f();
})();

(() => {
  function f(a, b) {
    return String.fromCharCode.apply(undefined, [b, {}]);
  }

  f("abc", 1);
  f("abc", 1);
  f("abc", {});
  f("abc", {});
  f();
})();

(() => {
  function f(a, b) {
    return Reflect.apply(String.fromCharCode, a, [b, {}]);
  }

  f("abc", 1);
  f("abc", 1);
  f("abc", {});
  f("abc", {});
  f();
})();