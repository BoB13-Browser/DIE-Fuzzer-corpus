// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function h(a) {
  return a[1];
}

0;
h(new Int8Array(10));
0;
h(new Int8Array(10));

function g() {
  return h(arguments);
}

function f() {
  return g(23, 42);
}

42;
f();
42;
f();
42;
f();