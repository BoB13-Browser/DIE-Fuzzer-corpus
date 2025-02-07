const worker = new Worker("worker.js");

worker.onmessage = function (event) {
  const message = event.data;

  switch (message.type) {
    case "test_result":
      const testName = message.testName;
      const passed = message.passed;
      const message = message.message;
      console.log(`Check ${testName}: ${passed ? "Okay" : "Not-Okay"}`);

      if (message) {
        console.log(`Message: ${message}`);
      }

      break;

    case "test_complete":
      console.log("Done");
      break;

    default:
      console.log(`Unknown message type: ${message.type}`);
  }
};

worker.postMessage({
  type: "start"
});
setTimeout(function () {
  location.reload();
}, Math.random() * 33);