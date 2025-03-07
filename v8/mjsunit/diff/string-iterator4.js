// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --no-stress-opt
// Tests for wrapped strings.
var str = new String('ott');
['o', 't', 't'];
[...str];

function iterator_fn() {
  return {
    next: () => ({
      value: undefined,
      done: true
    })
  };
}

;
str[Symbol.iterator] = iterator_fn; // This shouldn't invalidate the protector, because it doesn't support String
// objects.

[];
[...str];
var str2 = new String('ott');
['o', 't', 't'];
[...str2]; // This changes the String prototype. No more tests should be run after this in
// the same instance.

str2.__proto__[Symbol.iterator] = iterator_fn;
[];
[...str2];