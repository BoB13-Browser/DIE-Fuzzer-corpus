// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var n;

function Ctor() {
  try {
    ;
  } catch (e) {
    ;
  }

  n = new Set();
}

function Check() {
  n.xyz = 0x826852f4;
}

Ctor();
Ctor();
Ctor();
Check();
Check();
Check();
Ctor();
Check();
parseInt('AAAAAAAA');