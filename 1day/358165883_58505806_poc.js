function f0(a1) {
  const o2 = {};
  with (o2) {
    {}
  }
  const v3 = [];
  let v4 = 4207423782;

  while (a1--) {
    {
      v4 = v4 ^ v4 << 13;
      v4 = v4 ^ v4 >> 17;
      v4 = v4 ^ v4 << 5;
      v3.push(v4 >>> 0);
    }
  }

  return v3;
}

function f18(a19, a20, a21, a22) {
  const o23 = {};
  with (o23) {
    {}
  }

  for (const v26 of f0(10000)) {
    {
      a22(v26);
      a20(v26);
      a21(v26);
    }
  }
}

function f30(a31) {
  function f33(a34) {
    a34 = a34 | 0;
    let v37 = 0;
    return (v37 = (a34 >>> 0) / 2 >>> 0) | 0;
  }

  return f33;
}

const v46 = f30();

function f47(a48) {
  a48 = a48 | 0;
  let v51 = 0;
  return (v51 = (a48 >>> 0) / 2 >>> 0) | 0;
}

function f60(a61) {
  const o62 = {};
  with (o62) {
    {}
  }
  a61 = a61 | 0;
  let v65 = 0;
  return (v65 = (a61 >>> 0) / 2 >>> 0) | 0;
}

f18("div2", v46, f47, f60);

function f76(a77) {
  function f79(a80) {
    a80 = a80 | 0;
    let v83 = 0;
    return (v83 = (a80 >>> 0) / 3 >>> 0) | 0;
  }

  return f79;
}

const v92 = f76();

function f93(a94) {
  a94 = a94 | 0;
  let v97 = 0;
  return (v97 = (a94 >>> 0) / 3 >>> 0) | 0;
}

function f106(a107) {
  const o108 = {};
  with (o108) {
    {}
  }
  a107 = a107 | 0;
  let v111 = 0;
  return (v111 = (a107 >>> 0) / 3 >>> 0) | 0;
}

f18("div3", v92, f93, f106);

function f122(a123) {
  function f125(a126) {
    a126 = a126 | 0;
    let v129 = 0;
    return (v129 = (a126 >>> 0) / 7 >>> 0) | 0;
  }

  return f125;
}

const v138 = f122();

function f139(a140) {
  a140 = a140 | 0;
  let v143 = 0;
  return (v143 = (a140 >>> 0) / 7 >>> 0) | 0;
}

function f152(a153) {
  const o154 = {};
  with (o154) {
    {}
  }
  a153 = a153 | 0;
  let v157 = 0;
  return (v157 = (a153 >>> 0) / 7 >>> 0) | 0;
}

f18("div7", v138, f139, f152);