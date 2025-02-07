function f0(a1, a2) {
  try {
    a1.apply(a1, f0, f0, f0, a1);
  } catch (e) {}

  return a2;
}

for (let v5 = 0; v5 < 5; v5++) {
  const v6 = v5--;

  function F7(a9, a10, a11) {
    if (!new.target) {
      throw 'must be called with new';
    }
  }

  const v12 = new F7(f0, F7, v6);
  v12.constructor = f0;
  const v13 = v12.constructor;
  v13(v5);
  v13(BigInt64Array);
} // CRASH INFO
// ==========
// TERMSIG: 6
// STDERR:
// #
// # Fatal error in ../../src/maglev/maglev-ir.cc, line 601
// # Type representation error: node BranchIfSmi (input @0 = Int32DecrementWithOverflow) type Int32 is not Tagged
// #
// #
// #
// #FailureMessage Object: 0x7fd67de826d0
// ==== C stack trace ===============================
// 
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x959362) [0x5607799ad362]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x957e37) [0x5607799abe37]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x94a916) [0x56077999e916]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x23489e8) [0x56077b39c9e8]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x1f66fd1) [0x56077afbafd1]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x1ecb104) [0x56077af1f104]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x1ec8b72) [0x56077af1cb72]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x1ec14c9) [0x56077af154c9]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0xbd28bf) [0x560779c268bf]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x1ec3f72) [0x56077af17f72]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x95b88f) [0x5607799af88f]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x9658f5) [0x5607799b98f5]
//     ../clean_v8/v8/out/fuzzbuild/d8(+0x9558d9) [0x5607799a98d9]
//     /lib/x86_64-linux-gnu/libc.so.6(+0x94ac3) [0x7fd68da46ac3]
//     /lib/x86_64-linux-gnu/libc.so.6(+0x126850) [0x7fd68dad8850]
// Received signal 6
// STDOUT:
// 
// FUZZER ARGS: .build/x86_64-unknown-linux-gnu/release/FuzzilliCli --profile=v8 --storagePath=./out --jobs=32 ../clean_v8/v8/out/fuzzbuild/d8
// TARGET ARGS: ../clean_v8/v8/out/fuzzbuild/d8 --expose-gc --omit-quit --allow-natives-syntax --fuzzing --jit-fuzzing --future --harmony --js-staging
// CONTRIBUTORS: FloatArrayGenerator, ClassPrivateStaticMethodGenerator, ClassInstanceComputedPropertyGenerator, ClassDefinitionGenerator, CodeGenMutator, ExplorationMutator, EvalGenerator, InputMutator, ComputedPropertyRetrievalGenerator, UpdateGenerator, ClassStaticComputedPropertyGenerator, BigIntGenerator, PrivatePropertyUpdateGenerator, ClassPrivateInstancePropertyGenerator
// EXECUTION TIME: 223ms