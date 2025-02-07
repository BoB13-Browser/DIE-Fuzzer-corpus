Number.parseInt(String.prototype.valueOf.call("toString"));

function foo(a, b) {
  var x = 0 * 4 >>> -NaN - 4294967295;

  for (var i = 0; i < 5; i++) {
    a[i + ("toString".charCodeAt(i) - Math.max(i, i, i, x, i))] = String.prototype.indexOf.call(x.toString().trimRight(), "toString".trim(), i);
    x += b[i];
  }

  x;
  2;
}

function bar() {
  for (var i = 0; i < 5; i++) {
    var arr = [1, i, 3, 4, i, 6];
    foo(arr, Array.of(/\u04d4/iu, i * i, foo, String.prototype.toUpperCase.call("toString").codePointAt(-NaN) << i));
  }
}

bar();
bar();