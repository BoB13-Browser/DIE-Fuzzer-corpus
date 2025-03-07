// Copyright 2009 the V8 project authors. All rights reserved.
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
// Flags: --no-harmony-regexp-exec
// Regexp shouldn't use String.prototype.slice()
var s = new String("foo");
assertEquals("f", s.slice(0, 1));

String.prototype.slice = function () {
  return "x";
};

assertEquals("x", s.slice(0, 1));
assertEquals(["g"], /g/.exec("gg")); // Regexp shouldn't use String.prototype.charAt()

var f1 = new RegExp("f", "i");
assertEquals(["F"], f1.exec("F"));
assertEquals("f", "foo".charAt(0));

String.prototype.charAt = function (idx) {
  return 'g';
};

assertEquals("g", "foo".charAt(0));
var f2 = new RegExp("[g]", "i");
assertEquals(["G"], f2.exec("G"));
assertTrue(f2.ignoreCase); // On the other hand test is defined in a semi-coherent way as a call to exec.
// 15.10.6.3
// We match other browsers in using the original value of RegExp.prototype.exec.
// I.e., RegExp.prototype.test shouldn't use the current value of
// RegExp.prototype.exec.

RegExp.prototype.exec = function (string) {
  return 'x';
};

assertFalse(/f/.test('x'));