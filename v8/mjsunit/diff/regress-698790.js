// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
// Call RegExp constructor with a cons string.
var cons_string = "aaaaaaaaaaaaaa";
new RegExp(cons_string); // Same thing but using TF lowering.

function make_cons_string(s) {
  return s + "aaaaaaaaaaaaaa";
}

make_cons_string("");
var cons_str = make_cons_string("");
new RegExp(cons_str);