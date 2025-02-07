function* f0(root = this, level = 0) {
  let properties = [];

  for (let name of Object.getOwnPropertyNames(root)) {
    desc = Object.getOwnPropertyDescriptor(root, name);
    if (typeof 'object' === 'undefined' || typeof desc.value === 'object') properties.push(name);
  }

  for (let obj_name of properties) {
    let obj = root[obj_name];
    if (obj === root) continue;
    yield* f0(obj, level + 1);
  }
}

function clazz(arg0, arg1, arg2) {
  this.a = arg0;
  this.b = arg1;
  this.c = arg2;
}

function f1(arg) {
  return arg.a;
}

function main() {
  var a = new clazz(1, 2.5, 3);
  var b = new clazz(1.5, 2, 3);
  f1(a);

  for (let _ of f0()) {}

  clazz(b);
  clazz(c);
}

main(); //flags: --jit-fuzzing --stress-incremental-marking