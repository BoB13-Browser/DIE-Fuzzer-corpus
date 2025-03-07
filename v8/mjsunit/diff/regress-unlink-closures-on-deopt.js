// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --noalways-opt
function foo() {
  function g(o) {
    return o.f;
  }

  return g;
}

let g1 = foo();
let g2 = foo();
g1({
  f: 1
});
g1({
  f: 2
});
g2({
  f: 2
});
g2({
  f: 2
});
g1({
  f: 1
});
g2({
  f: 2
});
g1({});
g1;
g2;
g2({});