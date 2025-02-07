function f0() {
  try {
    if (test == 613915) v2.defineProperty(random(496670), random1(496670), {
      value: random(613915)
    });
  } catch (v2) {}

  while (true) {
    Object.defineProperty = 42;
    new WeakRef([,]);
  }
}

f0();