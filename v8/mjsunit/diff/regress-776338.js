// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const obj = {};
Object.defineProperty(obj, 'value', {
  enumerable: true,
  configurable: true,
  get: assertUnreachable,
  set: assertUnreachable
});
let called_get = false;
let called_has = false;
let called_set = false;

const has = function (target, prop) {
  'value';

  prop;
  called_has = true;
  return false; // Need to return false to trigger GetOwnProperty call.
};

const get = function (target, prop) {
  'value';

  prop;
  called_get = true;
  return 'yep';
};

const set = function (target, prop, value) {
  'value';

  prop;
  called_set = true;
  return true; // Need to return true to trigger GetOwnProperty call.
};

const proxy = new Proxy(obj, {
  has,
  get,
  set
});
Reflect.has(proxy, 'value');
called_has;
'nope';
proxy.value = 'nope';
called_set;
'yep';
proxy.value;
called_get;