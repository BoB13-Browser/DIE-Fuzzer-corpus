function f0(a1) {
  this.x = 20;
  let v4 = 0;

  if (a1) {
    const o6 = {
      "x": 10
    };
    v4 = o6;
  }

  return v4;
}

for (let i8 = 0; (() => {
  function f10(a11, a12, a13, a14) {
    return a11;
  }

  return i8 < 100;
})(); i8++) {
  const v23 = new f0((i8 & 1) == 1);

  if (i8 & 1) {
    Object.defineProperty(v23, 1, {
      writable: true,
      configurable: true,
      value: 1
    });
  }

  const v26 = /./g;

  function f27() {
    return i8;
  }

  v26.exec = f27;

  function f28() {}
} // CRASH INFO
// ==========
// TERMSIG: 6
// STDERR:
// #
// # Fatal error in ../../src/maglev/maglev-ir.cc, line 4014
// # Debug check failed: old_property_array != new_property_array (rdi vs. rdi).
// #
// #
// #
// #FailureMessage Object: 0x7ffc84f4ce90Received signal 6
// 
// ==== C stack trace ===============================
// 
//  [0x563567a9b64d]
//  [0x7fee7723b520]
//  [0x7fee7728f9fc]
//  [0x7fee7723b476]
//  [0x7fee772217f3]
//  [0x563567a96391]
//  [0x563567a8ccb4]
//  [0x563567a8c545]
//  [0x563569a1034f]
//  [0x5635696ad9d7]
//  [0x56356967a0ae]
//  [0x563569677c48]
//  [0x56356952071c]
//  [0x563569517449]
//  [0x563567df064f]
//  [0x563567e2ef44]
//  [0x563567e0b81a]
//  [0x563567e16e9e]
//  [0x5635693643b3]
//  [0x56356935eb1a]
//  [0x56356935e5bb]
//  [0x56356b7ef576]
// [end of stack trace]
// STDOUT:
// 
// FUZZER ARGS: .build/x86_64-unknown-linux-gnu/release/FuzzilliCli --jobs=30 --profile=v8 --timeout=500 --storagePath=/root/fuzz_main --importCorpus=/root/dev/corpus/regress_test --corpusImportMode=full --argumentRandomization /root/v8_src.main/v8/out/fuzz/d8
// TARGET ARGS: /root/v8_src.main/v8/out/fuzz/d8 --expose-gc --omit-quit --allow-natives-syntax --fuzzing --jit-fuzzing --async-stack-traces --wasm-staging --future --harmony --turboshaft-csa --js-staging --maglev-loop-peeling --wasm-sync-tier-up --wasm-tiering-budget=2000 --experimental-wasm-type-reflection --experimental-wasm-memory64 --experimental-wasm-stringref --experimental-wasm-imported-strings --experimental-wasm-inlining --experimental-wasm-exnref --wasm-inlining-budget=200 --wasm-inlining-max-size=100 --maglev-skip-migration-check-for-polymorphic-access --harmony-intl-duration-format --js-atomics-pause --enable-sharedarraybuffer-per-context --optimize-on-next-call-optimizes-to-maglev --maglev-optimistic-peeled-loops --maglev-inline-api-calls --maglev-extend-properties-backing-store --concurrent-maglev-high-priority-threads --enable-enumerated-keyed-access-bytecode --decommit-pooled-pages --no-stress-lazy-source-positions --concurrent-sparkplug-high-priority-threads --sparkplug-needs-short-builtins --shared-string-table --transition-strings-during-gc-with-stack --stress-concurrent-inlining --no-stress-concurrent-inlining-attach-code --no-stress-turbo-late-spilling --no-stress-inline --turbo-instruction-scheduling --turbo-stress-instruction-scheduling --no-stress-gc-during-compilation --turboshaft-wasm --turboshaft-wasm-load-elimination --turboshaft-loop-peeling --turboshaft-wasm-instruction-selection-staged --turboshaft-csa --turboshaft-verify-reductions --optimize-for-size --turboshaft-wasm-wrappers --wasm-sync-tier-up --experimental-wasm-type-reflection --experimental-wasm-stringref --experimental-wasm-imported-strings --experimental-wasm-exnref --experimental-wasm-jspi --wasm-staging --wasm-inlining-ignore-call-counts --wasm-fuzzer-gen-test --wasm-simd-ssse3-codegen --no-stress-wasm-code-gc --flush-liftoff-code --lazy-new-space-shrinking --separate-gc-phases --gc-global --scavenge-separate-stack-scanning --optimize-gc-for-battery --compact-on-every-full-gc --no-stress-compaction --no-stress-compaction-random --flush-baseline-code --flush-code-based-on-time --stress-flush-code --stress-per-context-marking-worklist --stress-incremental-marking --concurrent-marking-high-priority-threads --randomize-all-allocations --manual-evacuation-candidates-selection --intel-jcc-erratum-mitigation --enable-source-at-csa-bind --no-stress-background-compile --embedder-instance-types --expose-externalize-string --builtins-in-stack-traces --experimental-report-exceptions-from-callbacks --allow-unsafe-function-constructor --force-slow-path --always-osr --prepare-always-turbofan --deopt-to-baseline --parallel-compile-tasks-for-lazy --expose-inspector-scripts --fast-map-update --mega-dom-ic --move-prototype-transitions-first --detailed-error-stack-trace --regexp-interpret-all --minor-ms --sticky-mark-bits --use-external-strings --predictable --parallel-pause-for-gc-in-background
// CONTRIBUTORS: CodeGenMutator, ComputedPropertyConfigurationGenerator, ObjectConstructorGenerator, FloatGenerator, ArrayGenerator, ObjectBuilderFunctionGenerator, ObjectLiteralCopyPropertiesGenerator, SpliceMutator, IteratorGenerator, ComputedPropertyRemovalGenerator, CombineMutator, ObjectLiteralElementGenerator
// EXECUTION TIME: 165ms