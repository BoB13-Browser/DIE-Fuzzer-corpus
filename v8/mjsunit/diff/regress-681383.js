// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function f(deopt) {
  let array = [42];
  let it = array[Symbol.iterator]();

  if (deopt) {
    return it.next().value;
  }
}

f(false);
f(false);
f(true);
42;