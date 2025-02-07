function main() {
  ab = new ArrayBuffer(0x100000);
  new Blob([ab]);
  ab1 = ab.transfer();
  ab2 = structuredClone(ab, {
    transfer: [ab]
  });
  ab1.transfer(1);
  new DataView(ab2, 0x13337, 4).setUint32(0, 0xdeadbeef, true);
}

window.onload = main;