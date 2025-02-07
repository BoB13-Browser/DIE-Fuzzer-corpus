window.alert = console.log;
window.confirm = console.log;
window.prompt = console.log;

function domfuzz_crawlNode(node) {
  for (var key in node) {
    try {
      var a = node[key]; //console.log(key + ": " + a);

      node[key] = null;
    } catch (e) {}
  }
}

function freememory() {
  try {
    CollectGarbage();
  } catch (err) {}

  try {
    FuzzingFunctions.garbageCollect();
  } catch (err) {}

  try {
    FuzzingFunctions.cycleCollect();
  } catch (err) {}

  try {
    window.gc();
  } catch (err) {}

  try {
    gc();
  } catch (err) {}

  try {
    if (!window.gc && !FuzzingFunctions) {
      for (let i = 0; i < 1000; i++) {
        new ArrayBuffer(0x10000);
      }

      new ArrayBuffer(0x7fe00000);
    }
  } catch (err) {}
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function triggerConcurrentGC() {
  console.log('call-> triggerConcurrentGC\n');
  mygc(0x130);
  await sleep(0);
  mygc(0x400);
}

function mygc(n) {
  var keeper = new Array(n);

  for (var i = 0; i < n; i++) {
    keeper[i] = new Array(0x3000);
  }

  keeper = null;
} //


function createIframe(url) {
  try {
    iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
  } catch (error) {}
}

function removeIframe() {
  try {
    const iframes = document.querySelectorAll('iframe');

    if (iframes.length > 0) {
      document.body.removeChild(iframes[0]);
    }
  } catch (error) {}
}

function createWebAssemblyMemories(count, size) {
  try {
    for (let i = 0; i < count; ++i) {
      new WebAssembly.Memory({
        initial: size
      });
    }
  } catch (error) {}
}