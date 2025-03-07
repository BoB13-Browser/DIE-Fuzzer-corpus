// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
const maxLength = 0xffffffff;
const s = 'A'.repeat(maxLength);

function foo(s) {
  let x = s.lastIndexOf("", maxLength);
  return x === maxLength;
}

foo(s);
foo(s);
foo(s);