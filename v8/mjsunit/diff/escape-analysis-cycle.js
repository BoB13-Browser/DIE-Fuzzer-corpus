// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --turbo-escape
function g(o) {
  return {
    a: o,
    b: 42,
    c: o
  };
}

function f() {
  var o = {
    a: {},
    b: 43
  };
  o.a = g(g(o));
  o.c = o.a.c;
  return o.c.a.c.a.c.a.c.b;
}

42;
f();
42;
f();
42;
f();