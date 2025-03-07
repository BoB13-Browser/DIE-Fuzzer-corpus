// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --expose-debug-as debug
// Test debug events when we only listen to uncaught exceptions and
// the Promise is rejected within a try-catch in the Promise constructor.
// We expect an Exception debug event with a promise to be triggered.
Debug = debug.Debug;
var step = 0;
var exception = null;

function listener(event, exec_state, event_data, data) {
  try {
    if (event == Debug.DebugEvent.Exception) {
      assertEquals(0, step);
      assertEquals("uncaught", event_data.exception().message);
      assertTrue(event_data.promise() instanceof Promise);
      assertTrue(event_data.uncaught()); // Assert that the debug event is triggered at the throw site.

      assertTrue(exec_state.frame(0).sourceLineText().indexOf("// event") > 0);
      step++;
    }
  } catch (e) {
    exception = e;
  }
}

Debug.setBreakOnUncaughtException();
Debug.setListener(listener);
var p = new Promise(function (resolve, reject) {
  try {
    // This try-catch must not prevent this uncaught reject event.
    reject(new Error("uncaught")); // event
  } catch (e) {}
});
assertEquals(1, step);
assertNull(exception);