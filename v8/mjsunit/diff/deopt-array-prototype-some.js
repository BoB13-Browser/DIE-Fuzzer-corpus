// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt

/* Test deopt behaviors when the prototype has elements */
// some
(function () {
  var array = [,];

  function some() {
    return array.some(v => v > 0);
  }

  some();
  some();
  some();
  false;

  array.__proto__.push(6); //deopt


  some();
  true;
})();