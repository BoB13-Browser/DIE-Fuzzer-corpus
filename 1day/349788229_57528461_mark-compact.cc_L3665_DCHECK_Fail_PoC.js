const v3 = [-1000000.0, -2.0];
const v4 = [8.188669321360514e+307, -4.881277614076338, -2.220446049250313e-16, -1.0, -627963.0747312859, 1000000000000.0];
const v5 = [4.058042984306219];
const v6 = [v5, 495541546, v5, v5, v5, v3];
[1, [v4, v4], v6, v3, v4];
new Error();
const v13 = Array(129);

function F16() {
  if (!new.target) {
    throw 'must be called with new';
  }

  function f19(a20, a21) {
    a21++;
    new Float64Array(80911573);
    const o26 = { ...a20,
      "c": a21
    };
    return o26;
  }

  f19(f19(255, 255));

  class C29 extends f19 {}

  new C29();
}

new F16();
delete v13.length;
const v35 = new Uint8Array(1570, 495541546, 1982187567);
const o36 = {};

for (const v37 in v35) {
  const v38 = v37.anchor(Array, v35);
  o36[v38] = v38;
}

const o39 = { ...o36,
  ...v13,
  "g": true,
  [1073741823]: o36
}; // CRASH INFO
// ==========
// INSTANCE TAG: e855c14c
// TERMSIG: 6
// STDERR:
// #
// # Fatal error in ../../src/heap/mark-compact.cc, line 3665
// # Debug check failed: !InReadOnlySpace(value).
// #
// #
// #
// #FailureMessage Object: 0x7d9b5c65dc60
// ==== C stack trace ===============================
// 
//     ../v8/out/fuzzbuild/d8(___interceptor_backtrace+0x46) [0x5cb9123318c6]
//     ../v8/out/fuzzbuild/d8(v8::base::debug::StackTrace::StackTrace()+0x22) [0x5cb91275ff32]
//     ../v8/out/fuzzbuild/d8(+0x6138747) [0x5cb912758747]
//     ../v8/out/fuzzbuild/d8(V8_Fatal(char const*, int, char const*, ...)+0x346) [0x5cb91272ef8e]
//     ../v8/out/fuzzbuild/d8(+0x610d9ec) [0x5cb91272d9ec]
//     ../v8/out/fuzzbuild/d8(v8::internal::MarkCompactCollector::ClearNonTrivialWeakReferences()+0x9af) [0x5cb91400830f]
//     ../v8/out/fuzzbuild/d8(v8::internal::MarkCompactCollector::ClearNonLiveReferences()+0x47b2) [0x5cb913fd3fe2]
//     ../v8/out/fuzzbuild/d8(v8::internal::MarkCompactCollector::CollectGarbage()+0x8b) [0x5cb913fca4cb]
//     ../v8/out/fuzzbuild/d8(v8::internal::Heap::MarkCompact()+0x292) [0x5cb913c75e22]
//     ../v8/out/fuzzbuild/d8(v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::internal::GarbageCollectionReason, char const*)+0x12c4) [0x5cb913c73124]
//     ../v8/out/fuzzbuild/d8(+0x771f155) [0x5cb913d3f155]
//     ../v8/out/fuzzbuild/d8(+0x771e60c) [0x5cb913d3e60c]
//     ../v8/out/fuzzbuild/d8(+0xbdc28f3) [0x5cb9183e28f3]
// Received signal 6
// STDOUT:
// 
// FUZZER ARGS: .build/x86_64-unknown-linux-gnu/debug/FuzzilliCli --profile=v8 ../v8/out/fuzzbuild/d8 --jobs=32 --engine=multi --logLevel=verbose --timeout=1200 --storagePath=../v8_fuzzing_results --resume --exportStatistics --statisticsExportInterval=5 --diagnostics --tag=e855c14c
// TARGET ARGS: ../v8/out/fuzzbuild/d8 --expose-gc --omit-quit --allow-natives-syntax --fuzzing --jit-fuzzing --future --harmony --js-staging