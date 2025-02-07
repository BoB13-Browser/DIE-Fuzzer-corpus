function trigger() {
  var var_1 = document.getElementById("id_2");
  var var_2 = document.getElementById("id_4");
  var var_3 = document.getElementById("id_5");
  var var_4 = document.createElement("embed");
  document.body.appendChild(var_4);
  var var_5 = document.createElement("rt");
  document.body.appendChild(var_5);
  var var_4 = document.createElement("a");
  document.body.appendChild(var_4);
  var_1.replaceWith(var_4);
  var_2.append(var_3, var_5);
  var_1.replaceWith(var_4);
}