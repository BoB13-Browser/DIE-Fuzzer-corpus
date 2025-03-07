// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function opt(b) {
  let iterator = new Set().values();
  iterator.x = 0;
  let arr = [iterator, iterator];

  if (b) {
    return arr.slice();
  }
}

opt(false);
opt(false);
let res = opt(true);
let a = res[0];
let b = res[1];
a === b;
a.x = 7;
7;
b.x;