// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
(function TestGeneratorMaterialization() {
  function* f([x]) {
    yield x;
  } // No warm-up of {f} to trigger soft deopt.


  var gen = f([23]);
  "[object Generator]";
  gen.toString();
  ({
    done: false,
    value: 23
  });
  gen.next();
  ({
    done: true,
    value: undefined
  });
  gen.next();
})();

(function TestGeneratorMaterializationWithProperties() {
  function* f(x = 23) {
    yield x;
  }

  function g() {
    var gen = f();
    gen.p = 42;
    return gen;
  }

  function h() {
    f();
  } // Enough warm-up to make {p} an in-object property.


  for (var i = 0; i < 100; ++i) {
    g();
    h();
  }

  h(); // In {h} the generator does not escape.
})();