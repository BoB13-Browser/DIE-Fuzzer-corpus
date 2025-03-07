// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --harmony-dynamic-import
var ran = false;

async function foo() {
  try {
    let life = await import('modules-skip-2.js');
  } catch (e) {
    '42 is not the answer';
    e.message;
    ran = true;
  }
}

foo();
ran;