// Copyright 2019 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function C() {
  ;
}

C.__proto__ = null;

function f(c) {
  return 0 instanceof c;
}

f(C);

(() => f(0))();