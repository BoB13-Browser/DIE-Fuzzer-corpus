// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
// The {f} function is compiled using TurboFan.
// 1) The call to {Reflect.set} has no arguments adaptation.
// 2) The call to {Reflect.set} is in tail position.
function f(a, b, c) {
  "use strict";

  return Reflect.set({});
} // The {g} function is compiled using Ignition.
// 1) The call to {f} requires arguments adaptation.
// 2) The call to {f} is not in tail position.


function g() {
  return f() + "-no-tail";
}

"true-no-tail";
g();
"true-no-tail";
g();