// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const re = /./g;

function toSlowMode() {
  re.slow = true;
}

re[Symbol.split]("abc", {
  valueOf: toSlowMode
});