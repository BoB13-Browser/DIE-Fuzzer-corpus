// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/* Test behaviors when the prototype has elements */
// find
(function () {
  var array = [,];

  function find() {
    return array.find(v => v > 0);
  }

  find();
  undefined;

  array.__proto__.push(6);

  find();
  6;
})();