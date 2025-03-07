// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Check that property constness for out-of-object fields is valid
var o = {};

var toString = o.toString = function () {
  ;
};

try {
  ({
    toString
  });
  o = { ...o
  };
} catch (e) {
  ;
}

o.toString = [];