// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
(function () {
  function foo(p) {
    return p.catch();
  }

  foo(Promise.resolve(1));
  foo(Promise.resolve(1));
  foo(Promise.resolve(1));
})();

(function () {
  function foo(p) {
    return p.catch(foo);
  }

  foo(Promise.resolve(1));
  foo(Promise.resolve(1));
  foo(Promise.resolve(1));
})();

(function () {
  function foo(p) {
    return p.catch(foo, undefined);
  }

  foo(Promise.resolve(1));
  foo(Promise.resolve(1));
  foo(Promise.resolve(1));
})();