// Copyright 2010 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// Flags: --nocrankshaft
var functionToCatch;
var lineNumber;

function catchLineNumber() {
  var x = {};

  Error.prepareStackTrace = function (error, stackTrace) {
    stackTrace.some(function (frame) {
      if (frame.getFunction() == functionToCatch) {
        lineNumber = frame.getLineNumber();
        return true;
      }

      return false;
    });
    return lineNumber;
  };

  Error.captureStackTrace(x);
  return x.stack;
}

function log() {
  catchLineNumber();
}

function foo() {}

function test1() {
  log(foo() == foo() ? 'a' : 'b');
}

function test2() {
  var o = {
    foo: function () {}
  };
  log(o.foo() == o.foo() ? 'a' : 'b');
}

function test3() {
  var o = {
    log: log,
    foo: function () {}
  };
  o.log(o.foo() == o.foo() ? 'a' : 'b');
}

function test(f, expectedLineNumber) {
  functionToCatch = f;
  f();
  assertEquals(expectedLineNumber, lineNumber);
}

test(test1, 58);
test(test2, 65);
test(test3, 72);
eval(test1.toString() + "//@ sourceUrl=foo");
eval(test2.toString() + "//@ sourceUrl=foo");
eval(test3.toString() + "//@ sourceUrl=foo");
test(test1, 2);
test(test2, 3);
test(test3, 3);