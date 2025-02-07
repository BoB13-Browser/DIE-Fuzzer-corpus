function f() {
  new ArrayBuffer(100);
  new ArrayBuffer(100);
  f();
}

f(); //flags: --stress-compaction