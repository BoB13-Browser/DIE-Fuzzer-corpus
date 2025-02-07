function trigger() {
  let var_1 = document.getElementById("id_1");
  let var_2 = document.createElement("datalist");
  document.body.appendChild(var_2);
  var_1.replaceWith(var_2);
  var_2.outerHTML = `
                    
                    <ruby></ruby>
                    <ruby id="id_2"><table></ruby>
                    <table dir="rtl" contextmenu="id_7" tabindex="0"></table>
                    <table></table>

                `;
}