// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
x = "a";

function test_varargs(...args) {
  var sum = this.x;

  for (i in args) {
    sum += "," + args[i];
  }

  return sum;
}

"a";
test_varargs();
"a,b";
test_varargs("b");
"a,b,c";
test_varargs("b", "c");
"a,b,c,d";
test_varargs("b", "c", "d");
"a,b,c,d,e";
test_varargs("b", "c", "d", "e");

function forward_varargs(...args) {
  return test_varargs(...args);
}

"a";
forward_varargs();
"a,b";
forward_varargs("b");
"a,b,c";
forward_varargs("b", "c");
"a,b,c,d";
forward_varargs("b", "c", "d");
"a,b,c,d,e";
forward_varargs("b", "c", "d", "e");

function forward_varargs_one_arg(x, ...args) {
  return test_varargs(x, ...args);
}

"a,undefined";
forward_varargs_one_arg();
"a,b";
forward_varargs_one_arg("b");
"a,b,c";
forward_varargs_one_arg("b", "c");
"a,b,c,d";
forward_varargs_one_arg("b", "c", "d");
"a,b,c,d,e";
forward_varargs_one_arg("b", "c", "d", "e");

function forward_varargs_two_args(x, y, ...args) {
  return test_varargs(x, y, ...args);
}

"a,undefined,undefined";
forward_varargs_two_args();
"a,b,undefined";
forward_varargs_two_args("b");
"a,b,c";
forward_varargs_two_args("b", "c");
"a,b,c,d";
forward_varargs_two_args("b", "c", "d");
"a,b,c,d,e";
forward_varargs_two_args("b", "c", "d", "e");