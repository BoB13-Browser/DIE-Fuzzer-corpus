var count = 0;
var email = document.getElementById("street");
var title = document.getElementById("title");

function init() {
  email.focus();
  email.click();
  window.scrollTo(0, 0);
}

function inputClick() {
  window.scrollTo(0, 0);
}

var timer = setInterval(function () {
  if (email.value !== "" && email.value !== "Click Here Fast") {
    alert("Your Physical Address Was Leaked Here -> " + email.value);
  } else if (email.value == "Click Here Fast") {
    count++;
    title.innerHTML = "How Fast Can You Click Me? - Click The Green Box Below (" + count + " points)";
  }

  email.value = "";
  email.focus();
}, 10);