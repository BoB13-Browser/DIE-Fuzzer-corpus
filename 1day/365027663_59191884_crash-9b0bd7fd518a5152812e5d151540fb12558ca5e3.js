// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --wasm-staging --wasm-inlining-call-indirect
d8.file.execute('test/mjsunit/wasm/wasm-module-builder.js');
const builder = new WasmModuleBuilder();
builder.startRecGroup();
let $array0 = builder.addArray(kWasmI8, true, kNoSuperType, true);
builder.endRecGroup();
builder.startRecGroup();
let $array1 = builder.addArray(kWasmI16, true, kNoSuperType, true);
builder.endRecGroup();
builder.startRecGroup();
let $struct2 = builder.addStruct([], kNoSuperType, false);
builder.endRecGroup();
builder.startRecGroup();
let $struct3 = builder.addStruct([], kNoSuperType, false);
builder.endRecGroup();
builder.startRecGroup();
let $array4 = builder.addArray(kWasmI32, true, kNoSuperType, false);
builder.endRecGroup();
builder.startRecGroup();
let $array5 = builder.addArray(kWasmI32, true, kNoSuperType, false);
builder.endRecGroup();
builder.startRecGroup();
let $sig6 = builder.addType(kSig_i_iii);
builder.endRecGroup();
builder.startRecGroup();
let $sig7 = builder.addType(kSig_v_v);
builder.endRecGroup();
let $sig8 = builder.addType(makeSig([kWasmExternRef], [wasmRefType(kWasmExternRef)]));
let $sig9 = builder.addType(makeSig([kWasmExternRef], [kWasmI32]));
let $sig10 = builder.addType(makeSig([kWasmI32], [wasmRefType(kWasmExternRef)]));
let $sig11 = builder.addType(makeSig([kWasmExternRef, kWasmI32], [kWasmI32]));
let $sig12 = builder.addType(makeSig([kWasmExternRef, kWasmExternRef], [wasmRefType(kWasmExternRef)]));
let $sig13 = builder.addType(makeSig([kWasmExternRef, kWasmI32, kWasmI32], [wasmRefType(kWasmExternRef)]));
let $sig14 = builder.addType(makeSig([kWasmExternRef, kWasmExternRef], [kWasmI32]));
let $sig15 = builder.addType(makeSig([wasmRefNullType($array1), kWasmI32, kWasmI32], [wasmRefType(kWasmExternRef)]));
let $sig16 = builder.addType(makeSig([kWasmExternRef, wasmRefNullType($array1), kWasmI32], [kWasmI32]));
let $sig17 = builder.addType(makeSig([kWasmExternRef, wasmRefNullType($array0), kWasmI32], [kWasmI32]));
let $sig18 = builder.addType(makeSig([kWasmExternRef], [wasmRefType($array0)]));
let $sig19 = builder.addType(makeSig([wasmRefNullType($array0), kWasmI32, kWasmI32], [wasmRefType(kWasmExternRef)]));
let $sig20 = builder.addType(makeSig([kWasmNullFuncRef], []));
let cast0 = builder.addImport('wasm:js-string', 'cast', $sig8);
let test1 = builder.addImport('wasm:js-string', 'test', $sig9);
let fromCharCode2 = builder.addImport('wasm:js-string', 'fromCharCode', $sig10);
let fromCodePoint3 = builder.addImport('wasm:js-string', 'fromCodePoint', $sig10);
let charCodeAt4 = builder.addImport('wasm:js-string', 'charCodeAt', $sig11);
let codePointAt5 = builder.addImport('wasm:js-string', 'codePointAt', $sig11);
let length6 = builder.addImport('wasm:js-string', 'length', $sig9);
let concat7 = builder.addImport('wasm:js-string', 'concat', $sig12);
let substring8 = builder.addImport('wasm:js-string', 'substring', $sig13);
let equals9 = builder.addImport('wasm:js-string', 'equals', $sig14);
let compare10 = builder.addImport('wasm:js-string', 'compare', $sig14);
let fromCharCodeArray11 = builder.addImport('wasm:js-string', 'fromCharCodeArray', $sig15);
let intoCharCodeArray12 = builder.addImport('wasm:js-string', 'intoCharCodeArray', $sig16);
let measureStringAsUTF813 = builder.addImport('wasm:text-encoder', 'measureStringAsUTF8', $sig9);
let encodeStringIntoUTF8Array14 = builder.addImport('wasm:text-encoder', 'encodeStringIntoUTF8Array', $sig17);
let encodeStringToUTF8Array15 = builder.addImport('wasm:text-encoder', 'encodeStringToUTF8Array', $sig18);
let decodeStringFromUTF8Array16 = builder.addImport('wasm:text-decoder', 'decodeStringFromUTF8Array', $sig19);
let main17 = builder.addFunction(undefined, $sig6).exportAs('main');
let $func18 = builder.addFunction(undefined, $sig7);
let $mem0 = builder.addMemory64(0, 32);
let $mem1 = builder.addMemory(0, 32);
let $table0 = builder.addTable(kWasmFuncRef, 2, 2);
let $segment0 = builder.addActiveElementSegment($table0.index, wasmI32Const(0), [[kExprRefFunc, main17.index], [kExprRefFunc, $func18.index]], kWasmFuncRef);
let $tag0 = builder.addTag($sig7); // func $main: [kWasmI32, kWasmI32, kWasmI32] -> [kWasmI32]

main17.addBody([...wasmI32Const(531273286)]); // func $func18: [] -> []

$func18.addLocals(kWasmI32, 1) // $var0
.addLocals(kWasmNullFuncRef, 1) // $var1
.addBody([kExprRefNull, kNullFuncRefCode, kExprLoop, $sig20, kExprLocalSet, 1, // $var1
kExprRefFunc, main17.index, kGCPrefix, kExprRefCastNull, $sig6, kGCPrefix, kExprBrOnCast, 0b11
/* nullable -> nullable */
, 0, kFuncRefCode, kNullFuncRefCode, kExprDrop, kExprRefNull, kAnyRefCode, kGCPrefix, kExprRefCastNull, $array1, ...wasmI32Const(261), ...wasmI32Const(410), kGCPrefix, kExprArraySet, $array1, kExprEnd]);
let kBuiltins = {
  builtins: ['js-string', 'text-decoder', 'text-encoder']
};
const instance = builder.instantiate({}, kBuiltins);

try {
  print(instance.exports.main(1, 2, 3));
} catch (e) {
  print('caught exception', e);
}