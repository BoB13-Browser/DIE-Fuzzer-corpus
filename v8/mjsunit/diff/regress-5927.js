// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let a = Object.freeze({});

(() => class C {
  [a.b = "foo"]() {
    ;
  }

})();

TypeError;

(() => class C extends (a.c = null) {})();

TypeError;