async function test() {
  var p = navigator.mediaDevices.getUserMedia({
    video: true
  });
  var id = setTimeout(() => {
    window.location.reload();
  }, 150);
  p.catch(e => {
    clearTimeout(id);
    document.addEventListener("mouseleave", ev => {
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    });
  });
}

window.onload = test;