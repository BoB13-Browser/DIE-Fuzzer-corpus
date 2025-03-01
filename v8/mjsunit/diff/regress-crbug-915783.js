// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
const constructors = [[Uint8Array, [0, 1]], [Int8Array, [0, 1]], [Uint16Array, [0, 1]], [Int16Array, [0, 1]], [Uint32Array, [0, 1]], [Int32Array, [0, 1]], [Float32Array, [0, 1]], [Float64Array, [0, 1]], [Uint8ClampedArray, [0, 1]], [BigInt64Array, [0, 1]], [BigUint64Array, [0, 1]]];
let typedArray;

function detachBuffer() {
  return 'a';
}

Number.prototype.toString = detachBuffer;
BigInt.prototype.toString = detachBuffer;
Number.prototype.toLocaleString = detachBuffer;
BigInt.prototype.toLocaleString = detachBuffer;
constructors.forEach(([constructor, arr]) => {
  typedArray = new constructor(arr);
  typedArray.join();
  '0,1';
  typedArray.toLocaleString();
  'a,';
});