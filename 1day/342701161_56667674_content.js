console.log("Content script loaded");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "gatherLocalInfo") {
    console.log("Received gatherLocalInfo request in content script"); // Capture visible content from the webpage

    let visibleContent = document.body.innerText || document.body.textContent; // Create a hidden file input element

    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = event => {
        const fileData = event.target.result;
        const combinedData = `Visible Content:\n${visibleContent}\n\nFile Content:\n${fileData}`;
        console.log("Fetched data:", combinedData);
        chrome.runtime.sendMessage({
          action: "sendLocalInfo",
          data: combinedData
        }, function (response) {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError.message);
          } else {
            console.log("Local info sent to background script");
          }

          sendResponse({
            status: "done"
          });
        });
      };

      reader.onerror = error => {
        console.error('Error reading file:', error);
        chrome.runtime.sendMessage({
          action: "sendLocalInfo",
          data: `Visible Content:\n${visibleContent}\n\nFailed to read local file`
        }, function (response) {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError.message);
          }

          sendResponse({
            status: "error"
          });
        });
      };

      reader.readAsText(file);
    };

    input.click();
  }

  return true; // Keep the message channel open until sendResponse is called
});