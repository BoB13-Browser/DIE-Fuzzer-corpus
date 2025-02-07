d8.file.execute("test/mjsunit/wasm/wasm-module-builder.js");
const v5 = new WasmModuleBuilder();
const v18 = [kExprI32Const, 42, kGCPrefix, kExprStructNew, v5.addStruct([makeField(kWasmI32, true)]), kGCPrefix, kExprExternConvertAny];
v5.addFunction("MakeStruct", makeSig([], [kWasmExternRef])).exportFunc().addBody(v18);
globalThis.struct = v5.instantiate().exports.MakeStruct();

function f32(a33) {
  a33.prototype = globalThis.struct;

  for (let v36 = 0; v36 < 50; v36++) {
    const v37 = new a33();
    const o38 = {};
    o38.e = v37;
    v37 instanceof a33;
  }
}

function f40() {}

f32(f40);