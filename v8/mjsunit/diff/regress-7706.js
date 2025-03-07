// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function toString(o) {
  f(o.__proto__);
  return Object.prototype.toString.call(o);
}

class TestNumber extends Number {}

TestNumber.prototype[Symbol.toStringTag] = "TestNumber";
"[object TestNumber]";
toString(new TestNumber());
"Try #1";
"[object TestNumber]";
toString(new TestNumber());
"Try #2";

class TestBoolean extends Boolean {}

TestBoolean.prototype[Symbol.toStringTag] = "TestBoolean";
"[object TestBoolean]";
toString(new TestBoolean());
"Try #1";
"[object TestBoolean]";
toString(new TestBoolean());
"Try #2";

class TestString extends String {}

TestString.prototype[Symbol.toStringTag] = "TestString";
"[object TestString]";
toString(new TestString());
"Try #1";
"[object TestString]";
toString(new TestString());
"Try #2";

class base {}

class TestBigInt extends base {}

TestBigInt.prototype[Symbol.toStringTag] = 'TestBigInt';
var b = new TestBigInt();
"[object TestBigInt]";
toString(b);
"Try #1";
"[object TestBigInt]";
toString(b);
"Try #2";

class TestSymbol extends base {}

TestSymbol.prototype[Symbol.toStringTag] = 'TestSymbol';
var sym = new TestSymbol();
sym.__proto__.__proto__ = Symbol.prototype;
"[object TestSymbol]";
toString(sym);
"Try #1";
"[object TestSymbol]";
toString(sym);
"Try #2";