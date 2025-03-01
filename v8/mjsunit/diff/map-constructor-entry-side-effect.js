// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt
function TestMapConstructorEntrySideEffect(ctor) {
  const k1 = {};
  const k2 = {};
  const k3 = {};
  let callCount = 0;
  const input = [Object.defineProperty([, 1], "0", {
    get() {
      input.length = 2;
      return k1;
    }

  }), [k2, 2], Object.defineProperty([, 3], "0", {
    get() {
      callCount++;
      return k3;
    }

  })];
  const col = new ctor(input);
  0;
  callCount;

  if ('size' in col) {
    2;
    col.size;
  }

  col.get(k1);
  1;
  col.get(k2);
  2;
  col.has(k3);
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