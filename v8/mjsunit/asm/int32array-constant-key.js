// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function Module(stdlib, foreign, heap) {
  "use asm";

  var MEM32 = new stdlib.Int32Array(heap);

  function loadm4194304() {
    return MEM32[-4194304];
  }

  function loadm0() {
    return MEM32[-0];
  }

  function load0() {
    return MEM32[0];
  }

  function load4() {
    return MEM32[4];
  }

  function storem4194304(v) {
    MEM32[-4194304] = v;
  }

  function storem0(v) {
    MEM32[-0] = v;
  }

  function store0(v) {
    MEM32[0] = v;
  }

  function store4(v) {
    MEM32[4] = v;
  }

  return {
    loadm4194304: loadm4194304,
    storem4194304: storem4194304,
    loadm0: loadm0,
    storem0: storem0,
    load0: load0,
    store0: store0,
    load4: load4,
    store4: store4
  };
}

var m = Module(this, {}, new ArrayBuffer(4));
assertEquals(undefined, m.loadm4194304());
assertEquals(0, m.loadm0());
assertEquals(0, m.load0());
assertEquals(undefined, m.load4());
m.storem4194304(123456789);
assertEquals(undefined, m.loadm4194304());
assertEquals(0, m.loadm0());
assertEquals(0, m.load0());
assertEquals(undefined, m.load4());
m.storem0(987654321);
assertEquals(undefined, m.loadm4194304());
assertEquals(987654321, m.loadm0());
assertEquals(987654321, m.load0());
assertEquals(undefined, m.load4());
m.store0(0x12345678);
assertEquals(undefined, m.loadm4194304());
assertEquals(0x12345678, m.loadm0());
assertEquals(0x12345678, m.load0());
assertEquals(undefined, m.load4());
m.store4(43);
assertEquals(undefined, m.loadm4194304());
assertEquals(0x12345678, m.loadm0());
assertEquals(0x12345678, m.load0());
assertEquals(undefined, m.load4());