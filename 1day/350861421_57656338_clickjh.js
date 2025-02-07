function vw() {
  navigator.mediaDevices ? navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).then() : navigator.getUserMedia({
    audio: true,
    video: true
  } // displayOutcome("camera+microphone", "success"), -->
  // displayOutcome("camera+microphone", "error") -->
  );
}