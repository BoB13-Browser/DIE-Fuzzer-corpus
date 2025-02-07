try {
  var atabid;
  var windowId;
  chrome.windows.create({
    url: "about:blank",
    type: "normal"
  }, w => {
    windowId = w.id;
    atabid = w.tabs[0].id;
    chrome.debugger.attach({
      tabId: atabid
    }, "1.3", function () {
      const intervalId = setInterval(g => {
        chrome.debugger.sendCommand({
          tabId: atabid
        }, "DOM.setOuterHTML", {
          nodeId: -0,
          outerHTML: unescape("%u99D7%u5009%uEF9F%u312%uFA1E%uD7C%u8B8F%u5B3E%uCDD8%u8DDD%u3E07%u2F5B%u859A%uDFC%uEF1%u809B%u13AF%u7134%uF34B%uE846%uAB84%uC4F7%uC38F%uD3FB%u15F9%u1E9E%u1FDC%uA535%u25F0%uD451%u10B1%u8AB7%u75CB%uC393%u9598%u45F6%uBA11%u541%uFA0F%uAE21%uEED%uFC47%u9135%u8B65%u5E5A%uD392%uD8AC%uBF2D%u313D%u457%u28DC%u77D8%uBB0C%uE03C%uC1ED%uFFF4%u3B8E%u24D2%uC109%u1966%u9DC3%u8F68%u504B%uA441%u1538%uAF2%uF533%uB53B%u6940%uE2BF%u797B%uEEBC%uB2B8%u4956%u9377%uE4F7%u854F%u5B70%u7684%uF83B%uDE85%uA959%u10D2%uFADE%u3E98%uEA05%uBCD3%u254C%uE6E2%uDF49%uF671%u43BB%uD234%u3264%uCA46%uF367%u1022%u3014%uAE8E%uCC40%uB36D%uFEFF%u94F0%u545E%u3FB7%u2117%u11DC%u8887")
        });
      }, 100);
      setTimeout(() => {
        clearInterval(intervalId);
        chrome.windows.remove(windowId);
      }, 1000);
    });
  });
} catch (e) {}