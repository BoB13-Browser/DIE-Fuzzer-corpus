// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Test that spread can create arrays in large object space.
const n = 130000;
{
  let x = new Set();

  for (let i = 0; i < n; ++i) {
    x.add(i);
  }

  let a = [...x];
}
{
  let x = new Set();

  for (let i = 0; i < n; ++i) {
    x.add(i);
  }

  let a = [...x.values()];
}
{
  let x = new Set();

  for (let i = 0; i < n; ++i) {
    x.add(i);
  }

  let a = [...x.keys()];
}