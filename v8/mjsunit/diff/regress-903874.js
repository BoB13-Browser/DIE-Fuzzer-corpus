// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var code = "function f(" + "{o(".repeat(10000);
code;
SyntaxError;