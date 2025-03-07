// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --harmony-regexp-subclass
var pattern = {
  [Symbol.replace]: (string, newValue) => string + newValue
}; // Check object coercible fails.

assertThrows(() => String.prototype.replace.call(null, pattern, "x"), TypeError); // Override is called.

assertEquals("abcdex", "abcde".replace(pattern, "x")); // Non-callable override.

pattern[Symbol.replace] = "dumdidum";
assertThrows(() => "abcde".replace(pattern, "x"), TypeError);
assertEquals("[Symbol.replace]", RegExp.prototype[Symbol.replace].name);