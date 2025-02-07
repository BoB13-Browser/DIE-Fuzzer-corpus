d8.file.execute("/home/uuu/wasm-module-builder.js");

function foo(o, args) {
  let idx0 = o[0];

  function boo(arg) {
    typeof idx0 === typeof arg;
  }

  args.findIndex(Reflect.apply(boo, this, arguments));
}

const v3 = new WasmModuleBuilder();
const v5 = v3.addType(kSig_v_a);
const v7 = v3.addType(kSig_v_v);
const v10 = v3.addImport("q", "func", v5);
const v13 = v3.addImport("q", "gc", v7);
const v15 = v3.addFunction("main", v5);
v15.addBody([kExprCallFunction, v13, kExprLocalGet, 0, kExprCallFunction, v10]).exportFunc();

function f23(a24) {
  foo(a24.arguments, [v10, undefined, 127, kSig_v_a, kExprCallFunction]);
  return a24;
}

const o27 = {
  "func": f23,
  "gc": gc
};
const o28 = {
  "q": o27
};
const v31 = v3.instantiate(o28).exports.main;
v31(v31);