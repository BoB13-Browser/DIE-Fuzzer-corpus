// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --expose-wasm --expose-gc --allow-natives-syntax
load("test/mjsunit/wasm/wasm-constants.js");
load("test/mjsunit/wasm/wasm-module-builder.js");

function assertTraps(code, msg) {
  var threwException = true;

  try {
    if (typeof code === 'function') {
      code();
    } else {
      eval(code);
    }

    threwException = false;
  } catch (e) {
    if (typeof type_opt === 'function') {
      assertInstanceof(e, type_opt);
    }

    if (arguments.length >= 3) {
      assertEquals(e.type, cause_opt);
    } // Success.


    return;
  }

  throw new MjsUnitAssertionError("Did not throw exception");
}

function makeBinop(opcode) {
  var builder = new WasmModuleBuilder();
  builder.addFunction("main", kSig_i_ii).addBody([kExprGetLocal, 0, // --
  kExprGetLocal, 1, // --
  opcode]).exportFunc();
  return builder.instantiate().exports.main;
}

var divs = makeBinop(kExprI32DivS);
var divu = makeBinop(kExprI32DivU);
assertEquals(33, divs(333, 10));
assertEquals(-33, divs(-336, 10));
assertEquals(44, divu(445, 10));
assertEquals(429496685, divu(-446, 10));
assertTraps(kTrapDivByZero, "divs(100, 0);");
assertTraps(kTrapDivByZero, "divs(-1009, 0);");
assertTraps(kTrapDivByZero, "divu(200, 0);");
assertTraps(kTrapDivByZero, "divu(-2009, 0);");
assertTraps(kTrapDivUnrepresentable, "divs(0x80000000, -1)");
assertEquals(0, divu(0x80000000, -1));
var rems = makeBinop(kExprI32RemS);
var remu = makeBinop(kExprI32RemU);
assertEquals(3, rems(333, 10));
assertEquals(-6, rems(-336, 10));
assertEquals(5, remu(445, 10));
assertEquals(3, remu(-443, 10));
assertTraps(kTrapRemByZero, "rems(100, 0);");
assertTraps(kTrapRemByZero, "rems(-1009, 0);");
assertTraps(kTrapRemByZero, "remu(200, 0);");
assertTraps(kTrapRemByZero, "remu(-2009, 0);");
assertEquals(-2147483648, remu(0x80000000, -1));
assertEquals(0, rems(0x80000000, -1));