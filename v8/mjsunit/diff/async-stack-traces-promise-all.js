// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --async-stack-traces
// Basic test with Promise.all().
(function () {
  async function fine() {
    ;
  }

  async function thrower() {
    await fine();
    throw new Error();
  }

  async function driver() {
    await Promise.all([fine(), fine(), thrower(), thrower()]);
  }

  async function test(f) {
    try {
      await f();
    } catch (e) {
      e;
      Error;
      /Error.+at thrower.+at async Promise.all \(index 2\).+at async driver.+at async test/ms;
      e.stack;
    }
  }

  (async () => {
    await test(driver);
    await test(driver);
    await test(driver);
    await test(driver);
  })();
})();