// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
if (this.Intl) {
  Intl.NumberFormat.call(new Proxy({}, {}));
  Intl.NumberFormat;

  (() => Intl.DateTimeFormat.prototype.formatToParts.call(new Proxy({}, {})))();

  TypeError;
}