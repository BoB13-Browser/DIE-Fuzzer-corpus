// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function f1() {
  const x = [,];
  x[1] = 42;
  [undefined, 42];
  x;
}

f1();
f1();
f1();
f1();

function f2() {
  const x = [0];

  for (const y of [1, 2, 3, 4]) {
    x[x.length] = y;
  }

  [0, 1, 2, 3, 4];
  x;
}

f2();
f2();
f2();
f2();

function f3() {
  const x = [0];

  for (const y of [1.1, {}]) {
    x[x.length] = y;
  }

  [0, 1.1, {}];
  x;
}

f3();
f3();
f3();
f3();

function f4(x) {
  x[x.length] = x.length;
}

let x1 = [];
f4(x1);
[0];
x1;
f4(x1);
[0, 1];
x1;
f4(x1);
[0, 1, 2];
x1;
f4(x1);
[0, 1, 2, 3];
x1;
let x2 = {
  length: 42
};
f4(x2);
42;
x2[42];
f4(x2);
42;
x2[42];
f4(x2);
42;
x2[42];
f4(x2);
42;
x2[42];