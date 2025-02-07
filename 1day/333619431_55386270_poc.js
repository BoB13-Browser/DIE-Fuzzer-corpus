var count = 0;
var inpt = document.getElementById("inpt");
var style = window.getComputedStyle(inpt);
inpt.style.visibility = "hidden";

function tap() {
  if (count == 3 && style.visibility == 'hidden') {
    inpt.click();
    inpt.focus();
    inpt.style.visibility = "visible";
  } else if (count == 6) {
    count = 0;
    inpt.click();
    inpt.focus();
    inpt.style.visibility = "hidden";
  }

  count++;
}