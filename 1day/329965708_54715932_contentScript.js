// contentScript.js
console.log("Content script loaded");
chrome.runtime.sendMessage({
  command: "executeCode",
  code: "alert('This code was injected by a malicious extension!')"
});
chrome.runtime.sendMessage({
  command: "logURL"
});