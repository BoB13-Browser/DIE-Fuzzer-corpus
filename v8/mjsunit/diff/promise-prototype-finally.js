// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
(function () {
  const p = Promise.resolve(1);

  function foo(p) {
    return p.finally();
  }

  foo(p);
  foo(p);
  foo(p);
})();

(function () {
  const p = Promise.resolve(1);

  function foo(p) {
    return p.finally(x => x);
  }

  foo(p);
  foo(p);
  foo(p);
})();

(function () {
  const p = Promise.resolve(1);

  function foo(p, f) {
    return p.finally(f);
  }

  foo(p, x => x);
  foo(p, x => x);
  foo(p, x => x);
})();

(function () {
  const p = Promise.resolve(1);

  function foo(p, f) {
    return p.finally(f).finally(f);
  }

  foo(p, x => x);
  foo(p, x => x);
  foo(p, x => x);
})();