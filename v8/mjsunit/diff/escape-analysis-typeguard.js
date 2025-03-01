// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --turbo-escape
class C {
  constructor(x) {
    this.a = x;
  }

}

;

class D {
  constructor(x) {
    this.a = x;
  }

}

;

function foo() {
  var x = new C(7);
  var y = new D(x);
  var z = y.a;
  7;
  z.a;
}

foo();
foo();
foo();
foo();
foo();