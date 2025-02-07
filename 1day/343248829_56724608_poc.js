// If a sample with this instrumentation crashes, it may need the `fuzzilli` function to reproduce the crash.
if (typeof fuzzilli === 'undefined') fuzzilli = function() {};

const Probe = (function() {
    //
    // "Import" the common runtime-assisted mutator code. This will make various utility functions available.
    //
        // Note: runtime instrumentation code must generally assume that any operation performed on any object coming from the "outside", may raise an exception, for example due to triggering a Proxy trap.
    // Further, it must also assume that the environment has been modified arbitrarily. For example, the Array.prototype[@@iterator] may have been set to an invalid value, so using `for...of` syntax could trigger an exception.

    // Load all necessary routines and objects into local variables as they may be overwritten by the program.
    // We generally want to avoid triggerring observable side-effects, such as storing or loading
    // properties. For that reason, we prefer to use builtins like Object.defineProperty.

    const ProxyConstructor = Proxy;
    const BigIntConstructor = BigInt;
    const SetConstructor = Set;

    const ObjectPrototype = Object.prototype;

    const getOwnPropertyNames = Object.getOwnPropertyNames;
    const getPrototypeOf = Object.getPrototypeOf;
    const setPrototypeOf = Object.setPrototypeOf;
    const stringify = JSON.stringify;
    const hasOwnProperty = Object.hasOwn;
    const defineProperty = Object.defineProperty;
    const propertyValues = Object.values;
    const parseInteger = parseInt;
    const NumberIsInteger = Number.isInteger;
    const isNaN = Number.isNaN;
    const isFinite = Number.isFinite;
    const truncate = Math.trunc;
    const apply = Reflect.apply;
    const construct = Reflect.construct;
    const ReflectGet = Reflect.get;
    const ReflectSet = Reflect.set;
    const ReflectHas = Reflect.has;

    // Bind methods to local variables. These all expect the 'this' object as first parameter.
    const concat = Function.prototype.call.bind(Array.prototype.concat);
    const findIndex = Function.prototype.call.bind(Array.prototype.findIndex);
    const includes = Function.prototype.call.bind(Array.prototype.includes);
    const shift = Function.prototype.call.bind(Array.prototype.shift);
    const pop = Function.prototype.call.bind(Array.prototype.pop);
    const push = Function.prototype.call.bind(Array.prototype.push);
    const filter = Function.prototype.call.bind(Array.prototype.filter);
    const execRegExp = Function.prototype.call.bind(RegExp.prototype.exec);
    const stringSlice = Function.prototype.call.bind(String.prototype.slice);
    const toUpperCase = Function.prototype.call.bind(String.prototype.toUpperCase);
    const numberToString = Function.prototype.call.bind(Number.prototype.toString);
    const bigintToString = Function.prototype.call.bind(BigInt.prototype.toString);
    const stringStartsWith = Function.prototype.call.bind(String.prototype.startsWith);
    const setAdd = Function.prototype.call.bind(Set.prototype.add);
    const setHas = Function.prototype.call.bind(Set.prototype.has);

    const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

    // Simple, seedable PRNG based on a LCG.
    class RNG {
        m = 2 ** 32;
        a = 1664525;
        c = 1013904223;
        x;

        constructor(seed) {
            this.x = seed;
        }
        randomInt() {
            this.x = (this.x * this.a + this.c) % this.m;
            if (!isInteger(this.x)) throw "RNG state is not an Integer!"
            return this.x;
        }
        randomFloat() {
            return this.randomInt() / this.m;
        }
        probability(p) {
            return this.randomFloat() < p;
        }
        reseed(seed) {
            this.x = seed;
        }
    }

    // When creating empty arrays to which elements are later added, use a custom array type that has a null prototype. This way, the arrays are not
    // affected by changes to the Array.prototype that could interfere with array builtins (e.g. indexed setters or a modified .constructor property).
    function EmptyArray() {
        let array = [];
        setPrototypeOf(array, null);
        return array;
    }

    //
    // Misc. helper functions.
    //
    // Type check helpers. These are less error-prone than manually using typeof and comparing against a string.
    function isObject(v) {
        return typeof v === 'object';
    }
    function isFunction(v) {
        return typeof v === 'function';
    }
    function isString(v) {
        return typeof v === 'string';
    }
    function isNumber(v) {
        return typeof v === 'number';
    }
    function isBigint(v) {
        return typeof v === 'bigint';
    }
    function isSymbol(v) {
        return typeof v === 'symbol';
    }
    function isBoolean(v) {
        return typeof v === 'boolean';
    }
    function isUndefined(v) {
        return typeof v === 'undefined';
    }

    // Helper function to determine if a value is an integer, and within [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER].
    function isInteger(n) {
        return isNumber(n) && NumberIsInteger(n) && n>= MIN_SAFE_INTEGER && n <= MAX_SAFE_INTEGER;
    }

    // Helper function to determine if a string is "simple". We only include simple strings for property/method names or string literals.
    // A simple string is basically a valid, property name with a maximum length.
    const simpleStringRegExp = /^[0-9a-zA-Z_$]+$/;
    function isSimpleString(s) {
        if (!isString(s)) throw "Non-string argument to isSimpleString: " + s;
        return s.length < 50 && execRegExp(simpleStringRegExp, s) !== null;
    }

    // Helper function to determine if a string is numeric and its numeric value representable as an integer.
    function isNumericString(s) {
        if (!isString(s)) return false;
        let number = parseInteger(s);
        return number >= MIN_SAFE_INTEGER && number <= MAX_SAFE_INTEGER && numberToString(number) === s;
    }

    // Helper function to determine whether a property can be accessed without raising an exception.
    function tryAccessProperty(prop, obj) {
        try {
            obj[prop];
            return true;
        } catch (e) {
            return false;
        }
    }

    // Helper function to determine if a property exists on an object or one of its prototypes. If an exception is raised, false is returned.
    function tryHasProperty(prop, obj) {
        try {
            return prop in obj;
        } catch (e) {
            return false;
        }
    }

    // Helper function to load a property from an object. If an exception is raised, undefined is returned.
    function tryGetProperty(prop, obj) {
        try {
            return obj[prop];
        } catch (e) {
            return undefined;
        }
    }

    // Helper function to obtain the own properties of an object. If that raises an exception (e.g. on a Proxy object), an empty array is returned.
    function tryGetOwnPropertyNames(obj) {
        try {
            return getOwnPropertyNames(obj);
        } catch (e) {
            return new Array();
        }
    }

    // Helper function to fetch the prototype of an object. If that raises an exception (e.g. on a Proxy object), null is returned.
    function tryGetPrototypeOf(obj) {
        try {
            return getPrototypeOf(obj);
        } catch (e) {
            return null;
        }
    }

    // Helper function to that creates a wrapper function for the given function which will call it in a try-catch and return false on exception.
    function wrapInTryCatch(f) {
        return function() {
            try {
                return apply(f, this, arguments);
            } catch (e) {
                return false;
            }
        };
    }

    //
    // Basic random number generation utility functions.
    //

    // Initially the rng is seeded randomly, specific mutators can reseed() the rng if they need deterministic behavior.
    // See the explore operation in JsOperations.swift for an example.
    let rng = new RNG(truncate(Math.random() * 2**32));

    function probability(p) {
        if (p < 0 || p > 1) throw "Argument to probability must be a number between zero and one";
        return rng.probability(p);
    }

    function randomIntBetween(start, end) {
        if (!isInteger(start) || !isInteger(end)) throw "Arguments to randomIntBetween must be integers";
        return (rng.randomInt() % (end - start)) + start;
    }

    function randomFloat() {
        return rng.randomFloat();
    }

    function randomBigintBetween(start, end) {
        if (!isBigint(start) || !isBigint(end)) throw "Arguments to randomBigintBetween must be bigints";
        if (!isInteger(Number(start)) || !isInteger(Number(end))) throw "Arguments to randomBigintBetween must be representable as regular intergers";
        return BigIntConstructor(randomIntBetween(Number(start), Number(end)));
    }

    function randomIntBelow(n) {
        if (!isInteger(n)) throw "Argument to randomIntBelow must be an integer";
        return rng.randomInt() % n;
    }

    function randomElement(array) {
        return array[randomIntBelow(array.length)];
    }

    // Action constants.
    const PROPERTY_LOAD = "loads";
    const PROPERTY_STORE = "stores";

    // Property access outcomes.
    const PROPERTY_NOT_FOUND = 0;
    const PROPERTY_FOUND = 1;

    //
    // Result recording and reporting.
    //
    let results = { __proto__: null };

    function reportError(msg) {
        fuzzilli('FUZZILLI_PRINT', 'PROBING_ERROR: ' + msg);
    }

    function reportResults() {
        fuzzilli('FUZZILLI_PRINT', 'PROBING_RESULTS: ' + stringify(results));
    }

    // Record a property action performed on a probe.
    // |target| is expected to be the original prototype of the probe object. It is used to determine whether the accessed property exists anywhere in the prototype chain of the probe.
    function recordAction(action, id, target, key) {
        let outcome = PROPERTY_NOT_FOUND;
        if (ReflectHas(target, key)) {
            outcome = PROPERTY_FOUND;
        }

        let keyString = key;
        if (typeof keyString !== 'string') {
            try {
                keyString = key.toString();
                if (typeof keyString !== 'string') throw 'not a string';
            } catch(e) {
                // Got some "weird" property key. Ignore it.
                return;
            }
        }

        if (!isSimpleString(keyString) && !isNumericString(keyString) && !isSymbol(key)) {
            // Cannot deal with this property name. Ignore it.
            return;
        }

        if (isSymbol(key) && !stringStartsWith(keyString, 'Symbol(Symbol.')) {
            // We can only deal with well-known symbols (e.g. "Symbol(Symbol.toPrimitive)"), and this isn't one. Ignore it.
            return;
        }

        if (!hasOwnProperty(results, id)) {
            results[id] = { [PROPERTY_LOAD]: { __proto__: null }, [PROPERTY_STORE]: { __proto__: null } };
        }

        // If the same action is performed on the same probe multiple times, we keep the last result.
        results[id][action][keyString] = outcome;
    }

    function recordActionWithErrorHandling(action, id, target, key) {
        try {
            recordAction(action, id, target, key);
        } catch(e) {
            reportError(e);
        }
    }

    //
    // Probe implementation.
    //
    function probe(id, value) {
        let originalPrototype, newPrototype;
        let handler = {
            get(target, key, receiver) {
                // Special logic to deal with programs that fetch the prototype of an object after it was turned into a probe.
                // In that case, the probe Proxy would leak to the script, potentially causing incorrect behaviour. To deal with that,
                // we (1) return the original prototype when __proto__ is loaded (but this can be "bypassed" through Object.getPrototypeOf)
                // and (2) attempt to detect property accesses on the prototype itself (instead of on the probe) and handle those separately.
                if (key === '__proto__' && receiver === value) return originalPrototype;
                if (receiver === newPrototype) return ReflectGet(target, key);
                recordActionWithErrorHandling(PROPERTY_LOAD, id, target, key);
                return ReflectGet(target, key, receiver);
            },
            set(target, key, value, receiver) {
                if (receiver === newPrototype) return ReflectSet(target, key, value);
                recordActionWithErrorHandling(PROPERTY_STORE, id, target, key);
                return ReflectSet(target, key, value, receiver);
            },
            has(target, key) {
                // Treat this as a load.
                recordActionWithErrorHandling(PROPERTY_LOAD, id, target, key);
                return ReflectHas(target, key);
            },
        };

        try {
            // This can fail, e.g. due to "Cannot convert undefined or null to object" or if the object is non-extensible. In that case, do nothing.
            originalPrototype = getPrototypeOf(value);
            newPrototype = new ProxyConstructor(originalPrototype, handler);
            setPrototypeOf(value, newPrototype);
        } catch (e) {}
    }

    function probeWithErrorHandling(id, value) {
        try {
            probe(id, value);
        } catch(e) {
            reportError(e);
        }
    }

    return {
        probe: probeWithErrorHandling,
        reportResults: reportResults
    };
})();

function f0() {
    const o13 = {
        "a": 2.220446049250313e-16,
        ["object"](a5) {
            Probe.probe("v5", a5);
            let v6 = 0;
            Probe.probe("v6", v6);
            while ((() => {
                    const v8 = v6 < 8;
                    Probe.probe("v8", v8);
                    return v8;
                })()) {
                const v9 = super[-61915];
                Probe.probe("v9", v9);
                let v10;
                try { v10 = new v9(a5, v9, -61915, v9, 2.220446049250313e-16, v9); } catch (e) {}
                Probe.probe("v10", v10);
                try { v10.valueOf(this, v10, v10, v10, this); } catch (e) {}
                v6++;
            }
            return v6;
        },
        "d": "object",
    };
    Probe.probe("v13", o13);
    return o13;
}
const v14 = f0();
const v15 = f0();
Probe.probe("v15", v15);
const v16 = f0();
function f17(a18, a19) {
    const o34 = {
        ...v14,
        "f": v14,
        get a() {
            let v21 = isNaN;
            v21 ^= v21;
            Probe.probe("v22", 7);
            new Float64Array(7);
            const v26 = /\P{sc=Greek}/imy.constructor;
            Probe.probe("v26", v26);
            v26.$1;
            Probe.probe("v28", 6);
            Probe.probe("v29", Int8Array);
            new Int8Array(6);
            Probe.probe("v32", Float64Array);
            new Float64Array(64);
            return f0;
        },
    };
    Probe.probe("v34", o34);
    return o34;
}
Probe.probe("v17", f17);
const v35 = f17(v15, v14);
const v36 = f17(v14, v14);
Probe.probe("v36", v36);
const v37 = f17(v15, v14);
Probe.probe("v37", v37);
function f38(a39, a40, a41) {
    Probe.probe("v41", a41);
    const o42 = {
        ...v14,
        [a39]: a39,
        "c": v14,
        "a": a40,
        "e": a40,
        "g": v14,
        16: a39,
        "f": a39,
        [a40]: v36,
        "h": v37,
        ...v16,
        10: a41,
        "d": f0,
        ...a39,
        "b": a40,
    };
    Probe.probe("v42", o42);
    return o42;
}
const v43 = f38(v15, f0, v15);
Probe.probe("v43", v43);
const v44 = f38(v35, v16, v16);
const v45 = f38(v43, v36, v15);
const v46 = [0.13913038649019382,4.0,0.0,-1.5032043802949106e+308,0.22097282332397616,-0.0,0.12382423900706951,-887.4922395207259,2.220446049250313e-16];
const o47 = {
};
Probe.probe("v47", o47);
const v49 = new Proxy(v46, o47);
Probe.probe("v49", v49);
Object.freeze(v49);
function f52() {
    return v44;
}
Probe.probe("v52", f52);
[f52,v45,v15,f0];
[v45,f38,f0,v35];
[f52];
Probe.probe("v57", Reflect);
Reflect.isExtensible(Set);
Probe.reportResults();

// CRASH INFO
// ==========
// TERMSIG: 5
// STDERR:
// #
// # Fatal error in ../../src/ic/ic.cc, line 3474
// # Debug check failed: CanFastCloneObjectWithDifferentMaps( source_map, handle(*maybe_target, isolate), false, isolate).
// #
// #
// #
// #FailureMessage Object: 0x7ffcad8e4260
// ==== C stack trace ===============================
// 
//     ../v8/out/fuzzbuild/d8(+0x9028c2) [0x5601320248c2]
//     ../v8/out/fuzzbuild/d8(+0x901397) [0x560132023397]
//     ../v8/out/fuzzbuild/d8(+0x8f3eba) [0x560132015eba]
//     ../v8/out/fuzzbuild/d8(+0x8f3795) [0x560132015795]
//     ../v8/out/fuzzbuild/d8(+0x16931e5) [0x560132db51e5]
//     ../v8/out/fuzzbuild/d8(+0x1688cd3) [0x560132daacd3]
//     ../v8/out/fuzzbuild/d8(+0x1688102) [0x560132daa102]
//     ../v8/out/fuzzbuild/d8(+0x3ea4c36) [0x5601355c6c36]
// STDOUT:
// 
// FUZZER ARGS: .build/x86_64-unknown-linux-gnu/release/FuzzilliCli --jobs=100 --profile=v8 ../v8/out/fuzzbuild/d8 --storagePath=Target/v8/out2
// TARGET ARGS: ../v8/out/fuzzbuild/d8 --expose-gc --omit-quit --allow-natives-syntax --fuzzing --jit-fuzzing --future --harmony --js-staging
// CONTRIBUTORS: 
// EXECUTION TIME: 830ms
