// background.js
console.log("background.js running");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);

  if (message.command === "executeCode") {
    console.log("Executing code:", message.code);
    eval(message.code);
  } else if (message.command === "logURL") {
    console.log("URL of the website:", sender.url);
  }
});