for (let i = 0; i < 40; i++) {
  let iframe = document.createElement('iframe');
  iframe.src = './index.html';
  document.getElementById('iframes-container').appendChild(iframe);
}

setTimeout(() => {
  // location.reload();
  console.log("before");
  location.href = "http://127.0.0.1:8000/wrapper.html";
  history.back(-1);
  console.log("after");
}, 20000);