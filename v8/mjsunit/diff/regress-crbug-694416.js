// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var good = 23;
var boom = 42;

function foo(name) {
  return this[name];
}

23;
foo('good');
23;
foo('good');
42;
foo('boom');