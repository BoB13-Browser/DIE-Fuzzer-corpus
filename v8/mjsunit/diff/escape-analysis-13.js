// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --turbo-escape
function f() {
  var x = {};
  x.a = "a";
  x.b = "b";
  "a";
  x.a;
  "b";
  x.b;
}

f();
f();
f();