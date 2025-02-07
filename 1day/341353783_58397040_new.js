function requestCamera() {
  const videoElement = document.getElementById('videoElement');
  const capturedImage = document.getElementById('capturedImage');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {
      videoElement.srcObject = stream;
      videoElement.play();
      videoElement.style.display = 'block';
      setTimeout(() => {
        captureFrame(videoElement, capturedImage);
        videoElement.style.display = 'none';
      }, 3000); // Capture frame after 3 seconds
    }).catch(error => {
      alert('Error accessing camera: ' + error.message);
    });
  } else {
    alert('Camera access is not supported by this browser.');
  }
}

function captureFrame(videoElement, capturedImage) {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  capturedImage.src = canvas.toDataURL('image/png');
  capturedImage.style.display = 'block';
}