// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function foo(o) {
  try {
    for (var x in o) {
      ;
    }

    return false;
  } catch (e) {
    return true;
  }
}

var o = new Proxy({
  a: 1
}, {
  getOwnPropertyDescriptor(target, property) {
    throw target;
  }

});
foo(o);
foo(o);
foo(o);