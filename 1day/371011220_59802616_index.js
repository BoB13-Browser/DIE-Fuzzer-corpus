async function main() {
  if ('serviceWorker' in navigator) {
    var workers = await navigator.serviceWorker.getRegistrations();
    if (workers.length) return;
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      document.location = window.location;
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}

main();