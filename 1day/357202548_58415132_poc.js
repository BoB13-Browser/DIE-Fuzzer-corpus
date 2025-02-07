function f1(a2) {
  let o5 = { ...a2,
    "a": 1.0,
    "b": 2.0,

    get c() {
      return 3.0;
    },

    get d() {
      return "12";
    }

  };
  return o5;
}

let v11 = JSON.stringify(f1(5.0));
JSON.parse(v11);
JSON.parse(v11);