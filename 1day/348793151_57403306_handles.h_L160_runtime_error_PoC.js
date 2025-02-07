class C0 {}

for (let i3 = 0, i4 = 10; i3 < i4; i4--) {}

class C11 {
  constructor(a13) {
    let v14;

    try {
      v14 = new C11(C0, this);
    } catch (e) {}

    const v15 = `
            for (const v18 of Float64Array(v14)) {
                class C19 {
                    [this] = v18;
                }
                for (let i = 0; i < 5; i++) {
                }
            }
        `;
    eval(v15);
  }

}

new C11(); // CRASH INFO
// ==========
// INSTANCE TAG: 11c72ad4
// TERMSIG: 11
// STDERR:
// ../../src/handles/handles.h:160:22: runtime error: load of null pointer of type 'Address' (aka 'unsigned long')
//     #0 0x5a336127e4c2 in v8::internal::Handle<v8::internal::SharedFunctionInfo>::operator*() const src/handles/handles.h:160:22
//     #1 0x5a336127e4c2 in v8::internal::Handle<v8::internal::SharedFunctionInfo>::operator->() const src/handles/handles.h:148:12
//     #2 0x5a336127e4c2 in bool v8::internal::(anonymous namespace)::IterativelyExecuteAndFinalizeUnoptimizedCompilationJobs<v8::internal::Isolate>(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Script>, v8::internal::ParseInfo*, v8::internal::AccountingAllocator*, v8::internal::IsCompiledScope*, std::__Cr::vector<v8::internal::FinalizeUnoptimizedCompilationData, std::__Cr::allocator<v8::internal::FinalizeUnoptimizedCompilationData>>*, std::__Cr::vector<v8::internal::DeferredFinalizationJobData, std::__Cr::allocator<v8::internal::DeferredFinalizationJobData>>*) src/codegen/compiler.cc:876:9
//     #3 0x5a3361288d55 in v8::internal::(anonymous namespace)::CompileToplevel(v8::internal::ParseInfo*, v8::internal::Handle<v8::internal::Script>, v8::internal::MaybeHandle<v8::internal::ScopeInfo>, v8::internal::Isolate*, v8::internal::IsCompiledScope*) src/codegen/compiler.cc:1587:8
//     #4 0x5a336128c10d in v8::internal::Compiler::GetFunctionFromEval(v8::internal::Handle<v8::internal::String>, v8::internal::Handle<v8::internal::SharedFunctionInfo>, v8::internal::Handle<v8::internal::Context>, v8::internal::LanguageMode, v8::internal::ParseRestriction, int, int, int, v8::internal::ParsingWhileDebugging) src/codegen/compiler.cc:2955:10
//     #5 0x5a336128ffcb in v8::internal::Compiler::GetFunctionFromValidatedString(v8::internal::Handle<v8::internal::NativeContext>, v8::internal::MaybeHandle<v8::internal::String>, v8::internal::ParseRestriction, int) src/codegen/compiler.cc:3145:10
//     #6 0x5a3360f96443 in v8::internal::Builtin_Impl_GlobalEval(v8::internal::BuiltinArguments, v8::internal::Isolate*) src/builtins/builtins-global.cc:105:3
//     #7 0x5a3360f955a5 in v8::internal::Builtin_GlobalEval(int, unsigned long*, v8::internal::Isolate*) src/builtins/builtins-global.cc:84:1
//     #8 0x5a336b695ab5 in Builtins_CEntry_Return1_ArgvOnStack_BuiltinExit setup-isolate-deserialize.cc
//     #9 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #10 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #11 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #12 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #13 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #14 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #15 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #16 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #17 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #18 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #19 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #20 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #21 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #22 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #23 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #24 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #25 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #26 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #27 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #28 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #29 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #30 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #31 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #32 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #33 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #34 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #35 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #36 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #37 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #38 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #39 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #40 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #41 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #42 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #43 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #44 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #45 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #46 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #47 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #48 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #49 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #50 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #51 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #52 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #53 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #54 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #55 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #56 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #57 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #58 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #59 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #60 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #61 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #62 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #63 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #64 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #65 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #66 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #67 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #68 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #69 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #70 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #71 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #72 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #73 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #74 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #75 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #76 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #77 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #78 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #79 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #80 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #81 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #82 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #83 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #84 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #85 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #86 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #87 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #88 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #89 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #90 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #91 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #92 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #93 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #94 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #95 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #96 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #97 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #98 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #99 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #100 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #101 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #102 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #103 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #104 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #105 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #106 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #107 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #108 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #109 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #110 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #111 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #112 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #113 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #114 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #115 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #116 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #117 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #118 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #119 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #120 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #121 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #122 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #123 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #124 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #125 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #126 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #127 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #128 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #129 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #130 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #131 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #132 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #133 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #134 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #135 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #136 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #137 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #138 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #139 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #140 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #141 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #142 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #143 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #144 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #145 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #146 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #147 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #148 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #149 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #150 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #151 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #152 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #153 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #154 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #155 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #156 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #157 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #158 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #159 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #160 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #161 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #162 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #163 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #164 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #165 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #166 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #167 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #168 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #169 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #170 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #171 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #172 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #173 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #174 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #175 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #176 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #177 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #178 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #179 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #180 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #181 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #182 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #183 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #184 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #185 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #186 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #187 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #188 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #189 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #190 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #191 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #192 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #193 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #194 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #195 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #196 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #197 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #198 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #199 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #200 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #201 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #202 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #203 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #204 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #205 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #206 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #207 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #208 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #209 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #210 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #211 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #212 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #213 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #214 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #215 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #216 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #217 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #218 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #219 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #220 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #221 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #222 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #223 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #224 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #225 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #226 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #227 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #228 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #229 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #230 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #231 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #232 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #233 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #234 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #235 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #236 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #237 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #238 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #239 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #240 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #241 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #242 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #243 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #244 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #245 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #246 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #247 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #248 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #249 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #250 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #251 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #252 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #253 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
//     #254 0x5a336b7db561 in Builtins_ConstructHandler setup-isolate-deserialize.cc
//     #255 0x5a336b5e30a6 in Builtins_InterpreterEntryTrampoline setup-isolate-deserialize.cc
//     #256 0x5a336b5e3bbe in Builtins_InterpreterPushArgsThenFastConstructFunction setup-isolate-deserialize.cc
// 
// SUMMARY: UndefinedBehaviorSanitizer: undefined-behavior ../../src/handles/handles.h:160:22 
// Received signal 11 SEGV_MAPERR 000000000000
// 
// ==== C stack trace ===============================
// 
//  [0x5a33607848c6]
//  [0x5a3360bc1bb2]
//  [0x5a3360bc0e61]
//  [0x7d2b8a042520]
//  [0x5a336127e05e]
//  [0x5a3361288d56]
//  [0x5a336128c10e]
//  [0x5a336128ffcc]
//  [0x5a3360f96444]
//  [0x5a3360f955a6]
//  [0x5a336b695ab6]
// [end of stack trace]
// STDOUT:
// 
// FUZZER ARGS: .build/x86_64-unknown-linux-gnu/debug/FuzzilliCli --profile=v8 ../v8/out/fuzzbuild/d8 --jobs=32 --engine=multi --logLevel=verbose --timeout=1200 --storagePath=../v8_fuzzing_results --resume --exportStatistics --statisticsExportInterval=5 --diagnostics --tag=11c72ad4
// TARGET ARGS: ../v8/out/fuzzbuild/d8 --expose-gc --omit-quit --allow-natives-syntax --fuzzing --jit-fuzzing --future --harmony --js-staging
// CONTRIBUTORS: StringGenerator, NumberComputationGenerator, CodeGenMutator, ClassInstanceComputedPropertyGenerator, ClassDefinitionGenerator, ComplexForLoopGenerator, SuperPropertyRetrievalGenerator, ConstructorCallGenerator, ClassInstanceGetterGenerator, SuperMethodCallGenerator, DestructArrayGenerator
// EXECUTION TIME: 1118ms