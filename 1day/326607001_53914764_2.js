const v3 = [5];
[-4294967297];
[-1812067729, -65535];
let v6 = 1;
let v8 = new Float64Array(v6);

function f9(a10, a11) {
  v6++;
  v3[Symbol.toStringTag] = v3;
  return a11;
}

v8.valueOf = f9;
const v17 = new Uint16Array(3140);
v17.length >>>= 10;
~this;
Math.cosh(-536870912);
--v8;
++v6;
Math.fround(-4096);
Math.min(this);
new Float32Array(156);

function f32(a33) {
  function f34(a35) {
    for (let v36 = 0; v36 < 5; v36++) {
      eval(`\n    function asmModule() {\n      "use asm";\n      function x(v) {\n        v = v | 0;\n      }\n      return x;\n    }\n    asmModule();\n  `);
    }

    return f34;
  }

  onmessage = f34;
  return f32;
}

const v40 = [f32];
Object.defineProperty(v40, 1, {
  writable: true,
  value: 3
});

for (let v41 = 0; v41 < 5; v41++) {
  const o44 = {
    "type": "function"
  };
  const v45 = new Worker(f32, o44);
  v40[v41] = v45;
  const o46 = {};
  v40[v41].postMessage(o46);
} // CRASH INFO
// ==========
// TERMSIG: 11
// STDERR:
// Received signal 11 SEGV_MAPERR 0007fdc1c0b8
// 
// ==== C stack trace ===============================
// 
//  [0x55f3753d13b2]
//  [0x7fddd77cf520]
//  [0x7fddd782e89e]
//  [0x7fddd7830bdb]
//  [0x7fddd7832139]
//  [0x55f3787f2489]
//  [0x55f375af05ad]
//  [0x55f375af03a2]
//  [0x55f375af00a5]
//  [0x55f375b2c079]
//  [0x55f375b0cf7d]
//  [0x55f375b059ad]
//  [0x55f375a1fbb6]
//  [0x55f375a1e3d3]
//  [0x55f375a58c7c]
//  [0x55f375a17c8c]
//  [0x55f375a1d8d4]
//  [0x55f375af8c77]
//  [0x55f37574c9af]
//  [0x55f37574c8ee]
//  [0x55f37708b4d7]
// [end of stack trace]
// STDOUT:
//