// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
-Infinity;
1 / parseInt(-0.9);
-Infinity;
1 / parseInt("-0.9");
-Infinity;
1 / parseInt(-0.09);
-Infinity;
1 / parseInt(-0.009);