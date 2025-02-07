function f1() {
  return 13;
}

const o7 = {
  [-2]: "replace",

  set g(a6) {},

  "g": 9,
  "d": -6.544569862975729,
  "b": -6.544569862975729
};
JSON.parse(JSON.stringify(o7), f1);