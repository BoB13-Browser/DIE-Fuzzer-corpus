// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --noturbo-osr
function f() {
  "use asm";

  function g() {
    function f() {}

    ;
  }

  return g;
}

f()();