for (let v0 = 0; v0 < 83; v0++) {
  function F1(a3, a4, a5, a6) {
    if (!new.target) {
      throw 'must be called with new';
    }

    const v8 = "number".source;

    function F9(a11, a12, ...a13) {
      if (!new.target) {
        throw 'must be called with new';
      }

      a13[0];

      try {
        const v15 = new F9(a12, ...a13, F9);
      } catch (e16) {}
    }

    const v17 = new F9(F9, v8, v8);
  }

  const v18 = new F1();
} // CRASH INFO
// ==========
// TERMSIG: 11
// STDERR:
// [COV] edge counters initialized. Shared memory: shm_id_1188638_23 with 1366912 edges
// V8 is running with experimental features enabled. Stability and security will suffer.
// Received signal 11 SEGV_ACCERR 22e4beadbef6
// 
// ==== C stack trace ===============================
// 
//  [0x55f77b30553d]
//  [0x7fea9490b520]
//  [0x55f77eae86a1]
// [end of stack trace]
// STDOUT:
// Warning: unknown flag --interrupt-budget=1000.
// Try --help for options
// ARGS: /home/source/ChromeV8/v8/out/fuzzbuild/d8 --expose-gc --omit-quit --future --harmony --assert-types --harmony-struct --allow-natives-syntax --interrupt-budget=1000 --fuzzing
// EXECUTION TIME: 118ms