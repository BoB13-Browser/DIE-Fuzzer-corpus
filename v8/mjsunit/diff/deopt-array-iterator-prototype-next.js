// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt

/* Test deopt behaviors when the prototype has elements */
(function () {
  var array = [,];

  function next() {
    return array[Symbol.iterator]().next();
  }

  next().value;
  undefined;
  next().value;
  undefined;
  next().value;
  undefined;

  array.__proto__.push(5);

  next().value;
  5;
})();