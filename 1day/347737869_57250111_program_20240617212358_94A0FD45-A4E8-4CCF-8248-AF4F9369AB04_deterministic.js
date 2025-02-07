for (let v0 = 0; v0 < 100; v0++) {
  const v2 = "number".source;

  function F3(a5, a6, ...a7) {
    if (!new.target) {
      throw 'must be called with new';
    }

    a7[0];

    try {
      const v9 = new F3(a6, ...a7, F3);
    } catch (e10) {}
  }

  const v11 = new F3(F3, v2, v2);
} // CRASH INFO
// ==========
// TERMSIG: 11
// STDERR:
// Received signal 11 SEGV_ACCERR 2ea1beadbef6
// 
// ==== C stack trace ===============================
// 
//  [0x55f9adfdb53d]
//  [0x7f4b0d7dc520]
//  [0x55f9b17be6a1]
// [end of stack trace]
// STDOUT:
// 
// ARGS: /home/source/ChromeV8/v8/out/fuzzbuild/d8 --expose-gc --omit-quit --future --harmony --assert-types --harmony-struct --allow-natives-syntax --interrupt-budget=1000 --fuzzing
// EXECUTION TIME: 101ms