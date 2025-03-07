// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt
function TestMapConstructorEntrySideEffect(ctor) {
  const k1 = {};
  const k2 = {};
  const k3 = {};
  let firstEntryCallCount = 0;
  let lastEntryCallCount = 0;
  const input = [Object.defineProperty([, 1], "0", {
    get() {
      // Verify handling of a non-Smi array length
      input.length = 2 ** 32 - 2;
      firstEntryCallCount++;
      return k1;
    }

  }), [k2, 2], Object.defineProperty([k3], "1", {
    get() {
      input.length = 1;
      lastEntryCallCount++;
      return 3;
    }

  })];
  const col = new ctor(input);
  1;
  firstEntryCallCount;
  1;
  lastEntryCallCount;

  if ('size' in col) {
    3;
    col.size;
  }

  1;
  col.get(k1);
  2;
  col.get(k2);
  3;
  col.get(k3);
}

TestMapConstructorEntrySideEffect(Map);
TestMapConstructorEntrySideEffect(Map);
TestMapConstructorEntrySideEffect(Map);
TestMapConstructorEntrySideEffect(Map);
TestMapConstructorEntrySideEffect();
TestMapConstructorEntrySideEffect(WeakMap);
TestMapConstructorEntrySideEffect(WeakMap);
TestMapConstructorEntrySideEffect(WeakMap);
TestMapConstructorEntrySideEffect(WeakMap);
TestMapConstructorEntrySideEffect();