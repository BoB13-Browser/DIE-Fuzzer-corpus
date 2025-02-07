setTimeout(() => {}, 4000);

for (let i = 0; i < 80; i++) {
  let iframe = document.createElement('iframe');
  iframe.src = 'https://wpt.live/webrtc-extensions/RTCRtpParameters-codec.html';
  document.getElementById('iframes-container').appendChild(iframe);
}

setTimeout(() => {
  location.reload();
  console.log("before");
  console.log("after");
}, 60000);