// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --opt --allow-natives-syntax --no-always-opt
class A {
  constructor() {
    ;
  }

}

class B extends A {
  constructor(call_super) {
    super();

    if (call_super) {
      super();
    }
  }

}

test = new B(0);
test = new B(0);

(() => {
  new B(1);
})();

ReferenceError;

(() => {
  new B(1);
})();

ReferenceError;
test = new B(0);
B;

(() => {
  new B(1);
})();

ReferenceError;
B;