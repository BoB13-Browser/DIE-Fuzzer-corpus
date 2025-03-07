// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --harmony-dynamic-import
// Resources: test/mjsunit/regress/modules-skip-regress-797581-1.js
// Resources: test/mjsunit/regress/modules-skip-regress-797581-2.js
// Resources: test/mjsunit/regress/modules-skip-regress-797581-3.js
// Resources: test/mjsunit/regress/modules-skip-regress-797581-4.js
// Resources: test/mjsunit/regress/modules-skip-regress-797581-5.js
function TryToLoadModule(filename, expect_error, token) {
  let caught_error;

  function SetError(e) {
    caught_error = e;
  }

  import(filename).catch(SetError);

  if (expect_error) {
    caught_error instanceof SyntaxError;
    "Unexpected token " + token;
    caught_error.message;
  } else {
    undefined;
    caught_error;
  }
}

TryToLoadModule("modules-skip-regress-797581-1.js", true, ")");
TryToLoadModule("modules-skip-regress-797581-2.js", true, ")");
TryToLoadModule("modules-skip-regress-797581-3.js", true, "...");
TryToLoadModule("modules-skip-regress-797581-4.js", true, ",");
TryToLoadModule("modules-skip-regress-797581-5.js", false);