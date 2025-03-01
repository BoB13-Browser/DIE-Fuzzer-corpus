// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var o = {};
Object.defineProperty(o, "x", {
  set: function (v) {
    throw 7;
  }
});

function foo(o) {
  var x = 1;

  try {
    o.x = 2;
  } catch (e) {
    x = e;
  }

  return x;
}

7;
foo(o);
7;
foo(o);
7;
foo(o);