var stream = null;
var pc = null;
var onNegotiationNeededCalled = false;

function error() {
  console.log("error");
}

function getUserMedia(dictionary, callback) {
  navigator.webkitGetUserMedia(dictionary, callback, error);
}

function onNegotiationNeeded(event) {
  onNegotiationNeededCalled = true;
}

function gotStream(s) {
  stream = s;
  pc = new RTCPeerConnection();
  pc.onnegotiationneeded = onNegotiationNeeded;
  pc.addStream(stream);
  Promise.resolve().then(() => {
    if (onNegotiationNeededCalled) {
      return;
    }
  });
}

getUserMedia({
  audio: true,
  video: true
}, gotStream);