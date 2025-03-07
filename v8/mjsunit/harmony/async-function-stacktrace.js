// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --harmony-async-await
async function test(func, funcs) {
  try {
    await func();
    throw new Error("Expected " + func.toString() + " to throw");
  } catch (e) {
    var stack = e.stack.split('\n').slice(1).map(line => line.trim()).map(line => line.match(/at (?:(.*) )?.*$/)[1]).filter(x => typeof x === 'string' && x.length);
    assertEquals(funcs, stack, `Unexpected stack trace ${e.stack}`);
  }
}

function thrower() {
  throw new Error("NOPE");
}

function reject() {
  return Promise.reject(new Error("NOPE"));
}

async function runTests() {
  await test(async function a() {
    throw new Error("FAIL");
  }, ["a", "test", "runTests"]);
  await test(async function a2() {
    await 1;
    throw new Error("FAIL");
  }, ["a2"]);
  await test(async function a3() {
    await 1;

    try {
      await thrower();
    } catch (e) {
      throw new Error("FAIL");
    }
  }, ["a3"]);
  await test(async function a4() {
    await 1;

    try {
      await reject();
    } catch (e) {
      throw new Error("FAIL");
    }
  }, ["a4"]);
  await test({
    async b() {
      throw new Error("FAIL");
    }

  }.b, ["b", "test", "runTests"]);
  await test({
    async b2() {
      await 1;
      throw new Error("FAIL");
    }

  }.b2, ["b2"]);
  await test({
    async b3() {
      await 1;

      try {
        await thrower();
      } catch (e) {
        throw new Error("FAIL");
      }
    }

  }.b3, ["b3"]);
  await test({
    async b4() {
      await 1;

      try {
        await reject();
      } catch (e) {
        throw new Error("FAIL");
      }
    }

  }.b4, ["b4"]);
  await test(new class {
    async c() {
      throw new Error("FAIL");
    }

  }().c, ["c", "test", "runTests"]);
  await test(new class {
    async c2() {
      await 1;
      throw new Error("FAIL");
    }

  }().c2, ["c2"]);
  await test(new class {
    async c3() {
      await 1;

      try {
        await thrower();
      } catch (e) {
        throw new Error("FAIL");
      }
    }

  }().c3, ["c3"]);
  await test(new class {
    async c4() {
      await 1;

      try {
        await reject();
      } catch (e) {
        throw new Error("FAIL");
      }
    }

  }().c4, ["c4"]); // TODO(caitp): `async` probably shouldn't be the inferred name for async
  // arrow functions...

  await test(async () => {
    throw new Error("FAIL");
  }, ["async", "test", "runTests"]);
  await test(async () => {
    await 1;
    throw new Error("FAIL");
  }, ["async"]);
  await test(async () => {
    await 1;

    try {
      await thrower();
    } catch (e) {
      throw new Error("FAIL");
    }
  }, ["e"]); // TODO(caitp): FuncNameInferer is doing some weird stuff...

  await test(async () => {
    await 1;

    try {
      await reject();
    } catch (e) {
      throw new Error("FAIL");
    }
  }, ["e"]);
}

runTests().catch(e => {
  print(e);
  quit(1);
});