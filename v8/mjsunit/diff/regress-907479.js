// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

{
  const x = [42];
  x.splice(0, 0, 23);
  [23, 42];
  x;
  x.length++;
  [23, 42,,];
  x;
  x.hasOwnProperty(2);
}
{
  const x = [4.2];
  x.splice(0, 0, 23);
  [23, 4.2];
  x;
  x.length++;
  [23, 4.2,,];
  x;
  x.hasOwnProperty(2);
}