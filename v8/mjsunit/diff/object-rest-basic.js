// // Copyright 2016 the V8 project authors. All rights reserved.
// // Use of this source code is governed by a BSD-style license that can be
// // found in the LICENSE file.
var { ...x
} = {
  a: 1
};
({
  a: 1
});
x;
var { ...x
} = {
  a: 1,
  b: 1
};
({
  a: 1,
  b: 1
});
x;
var {
  x,
  ...x
} = {
  a: 1,
  b: 1
};
({
  a: 1,
  b: 1
});
x;
var {
  x = {},
  ...x
} = {
  a: 1,
  b: 1
};
({
  a: 1,
  b: 1
});
x;
var {
  y,
  ...x
} = {
  y: 1,
  a: 1
};
({
  a: 1
});
x;
1;
y;
var {
  z,
  y,
  ...x
} = {
  z: 1,
  y: 1,
  a: 1,
  b: 1
};
({
  a: 1,
  b: 1
});
x;
1;
y;
1;
z;
({
  a,
  ...b
} = {
  a: 1,
  b: 2
});
1;
a;
({
  b: 2
});
b;
var { ...x
} = {};
({});
x;
var key = "b";
var {
  [key]: y,
  ...x
} = {
  b: 1,
  a: 1
};
({
  a: 1
});
x;
1;
y;
var key = 1;
var {
  [key++]: y,
  ...x
} = {
  1: 1,
  a: 1
};
({
  a: 1
});
x;
key;
2;
1;
y;
var key = '1';
var {
  [key]: y,
  ...x
} = {
  1: 1,
  a: 1
};
({
  a: 1
});
x;
1;
y;

function example({
  a,
  ...rest
}, {
  b = rest
}) {
  1;
  a;
  ({
    b: 2,
    c: 3
  });
  rest;
  ({
    b: 2,
    c: 3
  });
  b;
}

;
example({
  a: 1,
  b: 2,
  c: 3
}, {
  b: undefined
});
var x = {
  a: 3
};
var y = {
  set a(val) {},

  ...x
};
y.a;
3;
var { ...y
} = {
  get a() {
    return 1;
  }

};
({
  a: 1
});
y;
var x = {
  get a() {
    throw new Error();
  }

};

(() => {
  var { ...y
  } = x;
})();

var p = new Proxy({}, {
  ownKeys() {
    throw new Error();
  }

});

(() => {
  var { ...y
  } = p;
})();

var p = new Proxy({}, {
  ownKeys() {
    [1];
  },

  get() {
    throw new Error();
  }

});

(() => {
  var { ...y
  } = p;
})();

var p = new Proxy({}, {
  ownKeys() {
    [1];
  },

  getOwnPropertyDescriptor() {
    throw new Error();
  }

});

(() => {
  var { ...y
  } = p;
})();

var z = {
  b: 1
};
var p = new Proxy(z, {
  ownKeys() {
    return Object.keys(z);
  },

  get(_, prop) {
    return z[prop];
  },

  getOwnPropertyDescriptor(_, prop) {
    return Object.getOwnPropertyDescriptor(z, prop);
  }

});
var { ...y
} = p;
z;
y;
var z = {
  b: 1
};
var { ...y
} = { ...z
};
z;
y;
var count = 0;

class Foo {
  constructor(x) {
    this.x = x;
  }

  toString() {
    count++;
    return this.x.toString();
  }

}

var f = new Foo(1);
var {
  [f]: x,
  ...y
} = {
  1: 1,
  2: 2
};
1;
count;
({
  2: 2
});
y;
var {
  1: x,
  2: y,
  ...z
} = {
  1: 1,
  2: 2,
  3: 3
};
1;
x;
2;
y;
({
  3: 3
});
z;
var {
  1.5: x,
  2: y,
  ...z
} = {
  1.5: 1,
  2: 2,
  3: 3
};
1;
x;
2;
y;
({
  3: 3
});
z;

(({
  x,
  ...z
}) => {
  ({
    y: 1
  });
  z;
})({
  x: 1,
  y: 1
});

var [...{ ...z
}] = [{
  x: 1
}];
({
  0: {
    x: 1
  }
});
z;
var x = {};
({ ...x.f
} = {
  a: 1
});
x.f;
({
  a: 1
});
var x = [];
({ ...x[0]
} = {
  a: 1
});
x[0];
({
  a: 1
});
var {
  4294967297: y,
  ...x
} = {
  4294967297: 1,
  x: 1
};
1;
y;
({
  x: 1
});
x;
var obj = {
  [Symbol.toPrimitive]() {
    return 1;
  }

};
var {
  [obj]: y,
  ...x
} = {
  1: 1,
  x: 1
};
1;
y;
({
  x: 1
});
x;
var {
  [null]: y,
  ...x
} = {
  null: 1,
  x: 1
};
1;
y;
({
  x: 1
});
x;
var {
  [true]: y,
  ...x
} = {
  true: 1,
  x: 1
};
1;
y;
({
  x: 1
});
x;
var {
  [false]: y,
  ...x
} = {
  false: 1,
  x: 1
};
1;
y;
({
  x: 1
});
x;