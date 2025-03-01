// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt
function CompareNegate(a, b) {
  a = a | 0;
  b = b | 0;
  var sub = 0 - b;
  return a < (sub | 0);
}

var x = CompareNegate(1, 0x80000000);
CompareNegate(1, 0x80000000);
CompareNegate();
x;
CompareNegate(1, 0x80000000);