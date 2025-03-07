// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
class A {}

class B {}

Object.assign(B, A);
"class B {}";
B.toString();

(function () {
  function f(a, i, v) {
    a[i] = v;
  }

  f("make it generic", 0, 0);
  var o = {
    foo: "foo"
  };
  var s = f("priv");
  f(o, s, "private");
  f(o);
  var desc = Object.getOwnPropertyDescriptor(o, s);
  "private";
  desc.value;
  desc.writable;
  desc.enumerable;
  desc.configurable;
})();