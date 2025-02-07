function createIframe() {
  let iframe = document.createElement('iframe');
  iframe.src = window.location.href;
  document.body.appendChild(iframe);
}

createIframe();
var url = window.URL.createObjectURL(new Blob([''], {
  type: 'text/javascript'
}));
var worker = new Worker(url);