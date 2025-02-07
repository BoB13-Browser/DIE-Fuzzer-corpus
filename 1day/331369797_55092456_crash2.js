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

let cnt = Math.floor(Math.random() * 30);

for (let i = 0; i < cnt; i++) {
  let ctx = new AudioContext();
}

setTimeout(async function () {
  GC();
  appendQueryParameters();
}, Math.floor(Math.random() * 30));