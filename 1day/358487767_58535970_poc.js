function dummy_main() {
  var arrayBuffer = new ArrayBuffer(8);
  var floatArray = new Float32Array(arrayBuffer);
  var floatArray2 = new Float32Array(1);

  function setBit(obj, bitCount, value, isDouble) {
    var currentBit = 1 << 31;
    var current = 0;

    for (var i = 0; i < bitCount; i++) {
      currentBit = 1 << 31 - i;
      current = current | currentBit;
    }
  }

  function testOneNan(typedArray, backup, isDouble) {
    for (var j = 12; j < 20; j++) {
      setBit(typedArray, j, 1, isDouble);
    }
  }

  testOneNan(floatArray, floatArray2, false);
}

dummy_main(); //flags: --jit-fuzzing