d8.file.execute("test/mjsunit/wasm/wasm-module-builder.js");

class c0 {}

class c1 extends c0 {
  constructor(a, b, c, d, e) {
    super(); // <--- crash in calling super()
  }

}

let builder = new WasmModuleBuilder();
let import_func = builder.addImport('mod', 'func', makeSig([kWasmI32, kWasmI32, kWasmI32, kWasmI32], []));
builder.addExport('exp', import_func);
let wasm_exports = builder.instantiate({
  'mod': {
    func: c1
  }
}).exports;

for (let i = 0; i < 5; i++) {
  try {
    wasm_exports['exp'](1, 2, 3, 4);
  } catch {}
} //flags: --allow-natives-syntax --jit-fuzzing