function createIframes() {
  if (top != self) {
    return;
  }

  for (let i = 0; i < 5; i++) {
    let iframe = document.createElement('iframe');
    iframe.src = location.href;
    document.body.appendChild(iframe);
  }
}

setInterval(async function () {
  for (let i = 0; i < 100; ++i) {
    new WebAssembly.Memory({
      initial: 16
    });
  }
}, 100);
setTimeout(function () {
  location.reload();
}, 1000);
createIframes();
let data = new Blob([new Uint8Array([0, 0, 0, 0, 0])]);

for (let i = 0; i < 100; i++) {
  let pc = new RTCPeerConnection();
  let channel = pc.createDataChannel('test');
  channel.close();
  channel.send(data);
}