d8.test.enableJSPI();
const wasmArray = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 9, 2, 96, 0, 1, 125, 96, 0, 1, 125, 2, 8, 1, 1, 109, 2, 106, 115, 0, 0, 7, 8, 1, 4, 109, 97, 105, 110, 0, 0, 0, 19, 4, 110, 97, 109, 101, 1, 7, 1, 0, 4, 109, 97, 105, 110, 2, 3, 1, 0, 0]);
let module = new WebAssembly.Module(wasmArray);
let v2 = new WebAssembly.Instance(module, {
  m: {
    js: () => {}
  }
});
let v3 = WebAssembly.promising(v2.exports.main);
v3();