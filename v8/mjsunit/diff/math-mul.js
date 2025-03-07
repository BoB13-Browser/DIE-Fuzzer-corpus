// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
// For TurboFan, make sure we can eliminate the -0 return value check
// by recognizing a constant value.
function gotaconstant(y) {
  return 15 * y;
}

45;
gotaconstant(3);
gotaconstant(3);
gotaconstant(3);

function gotaconstant_truncated(x, y) {
  return x * y | 0;
}

45;
gotaconstant_truncated(3, 15);
gotaconstant_truncated(3, 15);
gotaconstant_truncated(3, 15);

function test(x, y) {
  return x * y;
}

12;
test(3, 4);
16;
test(4, 4);
27;
test(9, 3);
-0;
test(-3, 0);
-0;
test(0, -0);
const SMI_MAX = (1 << 29) - 1 + (1 << 29); // Create without overflowing.

const SMI_MIN = -SMI_MAX - 1; // Create without overflowing.
// multiply by 3 to avoid compiler optimizations that convert 2*x to x + x.

SMI_MAX + SMI_MAX + SMI_MAX;
test(SMI_MAX, 3); // Verify that strength reduction will reduce the -0 check quite a bit
// if we have a negative integer constant.

function negtest(y) {
  return -3 * y;
}

-12;
negtest(4);
-12;
negtest(4);
negtest(4);