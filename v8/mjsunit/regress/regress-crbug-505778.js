// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
if (this.Worker) {
  var __v_7 = new Worker('onmessage = function() {}');

  __v_7.postMessage("");
}