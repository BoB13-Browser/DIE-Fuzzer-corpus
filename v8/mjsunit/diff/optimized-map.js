// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --expose-gc --turbo-inline-array-builtins
// Flags: --opt --no-always-opt
var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 0, 0];
var b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var c = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]; // Unknown field access leads to soft-deopt unrelated to map, should still
// lead to correct result.

(function () {
  var result = 0;

  var eagerDeoptInCalled = function (deopt) {
    var callback = function (v, i, o) {
      result += v;

      if (i == 13 && deopt) {
        a.abc = 25;
      }

      return v;
    };

    a.map(callback);
  };

  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled(true);
  eagerDeoptInCalled();
  1500;
  result;
})(); // Length change detected during loop, must cause properly handled eager deopt.


(function () {
  var result = 0;

  var eagerDeoptInCalled = function (deopt) {
    var callback = function (v, i, o) {
      result += v;
      a.length = i == 13 && deopt ? 25 : 27;
      return v;
    };

    a.map(callback);
  };

  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled();
  eagerDeoptInCalled(true);
  eagerDeoptInCalled();
  1500;
  result;
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

      return v;
    };

    a_noescape.map(callback);
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
      return v;
    };

    b.map(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt(true);
  lazyDeopt();
})(); // Escape analyzed array where callback function isn't inlined, forcing a lazy
// deopt. Check that the result of the callback function is passed correctly
// to the lazy deopt and that the final result of map is as expected.


(function () {
  var lazyDeopt = function (deopt) {
    var b = [1, 2, 3];

    var callback = function (v, i, o) {
      if (i == 1 && deopt) {
        ;
      }

      return 2 * v;
    };

    return b.map(callback);
  };

  [2, 4, 6];
  lazyDeopt();
  [2, 4, 6];
  lazyDeopt();
  [2, 4, 6];
  lazyDeopt(true);
})(); // Lazy deopt from runtime call from inlined callback function.


(function () {
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 13 && deopt) {
        ;
      }

      return v;
    };

    b.map(callback);
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
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 13 && deopt) {
        ;
      }

      return v;
    };

    b.map(callback);
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
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 13 && deopt) {
        gc();
        gc();
        gc();
      }

      return v;
    };

    c.map(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt(true);
  lazyDeopt();
  1500;
  result;
})(); // Call to a.map is done inside a try-catch block and the callback function
// being called actually throws.


(function () {
  var caught = false;
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 1 && deopt) {
        throw "a";
      }

      return v;
    };

    try {
      c.map(callback);
    } catch (e) {
      caught = true;
    }
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt.bind(this, true);
  caught;
  lazyDeopt();
})(); // Call to a.map is done inside a try-catch block and the callback function
// being called actually throws, but the callback is not inlined.


(function () {
  var caught = false;
  var result = 0;

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      result += i;

      if (i == 1 && deopt) {
        throw "a";
      }

      return v;
    };

    try {
      c.map(callback);
    } catch (e) {
      caught = true;
    }
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
  lazyDeopt.bind(this, true);
  caught;
  lazyDeopt();
})(); // Call to a.map is done inside a try-catch block and the callback function
// being called throws into a deoptimized caller function.


(function TestThrowIntoDeoptimizedOuter() {
  var a = [1, 2, 3, 4];

  var lazyDeopt = function (deopt) {
    var callback = function (v, i, o) {
      if (i == 1 && deopt) {
        throw "some exception";
      }

      return 2 * v;
    };

    var result = 0;

    try {
      result = a.map(callback);
    } catch (e) {
      "some exception";
      e;
      result = "nope";
    }

    return result;
  };

  [2, 4, 6, 8];
  lazyDeopt(false);
  [2, 4, 6, 8];
  lazyDeopt(false);
  "nope";
  lazyDeopt(true);
  "nope";
  lazyDeopt(true);
  [2, 4, 6, 8];
  lazyDeopt(false);
  "nope";
  lazyDeopt(true);
})();

(function () {
  var re = /Array\.map/;

  var lazyDeopt = function (deopt) {
    var b = [1, 2, 3];
    var result = 0;

    var callback = function (v, i, o) {
      result += v;

      if (i == 1) {
        var e = new Error();
        re.exec(e.stack) !== null;
      }

      return v;
    };

    var o = [1, 2, 3];
    b.map(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})();

(function () {
  var re = /Array\.map/;

  var lazyDeopt = function (deopt) {
    var b = [1, 2, 3];
    var result = 0;

    var callback = function (v, i, o) {
      result += v;

      if (i == 1) {
        var e = new Error();
        re.exec(e.stack) !== null;
      }

      return v;
    };

    var o = [1, 2, 3];
    b.map(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})();

(function () {
  var re = /Array\.map/;

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

      return v;
    };

    var o = [1, 2, 3];
    b.map(callback);
  };

  lazyDeopt();
  lazyDeopt();
  lazyDeopt();
})();

(function () {
  var re = /Array\.map/;
  var a = [1, 2, 3];
  var result = 0;

  var lazyDeopt = function () {
    var callback = function (v, i, o) {
      result += i;

      if (i == 1) {
        throw new Error();
      }

      return v;
    };

    a.map(callback);
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
})(); // Verify that we remain in optimized code despite transitions in the output
// array.


(function () {
  var result = 0;

  var to_double = function () {
    var callback = function (v, i, o) {
      result += v;

      if (i < 5) {
        // First transition the output array to PACKED_DOUBLE_ELEMENTS.
        return v + 0.5;
      } else {
        // Then return smi values and make sure they can live in the double
        // array.
        return v;
      }
    };

    return c.map(callback);
  };

  to_double();
  to_double();
  var output = to_double();
  1.5;
  output[0];
  6;
  output[5];
  975;
  result;
  to_double;
})();

(function () {
  var result = 0;

  var to_fast = function () {
    var callback = function (v, i, o) {
      result += v;

      if (i < 5) {
        // First transition the output array to PACKED_DOUBLE_ELEMENTS.
        return v + 0.5;
      } else {
        if (i < 10) {
          // Then return smi values and make sure they can live in the double
          // array.
          return v;
        } else {
          // Later, to PACKED_ELEMENTS.
          return v + 'hello';
        }
      }
    };

    return c.map(callback);
  };

  to_fast();
  to_fast();
  var output = to_fast();
  975;
  result;
  "11hello";
  output[10];
  to_fast;
})(); // TurboFan specializes on number results, ensure the code path is
// tested.


(function () {
  var a = [1, 2, 3];

  function double_results() {
    // TurboFan recognizes the result is a double.
    var callback = v => v + 0.5;

    return a.map(callback);
  }

  double_results();
  double_results();
  double_results();
  1.5;
  double_results()[0];
})(); // TurboFan specializes on non-number results, ensure the code path is
// tested.


(function () {
  var a = [1, 2, 3];

  function string_results() {
    // TurboFan recognizes the result is a string.
    var callback = v => "hello" + v.toString();

    return a.map(callback);
  }

  string_results();
  string_results();
  string_results();
  "hello1";
  string_results()[0];
})(); // Verify holes are not visited.


(() => {
  const a = [1, 2,, 3, 4];
  let callback_values = [];

  function withHoles() {
    callback_values = [];
    return a.map(v => {
      callback_values.push(v);
      return v;
    });
  }

  withHoles();
  withHoles();
  [1, 2,, 3, 4];
  withHoles();
  [1, 2, 3, 4];
  callback_values;
})();

(() => {
  const a = [1.5, 2.5,, 3.5, 4.5];
  let callback_values = [];

  function withHoles() {
    callback_values = [];
    return a.map(v => {
      callback_values.push(v);
      return v;
    });
  }

  withHoles();
  withHoles();
  [1.5, 2.5,, 3.5, 4.5];
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
    return a.map(x => x * 2, side_effect(a, b));
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
      return v;
    };

    a.map(callback);
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
})(); /////////////////////////////////////////////////////////////////////////
//
// Any tests added below species_breakage won't test optimized map calls
// because the array species constructor change disables inlining of
// Array.prototype.map across the isolate.
//
/////////////////////////////////////////////////////////////////////////