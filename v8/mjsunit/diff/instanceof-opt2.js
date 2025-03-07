// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function Foo() {
  ;
} // TurboFan will optimize this to false via constant-folding the
// OrdinaryHasInstance call inside Function.prototype[@@hasInstance].


function foo() {
  return 1 instanceof Foo;
}

false;
foo();
false;
foo();
false;
foo();