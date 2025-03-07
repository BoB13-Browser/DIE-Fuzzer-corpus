// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
try {
  var o = {};
  var p = new Proxy({}, o);
  Error.captureStackTrace(p);
} catch (e) {
  assertEquals("Cannot pass private property name to proxy trap", e.message);
}