// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --ignition-osr --allow-natives-syntax
function g() {
  return 23;
}

function h() {
  return 42;
}

function boom(o) {
  o.g = h;
}

function f(osr_and_recurse) {
  if (osr_and_recurse) {
    for (var i = 0; i < 3; ++i) {
      ;
    }

    f(false); // Trigger tier-up due to recursive call.

    boom(this); // Causes a deopt due to below dependency.

    var x = g(); // Install dependency on the {g} function.

    return x;
  }

  return 65;
}

65;
f(false);
65;
f(false);
42;
f(true);