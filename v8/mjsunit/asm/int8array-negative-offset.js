// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var stdlib = this;
var buffer = new ArrayBuffer(64 * 1024);
var foreign = {};

var m = function Module(stdlib, foreign, heap) {
  "use asm";

  var MEM8 = new stdlib.Int8Array(heap);

  function load(i) {
    i = i | 0;
    i = MEM8[i >> 0] | 0;
    return i;
  }

  function store(i, v) {
    i = i | 0;
    v = v | 0;
    MEM8[i >> 0] = v;
  }

  function load8(i) {
    i = i | 0;
    i = MEM8[i + 8 >> 0] | 0;
    return i;
  }

  function store8(i, v) {
    i = i | 0;
    v = v | 0;
    MEM8[i + 8 >> 0] = v;
  }

  return {
    load: load,
    store: store,
    load8: load8,
    store8: store8
  };
}(stdlib, foreign, buffer);

assertEquals(0, m.load(-8));
assertEquals(0, m.load8(-16));
m.store(0, 42);
assertEquals(42, m.load8(-8));
m.store8(-8, 99);
assertEquals(99, m.load(0));
assertEquals(99, m.load8(-8));