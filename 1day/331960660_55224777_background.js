let group2Id;
let isMovingWithinGroup2 = false;
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: "about:blank"
  }, tab1 => {
    chrome.tabs.create({
      url: "about:blank"
    }, tab2 => {
      chrome.tabs.create({
        url: "about:blank"
      }, tab3 => {
        chrome.tabs.group({
          tabIds: [tab2.id, tab3.id]
        }, group1 => {
          chrome.tabGroups.update(group1, {
            title: "Group 1",
            color: "blue"
          }, () => {
            chrome.tabs.group({
              tabIds: [tab1.id]
            }, group2 => {
              chrome.tabGroups.update(group2, {
                title: "Group 2",
                color: "red"
              }, () => {
                group2Id = group2.id;
                console.log("Tabs grouped successfully");
                setTimeout(() => {
                  queryGroup2Tabs();
                }, 500);
              });
            });
          });
        });
      });
    });
  });
});

function queryGroup2Tabs() {
  chrome.tabs.query({
    groupId: group2Id
  }, group2Tabs => {
    console.log("While Dragging tab #1 in group #2 - trying to win the race here]");
    console.log("Group 2 Tabs:", group2Tabs);
    setTimeout(queryGroup2Tabs, 100);
  });
}

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    const groupId = tab.groupId;

    if (groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
      chrome.tabGroups.get(groupId, group => {
        console.log("Tab activated:");
        console.log("Tab Details:", tab);
        console.log("Group Details:", group);
      });
    } else {
      console.log("Tab activated:");
      console.log("Tab Details:", tab);
      console.log("Tab is not in a group");
    }
  });
});
chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
  chrome.tabs.get(tabId, tab => {
    const groupId = tab.groupId;

    if (groupId === group2Id && !isMovingWithinGroup2) {
      isMovingWithinGroup2 = true;

      const queryGroup2Tabs = () => {
        if (isMovingWithinGroup2) {
          chrome.tabs.query({
            groupId: group2Id
          }, group2Tabs => {
            console.log("Tab moved within Group 2:");
            console.log("Tab Details:", tab);
            console.log("Group 2 Tabs:", group2Tabs);
            setTimeout(queryGroup2Tabs, 1000);
          });
        }
      };

      queryGroup2Tabs();
    } else if (groupId !== group2Id && isMovingWithinGroup2) {
      isMovingWithinGroup2 = false;
      console.log("Tab moved outside of Group 2");
    }
  });
});
chrome.tabGroups.onMoved.addListener(group => {
  console.log("Group moved:");
  console.log("Group Details:", group);
});