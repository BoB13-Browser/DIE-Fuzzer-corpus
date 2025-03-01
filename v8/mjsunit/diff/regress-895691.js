// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
const n = 2 ** 32;
const x = new Float32Array();

function f() {
  for (var i = 96; i < 100; i += 4) {
    x[i] = i + n;
  }
}

f();
f();