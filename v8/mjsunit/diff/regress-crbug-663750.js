// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var v = 0;

function foo(a) {
  v = a;
}

this.x = 0;
delete x;
foo();
foo();
foo();
undefined;
v;
Object.freeze(this);
foo(4);
foo(5);
foo(6);
undefined;
v;