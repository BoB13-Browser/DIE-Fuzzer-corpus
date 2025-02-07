let a = new Set();
let b = new Set();
Object.defineProperty(b, 'size', {
  get: () => {
    a.clear();
    return 0; // |b.size| must be a number
  }
});
a.intersection(b);