d8.test.enableJSPI();
d8.test.installConditionalFeatures();
d8.file.execute('test/mjsunit/wasm/wasm-module-builder.js');
const sig = makeSig([kWasmI32], []);
const builder = new WasmModuleBuilder();

const _type = builder.addType(sig);

const _import = builder.addImport('m', 'foo', _type);

const _table = builder.addTable(kWasmAnyFunc, 10).index;
builder.addExportOfKind(sig, builder, _import, _table);
builder.addFunction('main', _type).addBody([kExprLocalGet, 0, kExprI32Const, 0, kExprTableGet, _table, kGCPrefix, kExprRefCast, _type, kExprCallRef, _type]).exportFunc();
const func = new WebAssembly.Function({
  parameters: ['i32'],
  results: []
}, () => 12);
const instance = builder.instantiate({
  'm': {
    'foo': func
  }
});
instance.exports.main(15); //flags: --allow-natives-syntax --jit-fuzzing