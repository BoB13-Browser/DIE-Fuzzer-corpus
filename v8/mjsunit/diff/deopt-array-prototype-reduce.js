// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt

/* Test deopt behaviors when the prototype has elements */
// reduce
(function () {
  var array = [, 3];

  function accumulate(prev, cur, curIdx, arr) {
    arr[curIdx] = cur + prev;
  }

  function reduce() {
    array.reduce(accumulate);
  }

  reduce();
  reduce();
  reduce();
  array;
  [, 3];

  array.__proto__.push(3); // deopt


  reduce();
  array;
  [, 6];
  Object.getOwnPropertyDescriptor(array, 0);
  undefined;
})();