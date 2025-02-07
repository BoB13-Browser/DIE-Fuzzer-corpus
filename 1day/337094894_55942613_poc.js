var a = new Array(2);
a[0] = window.open("http://127.0.0.1:8000/RTCPeerConnectionHandler.html");
setTimeout(() => {
  a[1] = window.open("http://127.0.0.1:8000/RTCPeerConnectionHandler.html");
}, 2200);
setTimeout(() => {
  a[1].close();
}, 3300);