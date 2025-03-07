d8.file.execute('test/mjsunit/wasm/wasm-module-builder.js');
let builder = new WasmModuleBuilder();
let struct_type = builder.addStruct([makeField(kWasmI32, true)]);
builder.addFunction('MakeStruct', makeSig([], [kWasmExternRef])).exportFunc().addBody([kExprI32Const, 42, kGCPrefix, kExprStructNew, struct_type, kGCPrefix, kExprExternConvertAny]);
let instance = builder.instantiate();
globalThis.struct = instance.exports.MakeStruct();

function foo(arg) {
  arg.prototype = globalThis.struct;

  for (var i = 0; i < 5000; i++) {
    new arg() instanceof arg;
  }
}

foo(function () {});