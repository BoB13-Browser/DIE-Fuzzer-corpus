// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function foo(a) {
  this.a = a; // Note that any call would do, it doesn't need to be 0xffff

  this.x = this.a + 0xffff;
}

function g(x) {
  new foo(2);

  if (x) {
    for (var i = 0.1; i < 1.1; i++) {
      new foo(i);
    }
  }
}

g(false);
g(false);
g(true);