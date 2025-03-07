// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function assertThrowsAsync(run, errorType, message) {
  var actual;
  var hadValue = false;
  var hadError = false;
  var promise = run();

  if (typeof promise !== "object" || typeof promise.then !== "function") {
    throw new MjsUnitAssertionError(`Expected ${run.toString()} to return a Promise, but it returned ` + PrettyPrint(promise));
  }

  promise.then(function (value) {
    hadValue = true;
    actual = value;
  }, function (error) {
    hadError = true;
    actual = error;
  });
  hadValue || hadError;

  if (!hadError) {
    throw new MjsUnitAssertionError("Expected " + run + "() to throw " + errorType.name + ", but did not throw.");
  }

  if (!(actual instanceof errorType)) {
    throw new MjsUnitAssertionError("Expected " + run + "() to throw " + errorType.name + ", but threw '" + actual + "'");
  }

  if (message !== void 0 && actual.message !== message) {
    throw new MjsUnitAssertionError("Expected " + run + "() to throw '" + message + "', but threw '" + actual.message + "'");
  }
}

;

function assertEqualsAsync(expected, run, msg) {
  var actual;
  var hadValue = false;
  var hadError = false;
  var promise = run();

  if (typeof promise !== "object" || typeof promise.then !== "function") {
    throw new MjsUnitAssertionError(`Expected ${run.toString()} to return a Promise, but it returned ` + `${promise}`);
  }

  promise.then(function (value) {
    hadValue = true;
    actual = value;
  }, function (error) {
    hadError = true;
    actual = error;
  });
  hadValue || hadError;

  if (hadError) {
    throw actual;
  }

  hadValue;
  "Expected '" + run.toString() + "' to produce a value";
  expected;
  actual;
  msg;
}

;

class MyError extends Error {}

;

function Thrower(msg) {
  throw new MyError(msg);
}

function Rejecter(msg) {
  return new Promise(function (resolve, reject) {
    Promise.resolve().then(function () {
      reject(new MyError(msg));
    });
  });
}

function Resolver(msg) {
  return new Promise(function (resolve, reject) {
    Promise.resolve().then(function () {
      resolve(msg);
    });
  });
}

async function ForAwaitOfValues(it) {
  let array = [];

  for await (let x of it) {
    array.push(x);
  }

  return array;
}

let log = [];

function logIterResult(iter_result) {
  log.push(iter_result);
}

function logError(error) {
  log.push(error);
}

function AbortUnreachable() {
  print("This code should not be reachable.");
} // ----------------------------------------------------------------------------
// Do not install `AsyncGeneratorFunction` constructor on global object


undefined;
this.AsyncGeneratorFunction; // ----------------------------------------------------------------------------

let AsyncGenerator = Object.getPrototypeOf(async function* () {
  ;
});
let AsyncGeneratorPrototype = AsyncGenerator.prototype; // %AsyncGenerator% and %AsyncGeneratorPrototype% are both ordinary objects

"object";
typeof AsyncGenerator;
"object";
typeof AsyncGeneratorPrototype;
AsyncGenerator;
AsyncGeneratorPrototype.constructor;
AsyncGeneratorPrototype;
AsyncGenerator.prototype;
let protoDesc = Object.getOwnPropertyDescriptor(AsyncGenerator, 'prototype');
protoDesc.enumerable;
protoDesc.writable;
protoDesc.configurable;
let ctorDesc = Object.getOwnPropertyDescriptor(AsyncGeneratorPrototype, 'constructor');
ctorDesc.enumerable;
ctorDesc.writable;
ctorDesc.configurable; // ----------------------------------------------------------------------------
// The AsyncGeneratorFunction Constructor is the %AsyncGeneratorFunction%
// intrinsic object and is a subclass of Function.
// (proposal-async-iteration/sec-asyncgeneratorfunction-constructor)

let AsyncGeneratorFunction = AsyncGenerator.constructor;
Object.getPrototypeOf(AsyncGeneratorFunction);
Function;
Object.getPrototypeOf(AsyncGeneratorFunction.prototype);
Function.prototype;
(async function* () {
  ;
}) instanceof Function; // ----------------------------------------------------------------------------
// Let functionPrototype be the intrinsic object %AsyncGeneratorPrototype%.

async function* asyncGeneratorForProto() {
  ;
}

AsyncGeneratorFunction.prototype;
Object.getPrototypeOf(asyncGeneratorForProto);
AsyncGeneratorFunction.prototype;
Object.getPrototypeOf(async function* () {
  ;
});
AsyncGeneratorFunction.prototype;
Object.getPrototypeOf({
  async *method() {
    ;
  }

}.method);
AsyncGeneratorFunction.prototype;
Object.getPrototypeOf(AsyncGeneratorFunction());
AsyncGeneratorFunction.prototype;
Object.getPrototypeOf(new AsyncGeneratorFunction());
AsyncGeneratorFunction.prototype.prototype;
Object.getPrototypeOf(asyncGeneratorForProto.prototype);
asyncGeneratorForProto.hasOwnProperty("prototype");
AsyncGeneratorFunction.prototype.prototype;
Object.getPrototypeOf(async function* () {
  ;
}.prototype);
(async function* () {
  ;
}).hasOwnProperty("prototype");
AsyncGeneratorFunction.prototype.prototype;
Object.getPrototypeOf({
  async *method() {
    ;
  }

}.method.prototype);
({
  async *method() {
    ;
  }

}).method.hasOwnProperty("prototype");
AsyncGeneratorFunction.prototype.prototype;
Object.getPrototypeOf(AsyncGeneratorFunction().prototype);
AsyncGeneratorFunction().hasOwnProperty("prototype");
AsyncGeneratorFunction.prototype.prototype;
Object.getPrototypeOf(new AsyncGeneratorFunction().prototype);
new AsyncGeneratorFunction().hasOwnProperty("prototype"); // ----------------------------------------------------------------------------
// Basic Function.prototype.toString()

async function* asyncGeneratorForToString() {
  ;
}

"async function* asyncGeneratorForToString() {}";
asyncGeneratorForToString.toString();
"async function*() {}";
(async function* () {
  ;
}).toString();
"async function* namedAsyncGeneratorForToString() {}";
(async function* namedAsyncGeneratorForToString() {
  ;
}).toString();
"async *method() { }";
({
  async *method() {
    ;
  }

}).method.toString();
"async *method() { }";
(class {
  static async *method() {
    ;
  }

}).method.toString();
"async *method() { }";
new class {
  async *method() {
    ;
  }

}().method.toString();
"async function* anonymous(\n) {\n\n}";
AsyncGeneratorFunction().toString();
"async function* anonymous(\n) {\n\n}";
new AsyncGeneratorFunction().toString();
1;
(async function* (a) {
  await 1;
}).length;
2;
(async function* (a, b) {
  await 1;
}).length;
1;
(async function* (a, b = 2) {
  await 1;
}).length;
2;
(async function* (a, b, ...c) {
  await 1;
}).length;
1;
({
  async *f(a) {
    await 1;
  }

}).f.length;
2;
({
  async *f(a, b) {
    await 1;
  }

}).f.length;
1;
({
  async *f(a, b = 2) {
    await 1;
  }

}).f.length;
2;
({
  async *f(a, b, ...c) {
    await 1;
  }

}).f.length;
1;
AsyncGeneratorFunction("a", "await 1").length;
2;
AsyncGeneratorFunction("a", "b", "await 1").length;
1;
AsyncGeneratorFunction("a", "b = 2", "await 1").length;
2;
AsyncGeneratorFunction("a", "b", "...c", "await 1").length;
1;
new AsyncGeneratorFunction("a", "await 1").length;
2;
new AsyncGeneratorFunction("a", "b", "await 1").length;
1;
new AsyncGeneratorFunction("a", "b = 2", "await 1").length;
2;
new AsyncGeneratorFunction("a", "b", "...c", "await 1").length;
1;
(async function* (a) {
  yield 1;
}).length;
2;
(async function* (a, b) {
  yield 1;
}).length;
1;
(async function* (a, b = 2) {
  yield 1;
}).length;
2;
(async function* (a, b, ...c) {
  yield 1;
}).length;
1;
({
  async *f(a) {
    yield 1;
  }

}).f.length;
2;
({
  async *f(a, b) {
    yield 1;
  }

}).f.length;
1;
({
  async *f(a, b = 2) {
    yield 1;
  }

}).f.length;
2;
({
  async *f(a, b, ...c) {
    yield 1;
  }

}).f.length;
1;
AsyncGeneratorFunction("a", "yield 1").length;
2;
AsyncGeneratorFunction("a", "b", "yield 1").length;
1;
AsyncGeneratorFunction("a", "b = 2", "yield 1").length;
2;
AsyncGeneratorFunction("a", "b", "...c", "yield 1").length;
1;
new AsyncGeneratorFunction("a", "yield 1").length;
2;
new AsyncGeneratorFunction("a", "b", "yield 1").length;
1;
new AsyncGeneratorFunction("a", "b = 2", "yield 1").length;
2;
new AsyncGeneratorFunction("a", "b", "...c", "yield 1").length; // ----------------------------------------------------------------------------
// AsyncGeneratorFunction.prototype[ @@toStringTag ]

var descriptor = Object.getOwnPropertyDescriptor(AsyncGeneratorFunction.prototype, Symbol.toStringTag);
"AsyncGeneratorFunction";
descriptor.value;
false;
descriptor.enumerable;
false;
descriptor.writable;
true;
descriptor.configurable;
1;
AsyncGeneratorFunction.length; // ----------------------------------------------------------------------------
// Let F be ! FunctionAllocate(functionPrototype, Strict, "non-constructor")

async function* asyncNonConstructorDecl() {
  ;
}

(() => new asyncNonConstructorDecl())();

TypeError;

(() => asyncNonConstructorDecl.caller)();

TypeError;

(() => asyncNonConstructorDecl.arguments)();

TypeError;

(() => new async function* () {
  ;
}())();

TypeError;

(() => async function* () {
  ;
}.caller)();

TypeError;

(() => async function* () {
  ;
}.arguments)();

TypeError;

(() => new {
  async *nonConstructor() {
    ;
  }

}.nonConstructor())();

TypeError;

(() => ({
  async *nonConstructor() {
    ;
  }

}).nonConstructor.caller)();

TypeError;

(() => ({
  async *nonConstructor() {
    ;
  }

}).nonConstructor.arguments)();

TypeError;

(() => new (AsyncGeneratorFunction("nonconstructor"))())();

TypeError;

(() => AsyncGeneratorFunction("nonconstructor").caller)();

TypeError;

(() => AsyncGeneratorFunction("nonconstructor").arguments)();

TypeError;

(() => new new AsyncGeneratorFunction("nonconstructor")())();

TypeError;

(() => new AsyncGeneratorFunction("nonconstructor").caller)();

TypeError;

(() => new AsyncGeneratorFunction("nonconstructor").arguments)();

TypeError; // ----------------------------------------------------------------------------
// Empty functions

async function* emptyAsyncGenerator() {
  ;
}

let it = emptyAsyncGenerator();
({
  value: undefined,
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* emptyAsyncGeneratorExpr() {
  ;
}();

({
  value: undefined,
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    ;
  }

}.method();
({
  value: undefined,
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(``)();
({
  value: undefined,
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = new AsyncGeneratorFunction(``)();
({
  value: undefined,
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Top-level ReturnStatement


async function* asyncGeneratorForReturn() {
  return "boop1";
  throw "(unreachble)";
}

it = asyncGeneratorForReturn();
({
  value: "boop1",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  return "boop2";
  throw "(unreachable)";
}();

({
  value: "boop2",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    return "boop3";
    throw "(unreachable)";
  }

}.method();
({
  value: "boop3",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  return "boop4";
  throw "(unreachable)";`)();
({
  value: "boop4",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = new AsyncGeneratorFunction(`
  return "boop5";
  throw "(unreachable)";`)();
({
  value: "boop5",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Top-level ReturnStatement after await


async function* asyncGeneratorForReturnAfterAwait() {
  await 1;
  return "boop6";
  throw "(unreachable)";
}

it = asyncGeneratorForReturnAfterAwait();
({
  value: "boop6",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  await 1;
  return "boop7";
  throw "(unreachable)";
}();

({
  value: "boop7",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    await 1;
    return "boop8";
    throw "(unreachable)";
  }

}.method();
({
  value: "boop8",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  await 1;
  return "boop9";
  throw "(unreachable)"`)();
({
  value: "boop9",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = new AsyncGeneratorFunction(`
  await 1;
  return "boop10";
  throw "(unreachable)"`)();
({
  value: "boop10",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Top-level Yields


async function* asyncGeneratorForYields() {
  yield 1;
  yield await Resolver(2);
  yield Resolver(3);
  return 4;
  throw "(unreachable)";
}

it = asyncGeneratorForYields();
[1, 2, 3];

(() => ForAwaitOfValues(it))();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  yield "cow";
  yield await Resolver("bird");
  yield await "dog";
  yield Resolver("donkey");
  return "badger";
  throw "(unreachable)";
}();

["cow", "bird", "dog", "donkey"];

(() => ForAwaitOfValues(it))();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    yield "A";
    yield await Resolver("B");
    yield await "C";
    yield Resolver("CC");
    return "D";
    throw "(unreachable)";
  }

}.method();
["A", "B", "C", "CC"];

(() => ForAwaitOfValues(it))();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  yield "alpha";
  yield await Resolver("beta");
  yield await "gamma";
  yield Resolver("delta");
  return "epsilon";
  throw "(unreachable)"`)();
["alpha", "beta", "gamma", "delta"];

(() => ForAwaitOfValues(it))();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = new AsyncGeneratorFunction(`
  yield "α";
  yield await Resolver("β");
  yield await "γ";
  yield Resolver("δ");
  return "ε";
  throw "(unreachable)"`)();
["α", "β", "γ", "δ"];

(() => ForAwaitOfValues(it))();

({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Nested Resume via [AsyncGenerator].next()


log = [];

async function* asyncGeneratorForNestedResumeNext() {
  it.next().then(logIterResult, logError);
  it.next().then(logIterResult, logError);
  yield "rootbeer";
  yield await Resolver("float");
}

it = asyncGeneratorForNestedResumeNext();
it.next().then(logIterResult, AbortUnreachable);
[{
  value: "rootbeer",
  done: false
}, {
  value: "float",
  done: false
}, {
  value: undefined,
  done: true
}];
log;
log = [];

let asyncGeneratorExprForNestedResumeNext = async function* () {
  it.next().then(logIterResult, logError);
  it.next().then(logIterResult, logError);
  yield "first";
  yield await Resolver("second");
};

it = asyncGeneratorExprForNestedResumeNext();
it.next().then(logIterResult, AbortUnreachable);
[{
  value: "first",
  done: false
}, {
  value: "second",
  done: false
}, {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorMethodForNestedResumeNext = {
  async *method() {
    it.next().then(logIterResult, logError);
    it.next().then(logIterResult, logError);
    yield "remember";
    yield await Resolver("the cant!");
  }

}.method;
it = asyncGeneratorMethodForNestedResumeNext();
it.next().then(logIterResult, AbortUnreachable);
[{
  value: "remember",
  done: false
}, {
  value: "the cant!",
  done: false
}, {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorCallEvalForNestedResumeNext = AsyncGeneratorFunction(`
      it.next().then(logIterResult, logError);
      it.next().then(logIterResult, logError);
      yield "reading";
      yield await Resolver("rainbow!");`);
it = asyncGeneratorCallEvalForNestedResumeNext();
it.next().then(logIterResult, AbortUnreachable);
[{
  value: "reading",
  done: false
}, {
  value: "rainbow!",
  done: false
}, {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorNewEvalForNestedResumeNext = new AsyncGeneratorFunction(`
      it.next().then(logIterResult, logError);
      it.next().then(logIterResult, logError);
      yield 731;
      yield await Resolver("BB!");`);
it = asyncGeneratorNewEvalForNestedResumeNext();
it.next().then(logIterResult, AbortUnreachable);
[{
  value: 731,
  done: false
}, {
  value: "BB!",
  done: false
}, {
  value: undefined,
  done: true
}];
log; // ----------------------------------------------------------------------------
// Nested Resume via [AsyncGenerator].throw()

log = [];

async function* asyncGeneratorForNestedResumeThrow() {
  try {
    it.throw((await Rejecter("..."))).then(logIterResult, logError);
  } catch (e) {
    it.throw("throw2").then(logIterResult, logError);
    it.next().then(logIterResult, logError);
    throw "throw1";
  }

  AbortUnreachable();
}

it = asyncGeneratorForNestedResumeThrow();
it.next().then(logIterResult, logError);
["throw1", "throw2", {
  value: undefined,
  done: true
}];
log;
log = [];

let asyncGeneratorExprForNestedResumeThrow = async function* () {
  try {
    it.throw((await Rejecter("..."))).then(logIterResult, logError);
  } catch (e) {
    it.throw("throw4").then(logIterResult, logError);
    it.next().then(logIterResult, logError);
    throw "throw3";
  }

  AbortUnreachable();
};

it = asyncGeneratorExprForNestedResumeThrow();
it.next().then(logIterResult, logError);
["throw3", "throw4", {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorMethodForNestedResumeThrow = {
  async *method() {
    try {
      it.throw((await Rejecter("..."))).then(logIterResult, logError);
    } catch (e) {
      it.throw("throw6").then(logIterResult, logError);
      it.next().then(logIterResult, logError);
      throw "throw5";
    }

    AbortUnreachable();
  }

}.method;
it = asyncGeneratorMethodForNestedResumeThrow();
it.next().then(logIterResult, logError);
["throw5", "throw6", {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorCallEvalForNestedResumeThrow = AsyncGeneratorFunction(`
      try {
        it.throw(await Rejecter("...")).then(logIterResult, logError);
      } catch (e) {
        it.throw("throw8").then(logIterResult, logError);
        it.next().then(logIterResult, logError);
        throw "throw7";
      }
      AbortUnreachable();`);
it = asyncGeneratorCallEvalForNestedResumeThrow();
it.next().then(logIterResult, logError);
["throw7", "throw8", {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorNewEvalForNestedResumeThrow = new AsyncGeneratorFunction(`
      try {
        it.throw(await Rejecter("...")).then(logIterResult, logError);
      } catch (e) {
        it.throw("throw10").then(logIterResult, logError);
        it.next().then(logIterResult, logError);
        throw "throw9";
      }
      AbortUnreachable();`);
it = asyncGeneratorNewEvalForNestedResumeThrow();
it.next().then(logIterResult, logError);
["throw9", "throw10", {
  value: undefined,
  done: true
}];
log; // ----------------------------------------------------------------------------
// Nested Resume via [AsyncGenerator].return()

log = [];

async function* asyncGeneratorForNestedResumeReturn() {
  it.return("step2").then(logIterResult, logError);
  it.next().then(logIterResult, logError);
  yield "step1";
  AbortUnreachable();
}

it = asyncGeneratorForNestedResumeReturn();
it.next().then(logIterResult, logError);
[{
  value: "step1",
  done: false
}, {
  value: "step2",
  done: true
}, {
  value: undefined,
  done: true
}];
log;
log = [];

let asyncGeneratorExprForNestedResumeReturn = async function* () {
  it.return("step4").then(logIterResult, logError);
  it.next().then(logIterResult, logError);
  yield "step3";
};

it = asyncGeneratorExprForNestedResumeReturn();
it.next().then(logIterResult, logError);
[{
  value: "step3",
  done: false
}, {
  value: "step4",
  done: true
}, {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorMethodForNestedResumeReturn = {
  async *method() {
    it.return("step6").then(logIterResult, logError);
    it.next().then(logIterResult, logError);
    yield "step5";
  }

}.method;
it = asyncGeneratorMethodForNestedResumeReturn();
it.next().then(logIterResult, logError);
[{
  value: "step5",
  done: false
}, {
  value: "step6",
  done: true
}, {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorCallEvalForNestedResumeReturn = AsyncGeneratorFunction(`
      it.return("step8").then(logIterResult, logError);
      it.next().then(logIterResult, logError);
      yield "step7";`);
it = asyncGeneratorCallEvalForNestedResumeReturn();
it.next().then(logIterResult, logError);
[{
  value: "step7",
  done: false
}, {
  value: "step8",
  done: true
}, {
  value: undefined,
  done: true
}];
log;
log = [];
let asyncGeneratorNewEvalForNestedResumeReturn = new AsyncGeneratorFunction(`
      it.return("step10").then(logIterResult, logError);
      it.next().then(logIterResult, logError);
      yield "step9";`);
it = asyncGeneratorNewEvalForNestedResumeReturn();
it.next().then(logIterResult, logError);
[{
  value: "step9",
  done: false
}, {
  value: "step10",
  done: true
}, {
  value: undefined,
  done: true
}];
log; // ----------------------------------------------------------------------------
// Top-level Yield ThrowStatement

async function* asyncGeneratorForYieldThrow() {
  yield await Thrower("OOPS1");
  throw "(unreachable)";
}

it = asyncGeneratorForYieldThrow();

(() => it.next())();

MyError;
"OOPS1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  yield Thrower("OOPS2");
  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"OOPS2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    yield Thrower("OOPS3");
    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"OOPS3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  yield Thrower("OOPS4");
  throw "(unreachable)"`)();

(() => it.next())();

MyError;
"OOPS4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = new AsyncGeneratorFunction(`
  yield Thrower("OOPS5");
  throw "(unreachable)"`)();

(() => it.next())();

MyError;
"OOPS5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Top-level Yield Awaited Rejection


async function* asyncGeneratorForYieldAwaitedRejection() {
  yield await Rejecter("OOPS1");
  throw "(unreachable)";
}

it = asyncGeneratorForYieldAwaitedRejection();

(() => it.next())();

MyError;
"OOPS1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  yield await Rejecter("OOPS2");
  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"OOPS2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    yield await Rejecter("OOPS3");
    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"OOPS3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  yield await Rejecter("OOPS4");
  throw "(unreachable)"`)();

(() => it.next())();

MyError;
"OOPS4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = new AsyncGeneratorFunction(`
  yield await Rejecter("OOPS5");
  throw "(unreachable)"`)();

(() => it.next())();

MyError;
"OOPS5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Top-level ThrowStatement


async function* asyncGeneratorForThrow() {
  throw new MyError("BOOM1");
  throw "(unreachable)";
}

it = asyncGeneratorForThrow();

(() => it.next())();

MyError;
"BOOM1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  throw new MyError("BOOM2");
  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    throw new MyError("BOOM3");
    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  throw new MyError("BOOM4");
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  throw new MyError("BOOM5");
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Top-level ThrowStatement after Await


async function* asyncGeneratorForThrowAfterAwait() {
  await 1;
  throw new MyError("BOOM6");
  throw "(unreachable)";
}

it = asyncGeneratorForThrowAfterAwait();

(() => it.next())();

MyError;
"BOOM6";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  await 1;
  throw new MyError("BOOM7");
  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM7";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    await 1;
    throw new MyError("BOOM8");
    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM8";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  await 1;
  throw new MyError("BOOM9");
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM9";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = new AsyncGeneratorFunction(`
  await 1;
  throw new MyError("BOOM10");
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM10";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Top-level Awaited rejection


async function* asyncGeneratorForAwaitedRejection() {
  await Rejecter("BOOM11");
  throw "(unreachable)";
}

it = asyncGeneratorForAwaitedRejection();

(() => it.next())();

MyError;
"BOOM11";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  await Rejecter("BOOM12");
  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM12";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    await Rejecter("BOOM13");
    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM13";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  await Rejecter("BOOM14");
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM14";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = new AsyncGeneratorFunction(`
  await Rejecter("BOOM15");
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM15";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Caught ThrowStatement


async function* asyncGeneratorForCaughtThrow() {
  try {
    throw new MyError("BOOM1");
  } catch (e) {
    return "caught1";
  }

  throw "(unreachable)";
}

it = asyncGeneratorForCaughtThrow();
({
  value: "caught1",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    throw new MyError("BOOM2");
  } catch (e) {
    return "caught2";
  }

  throw "(unreachable)";
}();

({
  value: "caught2",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      throw new MyError("BOOM3");
    } catch (e) {
      return "caught3";
    }

    throw "(unreachable)";
  }

}.method();
({
  value: "caught3",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("BOOM4");
  } catch (e) {
    return "caught4";
  }
  throw "(unreachable)";`)();
({
  value: "caught4",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("BOOM5");
  } catch (e) {
    return "caught5";
  }
  throw "(unreachable)";`)();
({
  value: "caught5",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Caught ThrowStatement and rethrow


async function* asyncGeneratorForCaughtRethrow() {
  try {
    throw new MyError("BOOM1");
  } catch (e) {
    throw new MyError("RETHROW1");
  }

  throw "(unreachable)";
}

it = asyncGeneratorForCaughtRethrow();

(() => it.next())();

MyError;
"RETHROW1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    throw new MyError("BOOM2");
  } catch (e) {
    throw new MyError("RETHROW2");
  }

  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"RETHROW2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      throw new MyError("BOOM3");
    } catch (e) {
      throw new MyError("RETHROW3");
    }

    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"RETHROW3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("BOOM4");
  } catch (e) {
    throw new MyError("RETHROW4");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"RETHROW4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("BOOM5");
  } catch (e) {
    throw new MyError("RETHROW5");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"RETHROW5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// ReturnStatement in Try, ReturnStatement in Finally


async function* asyncGeneratorForReturnInTryReturnInFinally() {
  try {
    return "early1";
  } finally {
    return "later1";
  }

  throw "(unreachable)";
}

it = asyncGeneratorForReturnInTryReturnInFinally();
({
  value: "later1",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    return "early2";
  } finally {
    return "later2";
  }

  throw "(unreachable)";
}();

({
  value: "later2",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      return "early3";
    } finally {
      return "later3";
    }

    throw "(unreachable)";
  }

}.method();
({
  value: "later3",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    return "early4";
  } finally {
    return "later4";
  }
  throw "(unreachable)";`)();
({
  value: "later4",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    return "early5";
  } finally {
    return "later5";
  }
  throw "(unreachable)";`)();
({
  value: "later5",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// ThrowStatement in Try, ReturnStatement in Finally


async function* asyncGeneratorForThrowInTryReturnInFinally() {
  try {
    throw new MyError("BOOM1");
  } finally {
    return "later1";
  }

  throw "(unreachable)";
}

it = asyncGeneratorForThrowInTryReturnInFinally();
({
  value: "later1",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    throw new MyError("BOOM2");
  } finally {
    return "later2";
  }

  throw "(unreachable)";
}();

({
  value: "later2",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      throw new MyError("BOOM3");
    } finally {
      return "later3";
    }

    throw "(unreachable)";
  }

}.method();
({
  value: "later3",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("BOOM4");
  } finally {
    return "later4";
  }
  throw "(unreachable)";`)();
({
  value: "later4",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("BOOM5");
  } finally {
    return "later5";
  }
  throw "(unreachable)";`)();
({
  value: "later5",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Awaited Rejection in Try, ReturnStatement in Finally


async function* asyncGeneratorForAwaitRejectionInTryReturnInFinally() {
  try {
    await Rejecter("BOOM1");
  } finally {
    return "later1";
  }

  throw "(unreachable)";
}

it = asyncGeneratorForThrowInTryReturnInFinally();
({
  value: "later1",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    await Rejecter("BOOM2");
  } finally {
    return "later2";
  }

  throw "(unreachable)";
}();

({
  value: "later2",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      await Rejecter("BOOM3");
    } finally {
      return "later3";
    }

    throw "(unreachable)";
  }

}.method();
({
  value: "later3",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    await Rejecter("BOOM4");
  } finally {
    return "later4";
  }
  throw "(unreachable)";`)();
({
  value: "later4",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    await Rejecter("BOOM5");
  } finally {
    return "later5";
  }
  throw "(unreachable)";`)();
({
  value: "later5",
  done: true
});

(() => it.next())();

({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// ReturnStatement in Try, ThrowStatement in Finally


async function* asyncGeneratorForReturnInTryThrowInFinally() {
  try {
    return "early1";
  } finally {
    throw new MyError("BOOM1");
  }

  throw "(unreachable)";
}

it = asyncGeneratorForReturnInTryThrowInFinally();

(() => it.next())();

MyError;
"BOOM1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    return "early2";
  } finally {
    throw new MyError("BOOM2");
  }

  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      return "early3";
    } finally {
      throw new MyError("BOOM3");
    }

    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    return "early4";
  } finally {
    throw new MyError("BOOM4");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    return "early5";
  } finally {
    throw new MyError("BOOM5");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// ThrowStatement in Try, ThrowStatement in Finally


async function* asyncGeneratorForThrowInTryThrowInFinally() {
  try {
    throw new MyError("EARLY1");
  } finally {
    throw new MyError("BOOM1");
  }

  throw "(unreachable)";
}

it = asyncGeneratorForThrowInTryThrowInFinally();

(() => it.next())();

MyError;
"BOOM1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    throw new MyError("EARLY2");
  } finally {
    throw new MyError("BOOM2");
  }

  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      throw new MyError("EARLY3");
    } finally {
      throw new MyError("BOOM3");
    }

    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("EARLY4");
  } finally {
    throw new MyError("BOOM4");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("EARLY5");
  } finally {
    throw new MyError("BOOM5");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Awaited Rejection in Try, ThrowStatement in Finally


async function* asyncGeneratorForAwaitedRejectInTryThrowInFinally() {
  try {
    await Rejecter("EARLY1");
  } finally {
    throw new MyError("BOOM1");
  }

  throw "(unreachable)";
}

it = asyncGeneratorForAwaitedRejectInTryThrowInFinally();

(() => it.next())();

MyError;
"BOOM1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    await Rejecter("EARLY2");
  } finally {
    throw new MyError("BOOM2");
  }

  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      await Rejecter("EARLY3");
    } finally {
      throw new MyError("BOOM3");
    }

    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    await Rejecter("EARLY4");
  } finally {
    throw new MyError("BOOM4");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    await Rejecter("EARLY5");
  } finally {
    throw new MyError("BOOM5");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// ReturnStatement in Try, Awaited Rejection in Finally


async function* asyncGeneratorForReturnInTryAwaitedRejectionInFinally() {
  try {
    return "early1";
  } finally {
    await Rejecter("BOOM1");
  }

  throw "(unreachable)";
}

it = asyncGeneratorForReturnInTryAwaitedRejectionInFinally();

(() => it.next())();

MyError;
"BOOM1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    return "early2";
  } finally {
    await Rejecter("BOOM2");
  }

  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      return "early3";
    } finally {
      await Rejecter("BOOM3");
    }

    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    return "early4";
  } finally {
    await Rejecter("BOOM4");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    return "early5";
  } finally {
    await Rejecter("BOOM5");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// ThrowStatement in Try, Awaited Rejection in Finally


async function* asyncGeneratorForThrowInTryAwaitedRejectionInFinally() {
  try {
    throw new MyError("EARLY1");
  } finally {
    await Rejecter("BOOM1");
  }

  throw "(unreachable)";
}

it = asyncGeneratorForThrowInTryAwaitedRejectionInFinally();

(() => it.next())();

MyError;
"BOOM1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    throw new MyError("EARLY2");
  } finally {
    await Rejecter("BOOM2");
  }

  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      throw new MyError("EARLY3");
    } finally {
      await Rejecter("BOOM3");
    }

    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("EARLY4");
  } finally {
    await Rejecter("BOOM4");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    throw new MyError("EARLY5");
  } finally {
    await Rejecter("BOOM5");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Awaited Rejection in Try, Awaited Rejection in Finally


async function* asyncGeneratorForAwaitedRejectInTryAwaitedRejectionInFinally() {
  try {
    await Rejecter("EARLY1");
  } finally {
    await Rejecter("BOOM1");
  }

  throw "(unreachable)";
}

it = asyncGeneratorForAwaitedRejectInTryAwaitedRejectionInFinally();

(() => it.next())();

MyError;
"BOOM1";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = async function* () {
  try {
    await Rejecter("EARLY2");
  } finally {
    await Rejecter("BOOM2");
  }

  throw "(unreachable)";
}();

(() => it.next())();

MyError;
"BOOM2";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = {
  async *method() {
    try {
      await Rejecter("EARLY3");
    } finally {
      await Rejecter("BOOM3");
    }

    throw "(unreachable)";
  }

}.method();

(() => it.next())();

MyError;
"BOOM3";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    await Rejecter("EARLY4");
  } finally {
    await Rejecter("BOOM4");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM4";
({
  value: undefined,
  done: true
});

(() => it.next())();

it = AsyncGeneratorFunction(`
  try {
    await Rejecter("EARLY5");
  } finally {
    await Rejecter("BOOM5");
  }
  throw "(unreachable)";`)();

(() => it.next())();

MyError;
"BOOM5";
({
  value: undefined,
  done: true
});

(() => it.next())(); // ----------------------------------------------------------------------------
// Early errors during parameter initialization


async function* asyncGeneratorForParameterInitializationErrors([...a], b = c, d) {
  AbortUnreachable();
}

(() => asyncGeneratorForParameterInitializationErrors(null))();

TypeError;

(() => asyncGeneratorForParameterInitializationErrors([]))();

ReferenceError;

let asyncGeneratorExprForParameterInitializationErrors = async function* ([...a], b = c, d) {
  AbortUnreachable();
};

(() => asyncGeneratorExprForParameterInitializationErrors(null))();

TypeError;

(() => asyncGeneratorExprForParameterInitializationErrors([]))();

ReferenceError;
let asyncGeneratorMethodForParameterInitializationErrors = {
  async *method([...a], b = c, d) {
    AbortUnreachable();
  }

}.method;

(() => asyncGeneratorMethodForParameterInitializationErrors(null))();

TypeError;

(() => asyncGeneratorMethodForParameterInitializationErrors([]))();

ReferenceError;
let asyncGeneratorCallEvalForParameterInitializationErrors = AsyncGeneratorFunction("[...a], b = c, d", `AbortUnreachable();`);

(() => asyncGeneratorCallEvalForParameterInitializationErrors(null))();

TypeError;

(() => asyncGeneratorCallEvalForParameterInitializationErrors([]))();

ReferenceError;
let asyncGeneratorNewEvalForParameterInitializationErrors = new AsyncGeneratorFunction("[...a], b = c, d", `AbortUnreachable();`);

(() => asyncGeneratorNewEvalForParameterInitializationErrors(null))();

TypeError;

(() => asyncGeneratorNewEvalForParameterInitializationErrors([]))();

ReferenceError; // ----------------------------------------------------------------------------
// Invoke [AsyncGenerator].return() when generator is in state suspendedStart

async function* asyncGeneratorForReturnSuspendedStart() {
  AbortUnreachable();
}

it = asyncGeneratorForReturnSuspendedStart();
({
  value: "ret1",
  done: true
});

(() => it.return("ret1"))();

({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores";

it = async function* () {
  AbortUnreachable();
}();

({
  value: "ret2",
  done: true
});

(() => it.return("ret2"))();

({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores";
it = {
  async *method() {
    AbortUnreachable();
  }

}.method();
({
  value: "ret3",
  done: true
});

(() => it.return("ret3"))();

({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores";
it = AsyncGeneratorFunction(`AbortUnreachable();`)();
({
  value: "ret4",
  done: true
});

(() => it.return("ret4"))();

({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores";
it = AsyncGeneratorFunction(`AbortUnreachable();`)();
({
  value: "ret5",
  done: true
});

(() => it.return("ret5"))();

({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores"; // ----------------------------------------------------------------------------
// Invoke [AsyncGenerator].throw() when generator is in state suspendedStart

async function* asyncGeneratorForThrowSuspendedStart() {
  AbortUnreachable();
}

it = asyncGeneratorForReturnSuspendedStart();

(() => it.throw(new MyError("throw1")))();

MyError;
"throw1";
({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores";

it = async function* () {
  AbortUnreachable();
}();

(() => it.throw(new MyError("throw2")))();

MyError;
"throw2";
({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores";
it = {
  async *method() {
    AbortUnreachable();
  }

}.method();

(() => it.throw(new MyError("throw3")))();

MyError;
"throw3";
({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores";
it = AsyncGeneratorFunction(`AbortUnreachable()`)();

(() => it.throw(new MyError("throw4")))();

MyError;
"throw4";
({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores";
it = AsyncGeneratorFunction(`AbortUnreachable();`)();

(() => it.throw(new MyError("throw5")))();

MyError;
"throw5";
({
  value: undefined,
  done: true
});

(() => it.next("x"))();

({
  value: "nores",
  done: true
});

(() => it.return("nores"))();

(() => it.throw(new MyError("nores")))();

MyError;
"nores"; // ----------------------------------------------------------------------------
// Simple yield*:

log = [];

async function* asyncGeneratorYieldStar1() {
  yield* {
    get [Symbol.asyncIterator]() {
      log.push({
        name: "get @@asyncIterator"
      });
      return (...args) => {
        log.push({
          name: "call @@asyncIterator",
          args
        });
        return this;
      };
    },

    get [Symbol.iterator]() {
      log.push({
        name: "get @@iterator"
      });
      return (...args) => {
        log.push({
          name: "call @@iterator",
          args
        });
        return this;
      };
    },

    get next() {
      log.push({
        name: "get next"
      });
      return (...args) => {
        log.push({
          name: "call next",
          args
        });
        return {
          get then() {
            log.push({
              name: "get then"
            });
            return null;
          },

          get value() {
            log.push({
              name: "get value"
            });
            throw exception = new MyError("AbruptValue!");
          },

          get done() {
            log.push({
              name: "get done"
            });
            return false;
          }

        };
      };
    },

    get return() {
      log.push({
        name: "get return"
      });
      return (...args) => {
        log.push({
          name: "call return",
          args
        });
        return {
          value: args[0],
          done: true
        };
      };
    },

    get throw() {
      log.push({
        name: "get throw"
      });
      return (...args) => {
        log.push({
          name: "call throw",
          args
        });
        throw args[0];
      };
    }

  };
}

it = asyncGeneratorYieldStar1();

(() => it.next())();

MyError;
[{
  name: "get @@asyncIterator"
}, {
  name: "call @@asyncIterator",
  args: []
}, {
  name: "get next"
}, {
  name: "call next",
  args: [undefined]
}, {
  name: "get then"
}, {
  name: "get done"
}, {
  name: "get value"
}];
log;
({
  value: undefined,
  done: true
});

(() => it.next())();