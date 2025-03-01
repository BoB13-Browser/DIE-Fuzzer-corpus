// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
Object.prototype[1] = 1.5;
var v = {
  length: 12,
  [1073741824]: 0
};
['1073741824', 'length'];
Object.keys(v);
undefined;
v[0];
1.5;
v[1];
0;
v[1073741824]; // Properly handle out of range HeapNumber keys on 32bit platforms.

Array.prototype.sort.call(v);
['0', '1073741824', 'length'];
Object.keys(v);
v.hasOwnProperty(0);
1.5;
v[0];
v.hasOwnProperty(1);
1.5;
v[1];
0;
v[1073741824];