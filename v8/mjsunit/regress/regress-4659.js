// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// Flags: --harmony-function-name
var obj = {
  get longerName() {
    return 42;
  }

};
assertEquals(42, obj.longerName);