const v0 = [1.0, 4.652903028717999];
const v1 = [4.0, 916.1366110499146, 0.8144131984722004, 2.220446049250313e-16, 0.053701689215099324];
const v2 = [-1.7976931348623157e+308];

function F3(a5, a6) {
  if (!new.target) {
    throw 'must be called with new';
  }
}

const v7 = new F3();
const v8 = new F3(v0, v1);
v7 | v8;
let v10 = [-2.220446049250313e-16, 1000000.0, 0.3600347187276072, 2.220446049250313e-16, -1e-15, -3.686043902096414, NaN, 0.2564591559125954, -1000.0];

function f11() {
  for (let i13 = 0; (() => {
    v10 *= v2;
    const v15 = i13 < 10000;
    f11();
    return v15;
  })();) {}
}

f11(); //  --allow-natives-syntax --const-tracking-let --always-turbofan