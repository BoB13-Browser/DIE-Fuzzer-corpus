// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --turbo-inline-array-builtins --opt
// Flags: --no-always-opt
// Unknown field access leads to soft-deopt unrelated to findIndex, should still
// lead to correct result.
(() => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  let result = 0;

  function eagerDeoptInCalled(deopt) {
    return a.findIndex((v, i) => {
      if (i === 13 && deopt) {
        a.abc = 25;
      }

      result += v;
      return v === 20;
    });
  }

  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled();
  19;
  eagerDeoptInCalled(true);
  eagerDeoptInCalled();
  1050;
  result;
})(); // Length change detected during loop, must cause properly handled eager deopt.


(() => {
  let called_values;

  function eagerDeoptInCalled(deopt) {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    called_values = [];
    return a.findIndex((v, i) => {
      called_values.push(v);
      a.length = i === 5 && deopt ? 8 : 10;
      return v === 9;
    });
  }

  8;
  eagerDeoptInCalled();
  [1, 2, 3, 4, 5, 6, 7, 8, 9];
  called_values;
  eagerDeoptInCalled();
  8;
  eagerDeoptInCalled();
  -1;
  eagerDeoptInCalled(true);
  [1, 2, 3, 4, 5, 6, 7, 8, undefined, undefined];
  called_values;
  eagerDeoptInCalled();
})(); // Lazy deopt from a callback that changes the input array. Deopt in a callback
// execution that returns true.


(() => {
  const a = [1, 2, 3, 4, 5];

  function lazyChanger(deopt) {
    return a.findIndex((v, i) => {
      if (i === 3 && deopt) {
        a[3] = 3;
      }

      return v > 3;
    });
  }

  3;
  lazyChanger();
  lazyChanger();
  3;
  lazyChanger(true);
  4;
  lazyChanger();
})(); // Lazy deopt from a callback that will always return false and no element is
// found. Verifies the lazy-after-callback continuation builtin.


(() => {
  const a = [1, 2, 3, 4, 5];

  function lazyChanger(deopt) {
    return a.findIndex((v, i) => {
      if (i === 3 && deopt) {
        ;
      }

      return false;
    });
  }

  -1;
  lazyChanger();
  lazyChanger();
  -1;
  lazyChanger(true);
  -1;
  lazyChanger();
})(); // Lazy deopt from a callback that changes the input array. Deopt in a callback
// execution that returns false.


(() => {
  const a = [1, 2, 3, 4, 5];

  function lazyChanger(deopt) {
    return a.findIndex((v, i) => {
      if (i === 2 && deopt) {
        a[3] = 2;
      }

      return v > 3;
    });
  }

  3;
  lazyChanger();
  lazyChanger();
  4;
  lazyChanger(true);
  4;
  lazyChanger();
})(); // Escape analyzed array


(() => {
  let result = 0;

  function eagerDeoptInCalled(deopt) {
    const a_noescape = [0, 1, 2, 3, 4, 5];
    a_noescape.findIndex((v, i) => {
      result += v | 0;

      if (i === 13 && deopt) {
        a_noescape.length = 25;
      }

      return false;
    });
  }

  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled(true);
  eagerDeoptInCalled();
  75;
  result;
})(); // Lazy deopt from runtime call from inlined callback function.


(() => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  let result = 0;

  function lazyDeopt(deopt) {
    a.findIndex((v, i) => {
      result += i;

      if (i === 13 && deopt) {
        ;
      }

      return false;
    });
  }

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt(true);
  lazyDeopt();
  1500;
  result;
})(); // Lazy deopt from runtime call from non-inline callback function.


(() => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  let result = 0;

  function lazyDeopt(deopt) {
    function callback(v, i) {
      result += i;

      if (i === 13 && deopt) {
        ;
      }

      return false;
    }

    a.findIndex(callback);
  }

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt(true);
  lazyDeopt();
  1500;
  result;
})(); // Call to a.findIndex is done inside a try-catch block and the callback function
// being called actually throws.


(() => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  let caught = false;

  function lazyDeopt(deopt) {
    try {
      a.findIndex((v, i) => {
        if (i === 1 && deopt) {
          throw "a";
        }

        return false;
      });
    } catch (e) {
      caught = true;
    }
  }

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();

  (() => lazyDeopt(true))();

  caught;
  lazyDeopt();
})(); // Call to a.findIndex is done inside a try-catch block and the callback function
// being called actually throws, but the callback is not inlined.


(() => {
  let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let caught = false;

  function lazyDeopt(deopt) {
    function callback(v, i) {
      if (i === 1 && deopt) {
        throw "a";
      }

      return false;
    }

    try {
      a.findIndex(callback);
    } catch (e) {
      caught = true;
    }
  }

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();

  (() => lazyDeopt(true))();

  caught;
  lazyDeopt();
})(); // Call to a.findIndex is done inside a try-catch block and the callback function
// being called throws into a deoptimized caller function.


(function TestThrowIntoDeoptimizedOuter() {
  const a = [1, 2, 3, 4];

  function lazyDeopt(deopt) {
    function callback(v, i) {
      if (i === 1 && deopt) {
        throw "some exception";
      }

      return v === 3;
    }

    let result = 0;

    try {
      result = a.findIndex(callback);
    } catch (e) {
      "some exception";
      e;
      result = "nope";
    }

    return result;
  }

  2;
  lazyDeopt(false);
  2;
  lazyDeopt(false);
  "nope";
  lazyDeopt(true);
  "nope";
  lazyDeopt(true);
  2;
  lazyDeopt(false);
  "nope";
  lazyDeopt(true);
})(); // An error generated inside the callback includes findIndex in it's
// stack trace.


(() => {
  const re = /Array\.findIndex/;

  function lazyDeopt(deopt) {
    const b = [1, 2, 3];
    let result = 0;
    b.findIndex((v, i) => {
      result += v;

      if (i === 1) {
        const e = new Error();
        re.exec(e.stack) !== null;
      }

      return false;
    });
  }

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})(); // An error generated inside a non-inlined callback function also
// includes findIndex in it's stack trace.


(() => {
  const re = /Array\.findIndex/;

  function lazyDeopt(deopt) {
    const b = [1, 2, 3];
    let did_assert_error = false;
    let result = 0;

    function callback(v, i) {
      result += v;

      if (i === 1) {
        const e = new Error();
        re.exec(e.stack) !== null;
        did_assert_error = true;
      }

      return false;
    }

    b.findIndex(callback);
    return did_assert_error;
  }

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})(); // An error generated inside a recently deoptimized callback function
// includes findIndex in it's stack trace.


(() => {
  const re = /Array\.findIndex/;

  function lazyDeopt(deopt) {
    const b = [1, 2, 3];
    let did_assert_error = false;
    let result = 0;
    b.findIndex((v, i) => {
      result += v;

      if (i === 1) {
        ;
      } else {
        if (i === 2) {
          const e = new Error();
          re.exec(e.stack) !== null;
          did_assert_error = true;
        }
      }

      return false;
    });
    return did_assert_error;
  }

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})(); // Verify that various exception edges are handled appropriately.
// The thrown Error object should always indicate it was created from
// a findIndex call stack.


(() => {
  const re = /Array\.findIndex/;
  const a = [1, 2, 3];
  let result = 0;

  function lazyDeopt() {
    a.findIndex((v, i) => {
      result += i;

      if (i === 1) {
        throw new Error();
      }

      return false;
    });
  }

  (() => lazyDeopt())();

  (() => lazyDeopt())();

  try {
    lazyDeopt();
  } catch (e) {
    re.exec(e.stack) !== null;
  }

  try {
    lazyDeopt();
  } catch (e) {
    re.exec(e.stack) !== null;
  }
})(); // Messing with the Array prototype causes deoptimization.


(() => {
  const a = [1, 2, 3];
  let result = 0;

  function prototypeChanged() {
    a.findIndex((v, i) => {
      result += v;
      return false;
    });
  }

  prototypeChanged();
  prototypeChanged();
  prototypeChanged();
  a.constructor = {};
  prototypeChanged();
  prototypeChanged();
  24;
  result;
})(); // Verify holes are replaced with undefined.


(() => {
  const a = [1, 2,, 3, 4];

  function withHoles() {
    const callback_values = [];
    a.findIndex(v => {
      callback_values.push(v);
      return false;
    });
    return callback_values;
  }

  withHoles();
  withHoles();
  [1, 2, undefined, 3, 4];
  withHoles();
})();

(() => {
  const a = [1.5, 2.5,, 3.5, 4.5];

  function withHoles() {
    const callback_values = [];
    a.findIndex(v => {
      callback_values.push(v);
      return false;
    });
    return callback_values;
  }

  withHoles();
  withHoles();
  [1.5, 2.5, undefined, 3.5, 4.5];
  withHoles();
})(); // Ensure that we handle side-effects between load and call.


(() => {
  function side_effect(a, b) {
    if (b) {
      a.foo = 3;
    }

    return a;
  }

  function unreliable(a, b) {
    return a.findIndex(x => false, side_effect(a, b));
  }

  let a = [1, 2, 3];
  unreliable(a, false);
  unreliable(a, false);
  unreliable(a, false); // Now actually do change the map.

  unreliable(a, true);
})(); // Handle callback is not callable.


(() => {
  const a = [1, 2, 3, 4, 5];

  function notCallable() {
    return a.findIndex(undefined);
  }

  notCallable();
  TypeError;

  try {
    notCallable();
  } catch (e) {
    ;
  }

  notCallable();
  TypeError;
})();