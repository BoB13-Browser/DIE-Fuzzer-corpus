// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Environment Variables: LC_ALL=pt-BR.UTF8
// The data files packaged with d8 currently have Brazillian Portuguese
// DateTimeFormat but not Collation
if (this.Intl) {
  'pt';
  Intl.Collator().resolvedOptions().locale;
  'pt-BR';
  Intl.DateTimeFormat().resolvedOptions().locale;
}