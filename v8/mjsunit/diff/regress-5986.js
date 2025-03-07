// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var array = [1.7, 1.7, 1.7];
var mutator = {
  [Symbol.toPrimitive]() {
    Object.defineProperties(array, {
      0: {
        get() {
          ;
        }

      },
      1: {
        get() {
          ;
        }

      },
      2: {
        get() {
          ;
        }

      }
    });
    return 0;
  }

};
array.includes(undefined, mutator);

function search(array, searchElement, startIndex) {
  return array.includes(searchElement, startIndex);
}

array = [1.7, 1.7, 1.7];
var not_mutator = {
  [Symbol.toPrimitive]() {
    return 0;
  }

};
search(array, undefined, not_mutator);
search(array, undefined, not_mutator);
search(array, undefined, mutator);