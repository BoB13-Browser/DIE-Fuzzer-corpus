// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
for (var i = 0; i < 50000; i++) {
  ("Foo"[0] + "barbarbarbarbarbar")[0];
}