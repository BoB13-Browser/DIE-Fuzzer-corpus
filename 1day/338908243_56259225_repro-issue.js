// Copyright 2024 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
d8.file.execute('test/mjsunit/wasm/wasm-module-builder.js');

function createWasmStruct() {
  let builder = new WasmModuleBuilder();
  let struct_type = builder.addStruct([makeField(kWasmI32, true)]);
  builder.addFunction('makeStruct', makeSig([], [kWasmExternRef])).exportFunc().addBody([kExprI32Const, 42, kGCPrefix, kExprStructNew, struct_type, kGCPrefix, kExprExternConvertAny]);
  let instance = builder.instantiate();
  return instance.exports.makeStruct();
}

let struct = createWasmStruct();
Array.prototype.__proto__ = struct;
print([1].concat());