d8.file.execute('test/mjsunit/wasm/wasm-module-builder.js');

const gc = function () {
  for (let i = 0; i < 10000; i++) new String("AAAA" + Math.random());
};

{
  let builder = new WasmModuleBuilder();
  let struct_type = builder.addStruct(new Array(195).fill(makeField(kWasmS128, true)));
  builder.addFunction("func", makeSig([], [wasmRefType(struct_type)])).addBody([kGCPrefix, kExprStructNewDefault, struct_type]);
  builder.instantiate();
}
{
  let builder = new WasmModuleBuilder();
  builder.addTable64();
  builder.addTable(wasmRefType(-9007199254740992), 1, -7, [kGCPrefix, kExprStructNewDefault]);
  gc();
  builder.instantiate();
} //flags: --jit-fuzzing --stress-incremental-marking