function appendQueryParameters() {
  var currentURL = new URL(window.location.href);
  currentURL.searchParams.append('xx', 'xx');
  window.location.search = currentURL.search;
}

function GC() {
  try {
    new ArrayBuffer(0x7fe00000);
  } catch (e) {}

  ;
}

for (let i = 0; i < 10; i++) {
  let ctx = new AudioContext();
}

setTimeout(async function () {
  GC();
  appendQueryParameters();
}, 10);