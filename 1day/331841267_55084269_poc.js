var v0 = "1".repeat(32 * 1024 * 1024);

for (var v1 = v0;;) {
  try {
    v1[v1 + 1] = undefined;
    v1 += {
      toString: function () {
        return v0;
      }
    };
  } catch (v2) {}
} //flags: --allow-natives-syntax --shared-string-table --gc-global