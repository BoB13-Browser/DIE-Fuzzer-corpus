// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
(function () {
  function doShift(a) {
    return a.shift();
  }

  function test() {
    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    0;
    doShift(a);
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    a;
  }

  test();
  test();
  test();
})();

(function () {
  function doShift(a) {
    return a.shift();
  }

  function test() {
    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16.1];
    0;
    doShift(a);
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16.1];
    a;
  }

  test();
  test();
  test();
})();

(function () {
  function doShift(a) {
    return a.shift();
  }

  function test() {
    var a = [, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16.1];
    undefined;
    doShift(a);
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16.1];
    a;
  }

  test();
  test();
  test();
})();

(function () {
  function doShift(a) {
    return a.shift();
  }

  function test() {
    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "16"];
    0;
    doShift(a);
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "16"];
    a;
  }

  test();
  test();
  test();
})();