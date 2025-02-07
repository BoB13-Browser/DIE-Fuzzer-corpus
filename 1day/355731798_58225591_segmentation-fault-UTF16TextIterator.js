function begin() {
  let var_1 = document.getElementById("id_1");
  let var_2 = document.getElementById("id_2");
  let var_3 = document.getElementById("id_3");
  let var_4 = document.getElementById("id_4");
  let var_5 = document.getElementById("id_6");
  let var_6 = document.getElementById("id_7");
  var_4.replaceWith(var_5);
  let var_7 = document.createElement("any_html");
  document.body.appendChild(var_7);
  var_7.hidden = true;
  var_7.innerHTML = var_3.outerHTML;
  var_2.append(var_6, var_1);
  var_1.innerText = var_7.innerText;
}