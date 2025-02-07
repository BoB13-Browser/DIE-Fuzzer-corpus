function func() {
  var a = /hello world/;
  var b = /World/;
  a.lastIndex = b;
}

for (var i = 0; i < 1e6; ++i) {
  func();
  func();
} // flags: --stress-compaction