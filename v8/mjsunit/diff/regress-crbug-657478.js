// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
f2(new Array(4));
f2(new Array(Math.pow(2, 32) - 1));
f2({
  length: 10
});
f2({
  length: 10
});