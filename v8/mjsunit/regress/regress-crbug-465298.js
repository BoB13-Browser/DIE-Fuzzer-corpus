// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --noturbo-osr --noturbo-inlining --expose-debug-as debug
var stdlib = this;
var buffer = new ArrayBuffer(64 * 1024);
var foreign = {
  thrower: thrower,
  debugme: debugme // Get the Debug object exposed from the debug context global object.

};
Debug = debug.Debug;
var listenerCalled = false;

function listener(event, exec_state, event_data, data) {
  try {
    if (event == Debug.DebugEvent.Break) {
      var frame = exec_state.frame(1);
      assertEquals(m.foo, frame.func().value());
      listenerCalled = true;
    }
  } catch (e) {
    print("Caught: " + e + " " + e.stack);
  }

  ;
}

function thrower() {
  throw "boom";
}

function debugme() {
  Debug.setListener(listener);
  debugger;
}

function Module(stdlib, foreign, heap) {
  "use asm";

  var thrower = foreign.thrower;
  var debugme = foreign.debugme;

  function foo(i) {
    i = i | 0;
    var a = 101; // Local variables exist ...

    var b = 102; // ... to make the debugger ...

    var c = 103; // ... inspect them during break.

    if (i > 0) {
      debugme();
      i = 23;
    } else {
      thrower();
      i = 42;
    }

    return i | 0;
  }

  return {
    foo: foo
  };
}

var m = Module(stdlib, foreign, buffer);
assertThrows("m.foo(0)");
assertEquals(23, m.foo(1));
assertTrue(listenerCalled);