// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --harmony-namespace-exports
var ns;
import('modules-skip-13.js').then(x => ns = x);
42;
ns.default;
ns;
ns.self;