do {
  const v5 = new Int8Array(53666);
  const v6 = new Int8Array(0, ..."getMilliseconds", ...v5);

  class C7 {}

  function f8(a9) {
    return v6;
  }

  Object.defineProperty(C7, "p", {
    get: C7,
    set: f8
  });

  try {
    C7.p();
  } catch (e11) {}
} while (0 < 3); // CRASH INFO
// ==========
// TERMSIG: 11
// STDERR:
// Received signal 11 SEGV_MAPERR 000000000008
// 
// ==== C stack trace ===============================
// 
//  [0x5592bccad53d]
//  [0x7f6f08df4520]
//  [0x5592be3d18af]
//  [0x5592be3f675a]
//  [0x5592be3fdd3b]
//  [0x5592be1fc188]
//  [0x5592be1f6448]
//  [0x5592be1f1c54]
//  [0x5592be1efe23]
//  [0x5592be1e8c79]
//  [0x5592bcf26ebf]
//  [0x5592bcf50ca6]
//  [0x5592bcf39e11]
//  [0x5592bcf42698]
//  [0x5592be075f2d]
//  [0x5592be071eed]
//  [0x5592be07199b]
//  [0x5592c039ec76]
// [end of stack trace]
// STDOUT:
// 
// ARGS: /home/source/ChromeV8/v8/out/fuzzbuild/d8 --expose-gc --omit-quit --future --harmony --assert-types --harmony-struct --allow-natives-syntax --interrupt-budget=1000 --fuzzing
// EXECUTION TIME: 39ms