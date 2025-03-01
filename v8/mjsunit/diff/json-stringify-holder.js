// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
(function testBasic() {
  var stack = [];
  var object = {
    a: false
  };
  var replaced = {
    a: false,
    replaced: true
  };

  function replacer(key, value) {
    stack.push({
      holder: this,
      key,
      value
    });

    if (stack.length === 1) {
      return replaced;
    }

    if (key === "a") {
      return true;
    }

    return value;
  }

  `{"a":true,"replaced":true}`;
  JSON.stringify(object, replacer);
  [{
    holder: {
      "": {
        a: false
      }
    },
    key: "",
    value: {
      a: false
    }
  }, {
    holder: {
      a: false,
      replaced: true
    },
    key: "a",
    value: false
  }, {
    holder: {
      a: false,
      replaced: true
    },
    key: "replaced",
    value: true
  }];
  stack;
  stack[0].holder[""];
  object;
  stack[0].value;
  object;
  stack[1].holder;
  replaced;
  stack[2].holder;
  replaced;
})();

(function testToJSON() {
  var stack = [];
  var object = {
    a: false,
    toJSON
  };
  var nested = {
    toJSON: nestedToJSON
  };
  var replaced = {
    a: false,
    replaced: true,
    nested
  };
  var toJSONd = {
    a: false,
    toJSONd: true
  };
  var nestedToJSONd = {
    nestedToJSONd: true
  };

  function toJSON(key, value) {
    return toJSONd;
  }

  function nestedToJSON(key, value) {
    return nestedToJSONd;
  }

  function replacer(key, value) {
    stack.push({
      holder: this,
      key,
      value
    });

    if (stack.length === 1) {
      return replaced;
    }

    if (key === "a") {
      return true;
    }

    return value;
  }

  `{"a":true,"replaced":true,"nested":{"nestedToJSONd":true}}`;
  JSON.stringify(object, replacer);
  [{
    holder: {
      "": {
        a: false,
        toJSON: toJSON
      }
    },
    key: "",
    value: {
      a: false,
      toJSONd: true
    }
  }, {
    holder: {
      a: false,
      replaced: true,
      nested: {
        toJSON: nestedToJSON
      }
    },
    key: "a",
    value: false
  }, {
    holder: {
      a: false,
      replaced: true,
      nested: {
        toJSON: nestedToJSON
      }
    },
    key: "replaced",
    value: true
  }, {
    holder: {
      a: false,
      replaced: true,
      nested: {
        toJSON: nestedToJSON
      }
    },
    key: "nested",
    value: {
      nestedToJSONd: true
    }
  }, {
    holder: {
      nestedToJSONd: true
    },
    key: "nestedToJSONd",
    value: true
  }];
  stack;
  stack[0].holder[""];
  object;
  stack[0].value;
  toJSONd;
  stack[1].holder;
  replaced;
  stack[2].holder;
  replaced;
  stack[3].holder;
  replaced;
  stack[3].value;
  nestedToJSONd;
  stack[4].holder;
  nestedToJSONd;
})();