// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function f() {
  return [...[,
  /*hole*/
  2.3]];
}

undefined;
f()[0];
undefined;
f()[0];
undefined;
f()[0];