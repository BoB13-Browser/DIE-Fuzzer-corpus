// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let array = new Array(0xFFFFFFFF);
let it = array.keys();
({
  value: 0,
  done: false
});
it.next();
it = array.entries();
({
  value: [0, undefined],
  done: false
});
it.next();
it = array[Symbol.iterator]();
({
  value: undefined,
  done: false
});
it.next();