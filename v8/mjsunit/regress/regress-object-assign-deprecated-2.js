// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var x = {
  a: 1,
  b: 2
};
Object.defineProperty(x, "c", {
  set(v) {}

});
var y = {
  get c() {
    return {
      a: 1,
      b: 2.5
    };
  }

};
Object.assign(x, y, x);