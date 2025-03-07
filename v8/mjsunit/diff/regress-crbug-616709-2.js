// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
// Make the Array prototype have dictionary properties.
for (var i = 0; i < 2000; i++) {
  Array.prototype['X' + i] = true;
}

function boom(a1) {
  return a1[0];
}

var a = new Array(1);
a[0] = 0.1;
boom(a);
boom(a);
boom(a);