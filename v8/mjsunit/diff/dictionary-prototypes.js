// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function EnsureDictionaryMode(obj, properties = 1500) {
  for (let i = 0; i < properties; i++) {
    obj["x" + i] = 0;
  }
}

function EnsureAlmostDictionaryMode(obj) {
  for (let i = 0; i < 1020; i++) {
    obj["x" + i] = 0;
  }
}

function TestAddingPropertyToDictionaryPrototype() {
  let foo_func_called = 0;
  let bar_func_called = 0;

  function Foo() {
    ;
  }

  Foo.prototype.func = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureDictionaryMode(Bar.prototype);
  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Foo.
    o.func(); // Add the property to Bar which is a dictionary-mode prototype between o
    // and Foo. In the next iteration, it's looked up from Bar.

    if (i == 9) {
      // The UNINITIALIZED -> PREMONOMORPHIC transition of StoreIC should
      // properly invalidate prototype chains.
      Bar.prototype.func = function () {
        ++bar_func_called;
      };
    }
  }

  10;
  foo_func_called;
  1;
  bar_func_called;
}

TestAddingPropertyToDictionaryPrototype(); // Same as TestAddingPropertyToDictionaryPrototype, but using o["foo"] access
// instead of o.foo.

function TestAddingPropertyToDictionaryPrototype2() {
  let foo_func_called = 0;
  let bar_func_called = 0;
  let name = "func";

  function Foo() {
    ;
  }

  Foo.prototype[name] = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureDictionaryMode(Bar.prototype);
  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Foo.
    o[name](); // Add the property to Bar which is a dictionary-mode prototype between o
    // and Foo. In the next iteration, it's looked up from Bar.

    if (i == 9) {
      // The UNINITIALIZED -> PREMONOMORPHIC transition of KeyedStoreIC should
      // properly invalidate prototype chains.
      Bar.prototype[name] = function () {
        ++bar_func_called;
      };
    }
  }

  10;
  foo_func_called;
  1;
  bar_func_called;
}

TestAddingPropertyToDictionaryPrototype2();

function TestAddingPropertyToDictionaryPrototype_DefineProperty() {
  let foo_func_called = 0;
  let bar_func_called = 0;

  function Foo() {
    ;
  }

  Foo.prototype.func = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureDictionaryMode(Bar.prototype);
  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Foo.
    o.func(); // Add the property to Bar which is a dictionary-mode prototype between o
    // and Foo. In the next iteration, it's looked up from Bar.

    if (i == 9) {
      // The runtime should properly invalidate prototype chains.
      Object.defineProperty(Bar.prototype, "func", {
        value: function () {
          ++bar_func_called;
        }
      });
    }
  }

  10;
  foo_func_called;
  1;
  bar_func_called;
}

TestAddingPropertyToDictionaryPrototype_DefineProperty();

function TestAddingPropertyToDictionaryPrototype_DictionaryAddSlowPath() {
  let foo_func_called = 0;
  let bar_func_called = 0;

  function Foo() {
    ;
  }

  Foo.prototype.func = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype); // The magic number ensures that the next addition to the dictionary will
  // trigger the slow path.

  EnsureDictionaryMode(Bar.prototype, 2731);
  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Foo.
    o.func(); // Add the property to Bar which is a dictionary-mode prototype between o
    // and Foo. In the next iteration, it's looked up from Bar.

    if (i == 9) {
      // -> slow path for dictionary add
      Bar.prototype.func = function () {
        ++bar_func_called;
      };
    }
  }

  10;
  foo_func_called;
  1;
  bar_func_called;
}

TestAddingPropertyToDictionaryPrototype_DictionaryAddSlowPath();

function TestAddingAccessorPropertyToDictionaryPrototype() {
  let foo_func_called = 0;
  let bar_func_called = 0;

  function Foo() {
    ;
  }

  Foo.prototype.func = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureDictionaryMode(Bar.prototype);
  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Foo.
    o.func(); // Add the property to Bar which is a dictionary-mode prototype between o
    // and Foo. In the next iteration, it's looked up from Bar.

    if (i == 9) {
      Object.defineProperty(Bar.prototype, "func", {
        get: function () {
          return function () {
            ++bar_func_called;
          };
        }
      });
    }
  }

  10;
  foo_func_called;
  1;
  bar_func_called;
}

TestAddingAccessorPropertyToDictionaryPrototype();

function TestRemovingPropertyFromDictionaryPrototype() {
  let foo_func_called = 0;
  let bar_func_called = 0;

  function Foo() {
    ;
  }

  Foo.prototype.func = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureDictionaryMode(Bar.prototype);

  Bar.prototype.func = function () {
    ++bar_func_called;
  };

  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Bar.
    o.func(); // Remove the property from Bar which is a dictionary-mode prototype between
    // o and Foo. In the next iteration, it's looked up from Foo.

    if (i == 9) {
      delete Bar.prototype.func;
    }
  }

  1;
  foo_func_called;
  10;
  bar_func_called;
}

TestRemovingPropertyFromDictionaryPrototype(); // Same as TestRemovingPropertyFromDictionaryPrototype, but using o["foo"] access
// instead of o.foo.

function TestRemovingPropertyFromDictionaryPrototype2() {
  let foo_func_called = 0;
  let bar_func_called = 0;
  let name = "func";

  function Foo() {
    ;
  }

  Foo.prototype[name] = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureDictionaryMode(Bar.prototype);

  Bar.prototype[name] = function () {
    ++bar_func_called;
  };

  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Bar.
    o[name](); // Remove the property from Bar which is a dictionary-mode prototype between
    // o and Foo. In the next iteration, it's looked up from Foo.

    if (i == 9) {
      delete Bar.prototype[name];
    }
  }

  1;
  foo_func_called;
  10;
  bar_func_called;
}

TestRemovingPropertyFromDictionaryPrototype2();

function TestAddingPropertyToDictionaryPrototype_Monomorphic() {
  function DoMonomorphicStoreToPrototype(p, f, do_delete = true) {
    p.func = f;

    if (do_delete) {
      delete p.func;
    }
  }

  let foo_func_called = 0;
  let bar_func_called = 0;

  function Foo() {
    ;
  }

  Foo.prototype.func = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureDictionaryMode(Bar.prototype);

  function bar_func() {
    ++bar_func_called;
  }

  DoMonomorphicStoreToPrototype(Bar.prototype, bar_func);
  DoMonomorphicStoreToPrototype(Bar.prototype, bar_func);
  DoMonomorphicStoreToPrototype(Bar.prototype, bar_func);
  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Foo.
    o.func(); // Add the property to Bar which is a dictionary-mode prototype between o
    // and Foo. In the next iteration, it's looked up from Bar.

    if (i == 9) {
      DoMonomorphicStoreToPrototype(Bar.prototype, bar_func, false);
    }
  }

  10;
  foo_func_called;
  1;
  bar_func_called;
}

TestAddingPropertyToDictionaryPrototype_Monomorphic();

function TestAddingKeyedPropertyToDictionaryPrototype_Monomorphic() {
  function DoMonomorphicKeyedStoreToPrototype(p, name, f, do_delete = true) {
    p[name] = f;

    if (do_delete) {
      delete p[name];
    }
  }

  let foo_func_called = 0;
  let bar_func_called = 0;
  let name = "func";

  function Foo() {
    ;
  }

  Foo.prototype[name] = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureDictionaryMode(Bar.prototype);

  function bar_func() {
    ++bar_func_called;
  }

  DoMonomorphicKeyedStoreToPrototype(Bar.prototype, name, bar_func);
  DoMonomorphicKeyedStoreToPrototype(Bar.prototype, name, bar_func);
  DoMonomorphicKeyedStoreToPrototype(Bar.prototype, name, bar_func);
  let o = new Bar();

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Foo.
    o.func(); // Add the property to Bar which is a dictionary-mode prototype between o
    // and Foo. In the next iteration, it's looked up from Bar.

    if (i == 9) {
      DoMonomorphicKeyedStoreToPrototype(Bar.prototype, name, bar_func, false);
    }
  }

  10;
  foo_func_called;
  1;
  bar_func_called;
}

TestAddingKeyedPropertyToDictionaryPrototype_Monomorphic(); // Like TestAddingPropertyToDictionaryPrototype, except that the prototype isn't
// in dictionary mode yet, but turns to dictionary mode after the interesting
// property is added.

function TestAddingPropertyToAlmostDictionaryPrototype() {
  let foo_func_called = 0;
  let bar_func_called = 0;

  function Foo() {
    ;
  }

  Foo.prototype.func = function () {
    ++foo_func_called;
  };

  function Bar() {
    ;
  }

  Bar.prototype = Object.create(Foo.prototype);
  EnsureAlmostDictionaryMode(Bar.prototype);
  let o = new Bar();

  for (let i = 0; i < 2; ++i) {
    o.x0;
  }

  for (let i = 0; i < 11; ++i) {
    // First, the property is looked up from Foo.
    o.func(); // Add the property to Bar which will now turn permanently into dictionary
    // mode. In the next iteration, it's looked up from Bar.

    if (i == 9) {
      Bar.prototype.func = function () {
        ++bar_func_called;
      };
    }
  }

  10;
  foo_func_called;
  1;
  bar_func_called;
}

TestAddingPropertyToAlmostDictionaryPrototype();

function TestReconfiguringDataToAccessor() {
  let setter_called = 0;

  function Bar() {
    ;
  }

  EnsureDictionaryMode(Bar.prototype);
  let name = "prop";
  Object.defineProperty(Bar.prototype, name, {
    value: 1000,
    writable: true,
    configurable: true
  });

  for (let i = 0; i < 11; ++i) {
    let obj1 = new Bar();

    if (i < 10) {
      1000;
      obj1.prop;
    } else {
      3000;
      obj1.prop;
    } // Add the property into the object.


    obj1.prop = 2000;

    if (i < 10) {
      2000;
      obj1.prop;
    } else {
      3000;
      obj1.prop;
    } // Make "prop" an accessor property in the prototype.


    if (i == 9) {
      Object.defineProperty(Bar.prototype, name, {
        get: () => 3000,
        set: function (val) {
          ++setter_called;
        }
      });
    }
  }

  1;
  setter_called;
}

TestReconfiguringDataToAccessor();