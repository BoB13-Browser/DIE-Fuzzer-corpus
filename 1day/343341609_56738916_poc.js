function foo() {}

const a = new foo();
const b = new foo();
Object.defineProperty(b, "toString", {
  writable: true,
  enumerable: true,
  value: foo
});
const o = { ...a
};