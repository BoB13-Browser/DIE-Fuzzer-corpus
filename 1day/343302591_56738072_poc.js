const v1 = new WeakSet();

function f2(a3, a4) {
  return a4;
}

const o5 = { ...v1
};
v1.valueOf = f2;