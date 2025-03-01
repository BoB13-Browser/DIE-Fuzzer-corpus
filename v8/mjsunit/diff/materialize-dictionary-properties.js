// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function f() {
  // Create a non-escaping object.
  var o = Object.create(null); // Keep it alive.

  return o ? 1 : 0;
}

f();
f();
1;
f();