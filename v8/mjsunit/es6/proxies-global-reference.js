// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var failing_proxy = new Proxy({}, new Proxy({}, {
  get() {
    throw "No trap should fire";
  }

}));
Object.setPrototypeOf(Object.prototype, failing_proxy);
assertThrows(() => a, TypeError);
Object.setPrototypeOf(this, failing_proxy);
assertThrows(() => a, TypeError);