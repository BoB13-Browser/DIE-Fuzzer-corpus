'use strict';

(function () {
  var poppedElement;

  function executeAction(action) {
    function performAction() {
      poppedElement = Array.prototype.pop.call(dataArray);
    }

    var tempValue = dataArray[0];
    return Reflect.construct(performAction, arguments, action);
  }

  var dataArray = new Array(0, 0, 0, 0, 0);

  for (var i = 0; i < 20000; i++) {
    executeAction(function () {});
    dataArray.push(0);
  } // Define a handler function that modifies dataArray[4]


  function handleAction() {
    return dataArray[4] = 1.1, Object.prototype;
  }

  executeAction(handleAction);
  print(poppedElement);
})();