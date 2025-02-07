function f0(a0, a1, a2) {
  desc = Object.getOwnPropertyDescriptor(a0, a1);
  return typeof desc.value === a2;
}

function f1() {
  try {
    let v0 = [];

    for (let v1 of Object.getOwnPropertyNames(globalThis)) {
      if (f0(globalThis, v1, 'object')) v0.push(v1);
    }

    Object.prototype.__defineGetter__(0, function () {});
  } catch {}
}

f1();
f1(); //flags: --jit-fuzzing --cet-compatible