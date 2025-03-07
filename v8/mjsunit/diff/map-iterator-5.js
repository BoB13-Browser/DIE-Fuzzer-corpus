// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --no-stress-opt
var map = new Map([[1, 2], [2, 3], [3, 4]]); // This changes %MapIteratorPrototype%. No more tests should be run after this
// in the same instance.

var iterator = map.values();

iterator.__proto__.next = () => ({
  done: true
});

[];
[...map];
[];
[...map.entries()];
[];
[...map.keys()];
[];
[...map.values()];
[];
[...iterator];