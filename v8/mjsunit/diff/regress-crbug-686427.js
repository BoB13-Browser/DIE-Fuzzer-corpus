// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function f(a, base) {
  a[base + 4] = 23;
  return a;
}

var i = 1073741824;
23;
f({}, 1)[1 + 4];
23;
f([], 2)[2 + 4];
23;
f({}, i)[i + 4];