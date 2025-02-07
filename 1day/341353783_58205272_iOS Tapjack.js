function requestCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {
      alert('Camera access granted'); // You can now use the stream for video capture
    }).catch(error => {
      alert('Error accessing camera: ' + error.message);
    });
  } else {
    alert('Camera access is not supported by this browser.');
  }
}