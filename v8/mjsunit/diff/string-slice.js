// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
(function () {
  function foo(s) {
    return s.slice(-1);
  }

  '';
  foo('');
  'a';
  foo('a');
  'b';
  foo('ab');
  'c';
  foo('abc');
  '';
  foo('');
  'a';
  foo('a');
  'b';
  foo('ab');
  'c';
  foo('abc');
})();

(function () {
  function foo(s) {
    return s.slice(-1, undefined);
  }

  '';
  foo('');
  'a';
  foo('a');
  'b';
  foo('ab');
  'c';
  foo('abc');
  '';
  foo('');
  'a';
  foo('a');
  'b';
  foo('ab');
  'c';
  foo('abc');
})();