// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// Flags: --allow-natives-syntax
Object.defineProperty(Promise, Symbol.species, {
  value: 0
});
var p = new Promise(function () {
  ;
});

try {
  p.then();
} catch (e) {
  e instanceof TypeError;
}