function opt(opt_param) {
  const v1 = {};
  const v2 = [, v1];
  const v4 = JSON.stringify(v1);

  function v5(v6, v7, v8, v9) {
    do {
      with (BigInt) {
        const v13 = typeof d;
      }
    } while (0 < 0);

    const v15 = Array(v7);
    const v16 = v15[846297865];
  }

  const v17 = {};

  for (let v22 = 0; v22 < 100; v22++) {
    const v23 = v5(v17, 0);
  }

  const v24 = v5(0, 0, v4, 100);

  for (const v25 of v2) {
    const v26 = typeof v25;
    const v28 = v26 === "symbol";
  }

  const v29 = v5(100, v4, JSON, undefined);
  return v29;
}

let jit_a0 = opt(false);
opt(true);
let jit_a0_0 = opt(false);