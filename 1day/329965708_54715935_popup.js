// popup.js
console.log("Popup script loaded");
document.getElementById("testButton").addEventListener("click", () => {
  console.log("Test button clicked");
  chrome.tabs.executeScript({
    code: "alert('XSS Vulnerability Test');"
  });
});