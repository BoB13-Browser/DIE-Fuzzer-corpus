async function serviceWorkerRegisterAndUnregister(url, scope) {
  await navigator.serviceWorker.register(url);
}

serviceWorkerRegisterAndUnregister('./sw.js');
setTimeout(async function () {
  location.reload();
}, Math.random() * 5000);

Object.prototype.__defineGetter__('then', function () {
  let win = window.open('about:blank', "_blank", "", null);
  win.close();
});