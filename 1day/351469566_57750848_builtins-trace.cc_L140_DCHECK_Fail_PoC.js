for (let i2 = 0, i3 = 10; i3--, 0.5166086559535142 < i3;) {}

for (let i13 = 0, i14 = 10; i14--;) {}

d8.getExtrasBindingObject(d8).trace(); // CRASH INFO
// ==========
// INSTANCE TAG: 2d71de11
// TERMSIG: 6
// STDERR:
// [COV] edge counters initialized. Shared memory: shm_id_3574252_0 with 3091490 edges
// 
// 
// #
// # Fatal error in ../../src/builtins/builtins-trace.cc, line 140
// # Debug check failed: Handle<To> v8::internal::Cast(Handle<From>, const v8::SourceLocation &) [To = v8::internal::String, From = v8::internal::Object].
// #
// #
// #
// #FailureMessage Object: 0x70d69c238060
// ==== C stack trace ===============================
// 
//     ../v8/out/fuzzbuild/d8(___interceptor_backtrace+0x46) [0x59e9956cb8c6]
//     ../v8/out/fuzzbuild/d8(v8::base::debug::StackTrace::StackTrace()+0x22) [0x59e995b03052]
//     ../v8/out/fuzzbuild/d8(+0x6142867) [0x59e995afb867]
//     ../v8/out/fuzzbuild/d8(V8_Fatal(char const*, int, char const*, ...)+0x346) [0x59e995ad20ae]
//     ../v8/out/fuzzbuild/d8(+0x6117b0c) [0x59e995ad0b0c]
//     ../v8/out/fuzzbuild/d8(+0x65ad9fa) [0x59e995f669fa]
//     ../v8/out/fuzzbuild/d8(v8::internal::Builtin_Trace(int, unsigned long*, v8::internal::Isolate*)+0x1ae) [0x59e995f65f46]
//     ../v8/out/fuzzbuild/d8(+0x10ccb7b6) [0x59e9a06847b6]
// Received signal 6
// STDOUT:
// 
// FUZZER ARGS: .build/x86_64-unknown-linux-gnu/debug/FuzzilliCli --profile=v8 ../v8/out/fuzzbuild/d8 --jobs=32 --engine=multi --logLevel=verbose --timeout=800 --storagePath=../v8_fuzzing_results --resume --exportStatistics --statisticsExportInterval=5 --diagnostics --tag=2d71de11
// TARGET ARGS: ../v8/out/fuzzbuild/d8 --expose-gc --omit-quit --allow-natives-syntax --fuzzing --jit-fuzzing --future --harmony --js-staging
// CONTRIBUTORS: SpliceMutator, ObjectLiteralSetterGenerator, InputMutator, ExplorationMutator, FastToSlowPropertiesGenerator, FloatGenerator, ObjectLiteralPropertyGenerator, ObjectConstructorGenerator, StringGenerator, ObjectBuilderFunctionGenerator
// EXECUTION TIME: 417ms