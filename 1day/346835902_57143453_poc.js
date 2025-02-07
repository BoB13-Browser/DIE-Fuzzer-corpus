const func1 = arg => {
  return { ...arg
  };
};

const func2 = arg => {
  return { ...arg
  };
};

function main() {
  const val = {
    a: 0
  };
  Object.defineProperty(val, 'a', {
    writable: false
  });
  const ret = func1(val);
  Object.defineProperty(ret, 'a', {
    value: Math.PI
  });
  const ret1 = func2(val);
  Object.defineProperty(ret1, 'a', {
    value: Math.PI
  });
  Object.defineProperty(val, 'a', {
    value: URIError
  });
}

main();
main(); //flags: --jit-fuzzing