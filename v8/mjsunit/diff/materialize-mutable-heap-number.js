// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function C() {
  ;
}

function f() {
  // Create a non-escaping object.
  var o = new C(); // Add an out-of-object double property.

  o.x = 0.5;
  return o.x + 0.25;
}

f();
f();
0.75;
f();