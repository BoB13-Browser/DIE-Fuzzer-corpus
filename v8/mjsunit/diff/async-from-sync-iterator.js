// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
let testFailed = false;
let testFailure;

function assertThrowsAsync(run, errorType, message) {
  var actual;
  var hadValue = false;
  var hadError = false;
  var promise = run();

  if (typeof promise !== "object" || typeof promise.then !== "function") {
    throw new MjsUnitAssertionError("Expected " + run.toString() + " to return a Promise, but it returned " + PrettyPrint(promise));
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

function resolveLater(value) {
  return new Promise(function (resolve) {
    Promise.resolve().then(function () {
      resolve(value);
    });
  });
}

function rejectLater(value) {
  return new Promise(function (resolve, reject) {
    Promise.resolve().then(function () {
      reject(value);
    });
  });
}

const kNext = 1;
const kThrow = 2;
const kReturn = 4;
const kNextThrows = kNext | 8;
const kReturnThrows = kReturn | 16;
const kThrowNormal = kThrow | 32;
const kNextUnchanged = kNext | 64;
const kReturnUnchanged = kReturn | 128;
const kThrowUnchanged = kThrow | 256;

function sync(array, features, log) {
  // `log` is a required parameter
  if (log === void 0) {
    print("`log` is undefined");
  }

  let i = 0;
  let methods = {
    next(sent) {
      let done = i >= array.length;
      let value = array[i];
      log.push({
        method: "next",
        sent,
        value,
        done
      });

      if ((features & kNextThrows) === kNextThrows) {
        throw sent;
      }

      if ((features & kNextUnchanged) === kNextUnchanged) {
        return sent;
      }

      i++;
      return {
        value,
        done
      };
    },

    throw(sent) {
      let done = i >= array.length;
      log.push({
        method: "throw",
        sent,
        done
      });

      if ((features & kThrowNormal) === kThrowNormal) {
        return {
          value: sent,
          done
        };
      }

      if ((features & kThrowUnchanged) === kThrowUnchanged) {
        return sent;
      }

      throw sent;
    },

    return(sent) {
      let done = true;
      log.push({
        method: "return",
        sent,
        done
      });

      if ((features & kReturnThrows) === kReturnThrows) {
        throw sent;
      }

      if ((features & kReturnUnchanged) === kReturnUnchanged) {
        return sent;
      }

      return {
        value: sent,
        done
      };
    }

  };
  return {
    [Symbol.iterator]() {
      return this;
    },

    next: features & kNext ? methods.next : undefined,
    throw: features & kThrow ? methods.throw : undefined,
    return: features & kReturn ? methods.return : undefined
  };
}

class MyError extends Error {}

;
(async function AsyncFromSyncWithGenerator() {
  function* gen1() {
    yield "sync value";

    try {
      yield new Promise(function (resolve) {
        resolve("async value");
      });
    } catch (error) {
      throw error;
    }

    "generator is closed";
  }

  let iter = f(gen()); // [Async-from-Sync Iterator] wraps sync iterator values in a Promise

  let promise = iter.next();
  promise;
  Promise;
  let iter_result = await promise;
  ({
    value: "sync value",
    done: false
  });
  iter_result; // [Async-from-Sync Iterator] will wait for resolution of Promise values

  promise = iter.next();
  promise;
  Promise;
  iter_result = await promise;
  ({
    value: "async value",
    done: false
  });
  iter_result; // [Async-from-Sync Iterator].throw delegates to .throw() method of sync
  // iterator.

  promise = iter.throw(new MyError("Error1"));
  promise;
  Promise;

  try {
    await promise;
    "promise should be rejected";
  } catch (e) {
    // If assertUnreachable failed, rethrow
    if (e instanceof MjsUnitAssertionError) {
      throw e;
    }

    e;
    MyError;
    "Error1";
    e.message;
  } // Generator is closed, subsequent calls to .next() will not resume.


  promise = iter.next("floof");
  iter_result = await promise;
  ({
    value: undefined,
    done: true
  });
  iter_result;
  promise = iter.return("generator closed");
  promise;
  Promise;
  iter_result = await promise;
  ({
    value: "generator closed",
    done: true
  });
  iter_result; // .next(), .return() and .throw() delegate to sync iterator methods, without
  // keeping track of the state of the generator.

  promise = iter.next("unused");
  promise;
  Promise;
  iter_result = await promise;
  ({
    value: undefined,
    done: true
  });
  iter_result;
  promise = iter.throw(new MyError("Error2"));
  promise;
  Promise;

  try {
    await promise;
    "promise should be rejected";
  } catch (e) {
    // If assertUnreachable failed, rethrow
    if (e instanceof MjsUnitAssertionError) {
      throw e;
    }

    e;
    MyError;
    "Error2";
    e.message;
  }

  promise = iter.return("return-after-completed");
  promise;
  Promise;
  iter_result = await promise;
  ({
    value: "return-after-completed",
    done: true
  });
  iter_result;
})().catch(function (error) {
  testFailed = true;
  testFailure = error;
});

if (testFailed) {
  throw testFailure;
}

(async function AsyncFromSyncOrderOfOperations() {
  let log = [];
  iter = f(sync(["sync-value"], 0, log));

  try {
    await iter.next();
    "Iterator.next() method is not optional";
  } catch (e) {
    e;
    TypeError;
    [];
    log;
  }

  log = [];
  iter = f(sync(["sync-value"], kNext, log));
  ({
    value: "sync-value",
    done: false
  });
  await iter.next("a");
  [{
    method: "next",
    sent: "a",
    value: "sync-value",
    done: false
  }];
  log;
  log = [];
  let asyncValue = resolveLater("async-value");
  iter = f(sync([asyncValue], kNext, log));
  ({
    value: "async-value",
    done: false
  });
  await iter.next("b");
  [{
    method: "next",
    sent: "b",
    value: asyncValue,
    done: false
  }];
  log; // If [sync_iterator].next() produces a rejected Promise or an exception is
  // thrown, Promise is rejected with thrown/rejected value.

  log = [];
  asyncValue = rejectLater("Boo!");
  iter = f(sync([asyncValue], kNext, log));

  try {
    await iter.next('c');
    'Expected `iter.next(\'c\') to throw, but did not throw';
  } catch (e) {
    "Boo!";
    e;
    [{
      method: 'next',
      sent: 'c',
      value: asyncValue,
      done: false
    }];
    log;
  }

  log = [];
  iter = f(sync(['sync-value'], kNextThrows, log));

  try {
    await iter.next('Boo!');
    'Expected `iter.next(\'c\') to throw, but did not throw';
  } catch (e) {
    "Boo!";
    e;
    [{
      method: 'next',
      sent: 'Boo!',
      value: 'sync-value',
      done: false
    }];
    log;
  } // [Async-from-Sync Iterator].next() will be rejected with a TypeError if
  // Type([sync_iterator].next()) is not Object.


  log = [];
  iter = f(sync(['sync-value'], kNextUnchanged, log));

  try {
    await iter.next('not-a-JSReceiver');
    'Expected `iter.next(\'not-a-JSReceiver\')` to ' + 'throw, but did not throw';
  } catch (e) {
    e.constructor;
    TypeError;
  }

  [{
    method: 'next',
    sent: 'not-a-JSReceiver',
    value: 'sync-value',
    done: false
  }];
  log; // If [sync_iterator] does not have a .return() method, return a Promise
  // resolved with the value `{ value: <<sent value>>, done: true }`.

  log = [];
  iter = f(sync(['sync-return'], kNext, log));
  ({
    value: 'd',
    done: true
  });
  await iter.return('d');
  ({
    value: 'sync-return',
    done: false
  });
  await iter.next('e');
  [{
    method: 'next',
    sent: 'e',
    value: 'sync-return',
    done: false
  }];
  log; // If [sync_iterator] does have a .return() method, return a Promise
  // fulfilled with the iterator result of [sync_iterator].return().

  log = [];
  iter = f(sync(['sync-return'], kNext | kReturn, log));
  ({
    value: 'f',
    done: true
  });
  await iter.return('f');
  ({
    value: 'sync-return',
    done: false
  });
  await iter.next('g');
  [{
    method: 'return',
    sent: 'f',
    done: true
  }, {
    method: 'next',
    sent: 'g',
    value: 'sync-return',
    done: false
  }];
  log; // If [sync_iterator].return() produces a rejected Promise or an exception is
  // thrown, Promise is rejected with thrown/rejected value.

  log = [];
  iter = f(sync(['sync-value'], kNext | kReturnThrows, log));

  try {
    await iter.return('Boo!!');
    'Expected `iter.return(\'Boo!!\')` to throw, but did ' + 'not throw';
  } catch (e) {
    "Boo!!";
    e;
  } // [Async-from-Sync Iterator] merely delegates, and does not keep track of
  // whether [sync_iterator] is completed or not.


  ({
    value: 'sync-value',
    done: false
  });
  await iter.next('h');
  [{
    method: 'return',
    sent: 'Boo!!',
    done: true
  }, {
    method: 'next',
    sent: 'h',
    value: 'sync-value',
    done: false
  }];
  log;
  log = [];
  iter = f(sync(['sync-value'], kNext | kReturn, log));
  let rejection = Promise.reject('Boo!!');

  try {
    await iter.return(rejection);
    'Expected `iter.return(Promise.reject(\'Boo!!\'))` to ' + 'throw, but did not throw';
  } catch (e) {
    'Boo!!';
    e;
  } // [Async-from-Sync Iterator] merely delegates, and does not keep track of
  // whether [sync_iterator] is completed or not.


  ({
    value: 'sync-value',
    done: false
  });
  await iter.next('i');
  [{
    method: 'return',
    sent: rejection,
    done: true
  }, {
    method: 'next',
    sent: 'i',
    value: 'sync-value',
    done: false
  }];
  log; // [Async-from-Sync Iterator].return() will be rejected with a TypeError if
  // Type([sync_iterator].return()) is not Object.

  log = [];
  iter = f(sync(['sync-value'], kNext | kReturnUnchanged, log));

  try {
    await iter.return('not-a-JSReceiver');
    'Expected `iter.return(\'not-a-JSReceiver\')` to ' + 'throw, but did not throw';
  } catch (e) {
    e.constructor;
    TypeError;
  } // [Async-from-Sync Iterator] merely delegates, and does not keep track of
  // whether [sync_iterator] is completed or not.


  ({
    value: 'sync-value',
    done: false
  });
  await iter.next('j');
  [{
    method: 'return',
    sent: 'not-a-JSReceiver',
    done: true
  }, {
    method: 'next',
    sent: 'j',
    value: 'sync-value',
    done: false
  }];
  log; // If [sync_iterator] does not have a .throw method, return a Promise rejected
  // with the sent value.

  log = [];
  iter = f(sync(['sync-value'], kNext, log));

  try {
    await iter.throw('Boo!!');
    'Expected iter.throw(\'Boo!!\') to throw, but did not ' + 'throw';
  } catch (e) {
    'Boo!!';
    e;
  } // [Async-from-Sync Iterator] merely delegates, and does not keep track of
  // whether [sync_iterator] is completed or not.


  ({
    value: 'sync-value',
    done: false
  });
  await iter.next('k');
  [{
    method: 'next',
    sent: 'k',
    value: 'sync-value',
    done: false
  }];
  log;
  log = [];
  iter = f(sync(['sync-value'], kNext | kThrow, log));

  try {
    await iter.throw('Boo!!');
    'Expected iter.throw(\'Boo!!\') to throw, but did not ' + 'throw';
  } catch (e) {
    'Boo!!';
    e;
  } // [Async-from-Sync Iterator] merely delegates, and does not keep track of
  // whether [sync_iterator] is completed or not.


  ({
    value: 'sync-value',
    done: false
  });
  await iter.next('l');
  [{
    method: 'throw',
    sent: 'Boo!!',
    done: false
  }, {
    method: 'next',
    sent: 'l',
    value: 'sync-value',
    done: false
  }];
  log; // If [sync_iterator].throw() returns a resolved Promise or a Completion
  // with [[Type]] "normal" or "return", return a resolved Promise

  log = [];
  iter = f(sync(['sync-value'], kNext | kThrowNormal, log));
  ({
    value: 'Boo!!',
    done: false
  });
  await iter.throw('Boo!!');
  ({
    value: 'sync-value',
    done: false
  });
  await iter.next('m');
  [{
    method: 'throw',
    sent: 'Boo!!',
    done: false
  }, {
    method: 'next',
    sent: 'm',
    value: 'sync-value',
    done: false
  }];
  log; // [Async-from-Sync Iterator].throw() will be rejected with a TypeError if
  // Type([sync_iterator].throw()) is not Object.

  log = [];
  iter = f(sync(['sync-value'], kNext | kThrowUnchanged, log));

  try {
    await iter.throw('not-a-JSReceiver');
    'Expected `iter.throw(\'not-a-JSReceiver\')` to ' + 'throw, but did not throw';
  } catch (e) {
    e.constructor;
    TypeError;
  } // [Async-from-Sync Iterator] merely delegates, and does not keep track of
  // whether [sync_iterator] is completed or not.


  ({
    value: 'sync-value',
    done: false
  });
  await iter.next('n');
  [{
    method: 'throw',
    sent: 'not-a-JSReceiver',
    done: false
  }, {
    method: 'next',
    sent: 'n',
    value: 'sync-value',
    done: false
  }];
  log; // Let nextValue be IteratorValue(nextResult).
  // IfAbruptRejectPromise(nextValue, promiseCapability).)

  iter = f({
    next() {
      return {
        get value() {
          throw "BadValue!";
        },

        done: false
      };
    }

  });

  try {
    await iter.next();
    'Expected `iter.next()` to throw, but did not throw';
  } catch (e) {
    'BadValue!';
    e;
  } // Let nextDone be IteratorComplete(nextResult).
  // IfAbruptRejectPromise(nextDone, promiseCapability).


  iter = f({
    next() {
      return {
        value: undefined,

        get done() {
          throw "BadValue!";
        }

      };
    }

  });

  try {
    await iter.next();
    'Expected `iter.next()` to throw, but did not throw';
  } catch (e) {
    'BadValue!';
    e;
  } // IfAbruptRejectPromise(returnResult, promiseCapability).
  // Let returnValue be IteratorValue(returnResult).


  iter = f({
    return() {
      return {
        get value() {
          throw "BadValue!";
        },

        done: false
      };
    }

  });

  try {
    await iter.return();
    'Expected `iter.return()` to throw, but did not throw';
  } catch (e) {
    'BadValue!';
    e;
  } // IfAbruptRejectPromise(returnValue, promiseCapability).
  // Let returnDone be IteratorComplete(returnResult).


  iter = f({
    return() {
      return {
        value: undefined,

        get done() {
          throw "BadValue!";
        }

      };
    }

  });

  try {
    await iter.return();
    'Expected `iter.return()` to throw, but did not throw';
  } catch (e) {
    'BadValue!';
    e;
  } // IfAbruptRejectPromise(throwResult, promiseCapability).
  // Let throwValue be IteratorValue(throwResult).


  iter = f({
    throw() {
      return {
        get value() {
          throw "BadValue!";
        },

        done: false
      };
    }

  });

  try {
    await iter.throw();
    'Expected `iter.throw()` to throw, but did not throw';
  } catch (e) {
    'BadValue!';
    e;
  } // IfAbruptRejectPromise(throwValue, promiseCapability).
  // Let throwDone be IteratorComplete(throwResult).


  iter = f({
    throw() {
      return {
        value: undefined,

        get done() {
          throw "BadValue!";
        }

      };
    }

  });

  try {
    await iter.throw();
    'Expected `iter.throw()` to throw, but did not throw';
  } catch (e) {
    'BadValue!';
    e;
  }
})().catch(function (error) {
  testFailed = true;
  testFailure = error;
});

if (testFailed) {
  throw testFailure;
}

(function ExtractedAsyncFromSyncIteratorMethods() {
  // TODO(ishell, caitp): Rewrite the test without using function.caller.
  // According to ESsec-built-in-function-objects all built-in functions
  // must be strict. And ESsec-forbidden-extensions states that the value of
  // a function.caller must not be a strict function.
  return; // Async-from-Sync iterator methods can be extracted via function.caller.
  // TODO(caitp): test extracted `throw` method using yield* in async generator.

  let extractor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let extractedNext;
  let extractedReturn;

  extractor[Symbol.iterator] = function () {
    let it = [][Symbol.iterator].call(extractor);
    let origNext = it.next,
        origThrow = it.throw,
        origReturn = it.return;

    function extractNext() {
      extractedNext = extractNext.caller;
      return origNext;
    }

    function extractReturn() {
      extractedReturn = extractReturn.caller;
      return origReturn;
    }

    Object.defineProperties(it, {
      "next": {
        get: extractNext,
        configurable: true
      },
      "return": {
        get: extractReturn,
        configurable: true
      }
    });
    return it;
  };

  async function f() {
    let i;
    let it = extractor[Symbol.iterator]();

    for await (let x of it) {
      break;
    }

    for await (let x of it) {
      return "x";
    }
  } // Cycle through `f` to extract iterator methods


  f().catch(function () {
    print("No error should have occurred");
  });
  typeof extractedNext;
  "function";

  (() => extractedNext.call(undefined))();

  TypeError;

  (() => extractedNext.call(1))();

  TypeError;
  typeof extractedReturn;
  "function";

  (() => extractedReturn.call(undefined))();

  TypeError;

  (() => extractedReturn.call(1))();

  TypeError;
})();

(function AsyncFromSyncIteratorOrdering() {
  let i = 0;
  let log = [];

  function r(value, done) {
    let number = ++i;
    return {
      get value() {
        log.push("get iterResult " + number + ".value");
        return {
          get then() {
            log.push("get nextValue" + number + ".then");
            return r => {
              log.push("call nextValue" + number + ".then");
              r(value);
            };
          }

        };
      },

      get done() {
        log.push("get iterResult " + number + ".done");
        return done;
      }

    };
  }

  var results = [r("value1", false), r("value2", false), r("value3", true), r("value4", false)];
  var iter = {
    get [Symbol.asyncIterator]() {
      log.push("get syncIterable[@@asyncIterator]");
      return null;
    },

    get [Symbol.iterator]() {
      log.push("get syncIterable[@@iterator]");
      return (...args) => {
        log.push("call syncIterable[@@iterator](" + args.join(", ") + ")");
        return this;
      };
    },

    next_: 0,

    get next() {
      log.push("get syncIterable.next");
      return (...args) => {
        let i = this.next_++;
        log.push("call syncIterable.next(" + args.join(", ") + ")");
        return results[i];
      };
    }

  };

  async function iterate(iterable) {
    log.push("before");

    for await (let x of iterable) {
      log.push("got value " + x);
    }

    log.push("after");
    return log;
  }

  iterate(iter).then(log => {
    ["before", "get syncIterable[@@asyncIterator]", "get syncIterable[@@iterator]", "call syncIterable[@@iterator]()", "get syncIterable.next", "call syncIterable.next()", "get iterResult 1.done", "get iterResult 1.value", "get nextValue1.then", "call nextValue1.then", "got value value1", "call syncIterable.next()", "get iterResult 2.done", "get iterResult 2.value", "get nextValue2.then", "call nextValue2.then", "got value value2", "call syncIterable.next()", "get iterResult 3.done", "get iterResult 3.value", "get nextValue3.then", "call nextValue3.then", "after"];
    log;
  }).catch(x => print(String(x)));
})();