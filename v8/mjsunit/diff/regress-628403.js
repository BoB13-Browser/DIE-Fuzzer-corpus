// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var dothrow = false;

function g() {
  if (dothrow) {
    throw 1;
  }
}

function f(a) {
  try {
    g();
  } catch (e) {
    if (typeof e !== 'number' && e !== 1) {
      throw e;
    }

    return a[0];
  }
}

f();
f();
dothrow = true;
42;
f([42]);