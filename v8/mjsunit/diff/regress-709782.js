// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var a = [0];

function bar(x) {
  return x;
}

function foo() {
  return a.reduce(bar);
}

0;
foo();
0;
foo();
0;
foo();