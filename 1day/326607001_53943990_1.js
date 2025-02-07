function F3(a5) {
  if (!new.target) {
    throw 'must be called with new';
  }

  this.f = -9223372036854775807;
}

new F3(4294967296);
new F3(4294967296);
new F3();
const v21 = String.fromCharCode(1043);
const v23 = String.fromCharCode(1075);
const v29 = RegExp("()\n()" + v21 + "$", "i");

function f30(a31) {
  function f32(a33) {
    for (let v34 = 0; v34 < 5; v34++) {
      eval(`\n    function asmModule() {\n      "use asm";\n      function x(v) {\n        v = v | 0;\n      }\n      return x;\n    }\n    asmModule();\n  `);
    }
  }

  onmessage = f32;
}

const v38 = [];

for (let v39 = 0; v39 < 5; v39++) {
  const o42 = {
    "type": "function"
  };
  const v43 = new Worker(f30, o42);
  v38[v39] = v43;
  const o44 = {};
  v38[v39].postMessage(o44);
}

v29.test(v23);