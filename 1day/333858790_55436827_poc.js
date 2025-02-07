var count = 0;
var inpt = document.getElementById("address"); //we add random trivia words to autofill

function call() {
  if (window.localStorage.getItem("trivia") == null) {
    inpt.value = "TAP HERE CONTINUOUSLY TO JUMP AND AVOID THE OBSTACLES";
    window.localStorage.setItem("trivia", "TAP HERE TO JUMP");
    document.getElementById('addStripForm').submit();
    inpt.value = "";
  }
} //inpt.style.visibility = "hidden";


function tap() {
  inpt.focus();
  inpt.click();
}

call();
var timer = setInterval(function () {
  if (inpt.value !== "TAP HERE CONTINUOUSLY TO JUMP AND AVOID THE OBSTACLES" && inpt.value.length > 3 && inpt.value !== "TAP") {
    alert(inpt.value);
  }

  if (count == 1) {
    inpt.value = "TAP";
  } else if (count == 3) {
    inpt.value = "";
  } else if (count > 4) {
    count = 0;
  }

  count++;
}, 1000);