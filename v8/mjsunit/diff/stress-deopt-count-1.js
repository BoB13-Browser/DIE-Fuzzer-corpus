// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --deopt-every-n-times=0 --opt --no-always-opt
// Check that --deopt-every-n-times 0 doesn't deopt
function f(x) {
  return x + 1;
}

f(0);
f(1);
f();
undefined;
undefined;
false;
f(1);
f();
undefined;
undefined;
false;