// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file
// Flags: --allow-natives-syntax
// Simple eager deoptimization test.
function f(o) {
  return o.x;
}

f({
  x: 2
});
2;
f({
  x: 2
});
2;
f({
  x: 2
});
2;
f({
  y: 1,
  x: 3
});
3;