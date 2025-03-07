// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
(function TestMathAbsReturningUnsigned() {
  function Module(stdlib) {
    "use asm";

    var abs = stdlib.Math.abs;

    function f(a, b) {
      a = a | 0;
      b = b | 0;
      return abs(a >> 0) == b >>> 0 | 0;
    }

    return f;
  }

  var f = Module(this);
  0;
  f(1, 2);
  1;
  f(23, 23);
  1;
  f(-42, 42);
  1;
  f(-0x7fffffff, 0x7fffffff);
  1;
  f(-0x80000000, 0x80000000);
})();

(function TestMathAbsOverflowSignedValue() {
  function Module(stdlib) {
    "use asm";

    var abs = stdlib.Math.abs;

    function f() {
      return abs(-0x80000000) > 0 | 0;
    }

    return f;
  }

  var f = Module(this);
  1;
  f();
})();