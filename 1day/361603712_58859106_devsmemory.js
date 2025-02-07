var haha = function () {
  args = ['<button onclick="const memory = navigator.deviceMemory;console.log(`This device has at least ${memory}GiB of RAM.`);">Click here</button>'];
  b = new Blob(args, {
    type: 'text/html'
  });
  evil_url = URL.createObjectURL(b) + '#';
  window.open(evil_url);
};