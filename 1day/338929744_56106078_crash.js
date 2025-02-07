function updateURLSearch() {
  var currentURL = new URL(window.location.href);
  currentURL.searchParams.append('xx', 'xx');
  window.location.search = currentURL.search;
}

function createIframes() {
  var iframe = document.createElement('iframe');
  iframe.src = location.href;
  document.body.appendChild(iframe);
}

navigator.mediaSession.setActionHandler('previoustrack', function () {});
createIframes();
createIframes();
setTimeout(function () {
  updateURLSearch();
}, Math.floor(Math.random() * 2000));