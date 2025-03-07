// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --expose-gc --turbo-inline-array-builtins
// Flags: --opt --no-always-opt
// Unknown field access leads to soft-deopt unrelated to filter, should still
// lead to correct result.
(function () {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var result = 0;

  var eagerDeoptInCalled = function (deopt) {
    var callback = function (v, i, o) {
      if (i == 13 && deopt) {
        a.abc = 25;
      } // Ensure that the output array is smaller by shaving off the first
      // item.


      if (i === 0) {
        return false;
      }

      result += v;
      return true;
    };

    return a.filter(callback);
  };

  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled();
  var deopt_result = eagerDeoptInCalled(true);
  a.slice(1);
  deopt_result;
  eagerDeoptInCalled();
  1620;
  result;
})(); // Length change detected during loop, must cause properly handled eager deopt.


(function () {
  var eagerDeoptInCalled = function (deopt) {
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var callback = function (v, i, o) {
      a.length = i == 5 && deopt ? 8 : 10;
      return i == 0 ? false : true;
    };

    return a.filter(callback);
  };

  var like_a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  like_a.slice(1);
  eagerDeoptInCalled();
  eagerDeoptInCalled();
  like_a.slice(1);
  eagerDeoptInCalled();
  like_a.slice(1).slice(0, 7);
  eagerDeoptInCalled(true);
  eagerDeoptInCalled();
})(); // Lazy deopt from a callback that changes the input array. Ensure that
// the value stored in the output array is from the original read.


(function () {
  var a = [1, 2, 3, 4, 5];

  var lazyChanger = function (deopt) {
    var callback = function (v, i, o) {
      if (i === 2 && deopt) {
        a[2] = 100;
      }

      return true;
    };

    return a.filter(callback);
  };

  a;
  lazyChanger();
  lazyChanger();
  var deopt_result = lazyChanger(true);
  [1, 2, 3, 4, 5];
  deopt_result;
  [1, 2, 100, 4, 5];
  lazyChanger();
})(); // Lazy deopt from a callback that returns false at the deopt point.
// Ensure the non-selection is respected in the output array.


(function () {
  var a = [1, 2, 3, 4, 5];

  var lazyDeselection = function (deopt) {
    var callback = function (v, i, o) {
      if (i === 2 && deopt) {
        return false;
      }

      return true;
    };

    return a.filter(callback);
  };

  a;
  lazyDeselection();
  lazyDeselection();
  var deopt_result = lazyDeselection(true);
  [1, 2, 4, 5];
  deopt_result;
  [1, 2, 3, 4, 5];
  lazyDeselection();
})(); // Escape analyzed array


(function () {
  var result = 0;

  var eagerDeoptInCalled = function (deopt) {
    var a_noescape = [0, 1, 2, 3, 4, 5];

    var callback = function (v, i, o) {
      result += v;

      if (i == 13 && deopt) {
        a_noescape.length = 25;
      }

      return true;
    };

    a_noescape.filter(callback);
  };

  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled(true);
  eagerDeoptInCalled();
  75;
  result;
})(); // Escape analyzed array where callback function isn't inlined, forcing a lazy
// deopt with GC that relies on the stashed-away return result fro the lazy
// deopt being properly stored in a place on the stack that gets GC'ed.


(function () {
  var result = 0;

  var lazyDeopt = function (deopt) {
    var b = [1, 2, 3];

    var callback = function (v, i, o) {
      result += i;

      if (i == 1 && deopt) {
        ;
      }

      gc();
      gc();
      return true;
    };

    b.filter(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt(true);
  lazyDeopt();
})(); // Lazy deopt from runtime call from inlined callback function.


(function () {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 13 && deopt) {
        ;
      }

      return true;
    };

    a.filter(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt(true);
  lazyDeopt();
  1500;
  result;
})(); // Lazy deopt from runtime call from non-inline callback function.


(function () {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 13 && deopt) {
        ;
      }

      return true;
    };

    a.filter(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt(true);
  lazyDeopt();
  1500;
  result;
})();

(function () {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 13 && deopt) {
        gc();
        gc();
        gc();
      }

      return true;
    };

    a.filter(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt(true);
  lazyDeopt();
  1500;
  result;
})(); // Call to a.filter is done inside a try-catch block and the callback function
// being called actually throws.


(function () {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var caught = false;
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 1 && deopt) {
        throw "a";
      }

      return true;
    };

    try {
      a.filter(callback);
    } catch (e) {
      caught = true;
    }
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();

  (() => lazyDeopt(true))();

  caught;
  lazyDeopt();
})(); // Call to a.filter is done inside a try-catch block and the callback function
// being called actually throws, but the callback is not inlined.


(function () {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var caught = false;
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 1 && deopt) {
        throw "a";
      }

      return true;
    };

    try {
      a.filter(callback);
    } catch (e) {
      caught = true;
    }
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();

  (() => lazyDeopt(true))();

  caught;
  lazyDeopt();
})(); // Call to a.filter is done inside a try-catch block and the callback function
// being called throws into a deoptimized caller function.


(function TestThrowIntoDeoptimizedOuter() {
  var a = [1, 2, 3, 4];

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      if (i == 1 && deopt) {
        throw "some exception";
      }

      return true;
    };

    var result = 0;

    try {
      result = a.filter(callback);
    } catch (e) {
      "some exception";
      e;
      result = "nope";
    }

    return result;
  };

  [1, 2, 3, 4];
  lazyDeopt(false);
  [1, 2, 3, 4];
  lazyDeopt(false);
  "nope";
  lazyDeopt(true);
  "nope";
  lazyDeopt(true);
  [1, 2, 3, 4];
  lazyDeopt(false);
  "nope";
  lazyDeopt(true);
})(); // An error generated inside the callback includes filter in it's
// stack trace.


(function () {
  var re = /Array\.filter/;

  var lazyDeopt = function (deopt) {
    var b = [1, 2, 3];
    var result = 0;

    var callback = function (v, i, o) {
      result += v;

      if (i == 1) {
        var e = new Error();
        re.exec(e.stack) !== null;
      }

      return true;
    };

    var o = [1, 2, 3];
    b.filter(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})(); // An error generated inside a non-inlined callback function also
// includes filter in it's stack trace.


(function () {
  var re = /Array\.filter/;

  var lazyDeopt = function (deopt) {
    var b = [1, 2, 3];
    var result = 0;

    var callback = function (v, i, o) {
      result += v;

      if (i == 1) {
        var e = new Error();
        re.exec(e.stack) !== null;
      }

      return true;
    };

    var o = [1, 2, 3];
    b.filter(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})(); // An error generated inside a recently deoptimized callback function
// includes filter in it's stack trace.


(function () {
  var re = /Array\.filter/;

  var lazyDeopt = function (deopt) {
    var b = [1, 2, 3];
    var result = 0;

    var callback = function (v, i, o) {
      result += v;

      if (i == 1) {
        ;
      } else {
        if (i == 2) {
          var e = new Error();
          re.exec(e.stack) !== null;
        }
      }

      return true;
    };

    var o = [1, 2, 3];
    b.filter(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})(); // Verify that various exception edges are handled appropriately.
// The thrown Error object should always indicate it was created from
// a filter call stack.


(function () {
  var re = /Array\.filter/;
  var a = [1, 2, 3];
  var result = 0;

  var lazyDeopt = function () {
    var callback = function (v, i, o) {
      result += i;

      if (i == 1) {
        throw new Error();
      }

      return true;
    };

    a.filter(callback);
  };

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
})(); // Verify holes are skipped.


(() => {
  const a = [1, 2,, 3, 4];
  let callback_values = [];

  function withHoles() {
    callback_values = [];
    return a.filter(v => {
      callback_values.push(v);
      return true;
    });
  }

  withHoles();
  withHoles();
  [1, 2, 3, 4];
  withHoles();
  [1, 2, 3, 4];
  callback_values;
})();

(() => {
  const a = [1.5, 2.5,, 3.5, 4.5];
  let callback_values = [];

  function withHoles() {
    callback_values = [];
    return a.filter(v => {
      callback_values.push(v);
      return true;
    });
  }

  withHoles();
  withHoles();
  [1.5, 2.5, 3.5, 4.5];
  withHoles();
  [1.5, 2.5, 3.5, 4.5];
  callback_values;
})(); // Ensure that we handle side-effects between load and call.


(() => {
  function side_effect(a, b) {
    if (b) {
      a.foo = 3;
    }

    return a;
  }

  function unreliable(a, b) {
    return a.filter(x => x % 2 === 0, side_effect(a, b));
  }

  let a = [1, 2, 3];
  unreliable(a, false);
  unreliable(a, false);
  unreliable(a, false); // Now actually do change the map.

  unreliable(a, true);
})(); // Messing with the Array species constructor causes deoptimization.


(function () {
  var result = 0;
  var a = [1, 2, 3];

  var species_breakage = function () {
    var callback = function (v, i, o) {
      result += v;
      return true;
    };

    a.filter(callback);
  };

  species_breakage();
  species_breakage();
  species_breakage();
  a.constructor = {};

  a.constructor[Symbol.species] = function () {
    ;
  };

  species_breakage();
  species_breakage;
  24;
  result;
})();