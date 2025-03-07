// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var prototype = Object.create(null);
var object = Object.create(prototype);

function foo() {
  return Object.getPrototypeOf(object);
}

prototype;
foo();
prototype;
foo();
prototype;
foo();