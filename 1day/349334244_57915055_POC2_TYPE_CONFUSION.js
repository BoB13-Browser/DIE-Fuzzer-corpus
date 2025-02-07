'use strict';

(function () {
  var popped;

  function trigger(new_target) {
    function inner(new_target) {
      function constructor() {
        popped = Array.prototype.pop.call(array);
      }

      var temp = array[0];
      return Reflect.construct(constructor, arguments, new_target);
    }

    inner(new_target);
  }

  var array = new Array(0, 0, 0, 0, 0);

  for (var i = 0; i < 20000; i++) {
    trigger(function () {});
    array.push(0);
  }

  var proxy = new Proxy(Object, {
    get: () => (array[4] = 1.1, Object.prototype)
  });
  trigger(proxy);
  print(popped);
})();