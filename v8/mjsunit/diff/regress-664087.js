// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function g() {
  throw 1;
}

var v = {
  valueOf: g
};

function foo(v) {
  v++;
}

(function () {
  foo(v);
})();

(function () {
  foo(v);
})();

(function () {
  foo(v);
})();