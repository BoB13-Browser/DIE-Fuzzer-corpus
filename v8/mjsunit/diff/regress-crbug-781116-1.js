// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function baz(obj, store) {
  if (store === true) {
    obj[0] = 1;
  }
}

function bar(store) {
  baz(Array.prototype, store);
}

bar(false);
bar(false);
bar(true);

function foo() {
  [].push();
}

foo();
foo();
foo();