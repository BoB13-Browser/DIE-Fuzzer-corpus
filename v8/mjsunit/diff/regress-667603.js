// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
try {
  var v65 = new ArrayBuffer(2147483647);
} catch (e) {
  e instanceof RangeError;
}