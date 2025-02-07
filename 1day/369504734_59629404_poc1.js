function emptyFunction(...args) {// This function does nothing
}

var obj = new Number(1);
Function("this.touched= true;").call(obj);
emptyFunction(obj.touched, 'The value of obj.touched is expected to be true');
var fusion = obj;

function emptyFunction(...args) {// This function does nothing
}

var rejectFunction;
new Promise(function (resolve, reject) {
  rejectFunction = reject;
});
emptyFunction(rejectFunction, "name", {
  value: "",
  writable: false,
  enumerable: false,
  configurable: true
});