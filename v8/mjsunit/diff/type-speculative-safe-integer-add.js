// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
(function () {
  function f(x) {
    return 1 / (x + x);
  }

  function forgetAboutMinus0(i) {
    var x = 0;
    var y;

    for (; i > 0; --i) {
      y = f(x);
      x = -0;
    }

    return y;
  }

  forgetAboutMinus0(1);
  Infinity;
  forgetAboutMinus0(1);
  Infinity;
  forgetAboutMinus0(1);
  -Infinity;
  forgetAboutMinus0(2);
})();

(function () {
  function f(x) {
    return x + x;
  }

  function NumberAdd(x, y) {
    return x + y;
  }

  NumberAdd(1, 0.5);
  NumberAdd(0.5, 1);
  NumberAdd(NaN, Infinity);

  function forgetAboutNaN(b) {
    var x = b ? NaN : 1;
    return NumberAdd(f(x), 0);
  }

  forgetAboutNaN(false);
  2;
  forgetAboutNaN(false);
  2;
  forgetAboutNaN(false);
  NaN;
  forgetAboutNaN(true);
})();