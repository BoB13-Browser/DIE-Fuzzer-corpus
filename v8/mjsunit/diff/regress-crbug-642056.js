// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function f(o) {
  return o.x instanceof Array;
}

var o = {
  x: 1.5
};
o.x = 0;
f(o);
f(o);
f(o);