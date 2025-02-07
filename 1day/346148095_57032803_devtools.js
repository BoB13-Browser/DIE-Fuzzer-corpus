const INJECTED_SCRIPT = "alert(Object.keys(chrome).join(', '))"; //changed

chrome.devtools.inspectedWindow.eval(INJECTED_SCRIPT, () => {}); //changes