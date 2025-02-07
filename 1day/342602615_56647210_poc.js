function f(value) {
  let originalPrototype, newPrototype;
  let handler = {
    set(target, key, value, receiver) {
      if (receiver === newPrototype) return Reflect.set(target, key, value);
      return Reflect.set(target, key, value, receiver);
    }

  };
  originalPrototype = Object.getPrototypeOf(value);
  newPrototype = new Proxy(originalPrototype, handler);
  Object.setPrototypeOf(value, newPrototype);
}

for (let v8 = 0; v8 < 257; v8++) {
  f(Number);
}