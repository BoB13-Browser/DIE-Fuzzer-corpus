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
                  // Drag Tab #1 before 5 seconds of loading and press ESC.
                  // Tab #1 shall be still present in Group #2, if mighty Wayland allows.
                  removeGroup2();
                }, 5000);
              });
            });
          });
        });
      });
    });
  });
});

async function removeGroup2() {
  const group2Tabs = await chrome.tabs.query({
    groupId: group2Id
  });
  const tabIds = group2Tabs.map(({
    id
  }) => id);
  await chrome.tabs.ungroup(tabIds);
  console.log("Group 2 removed");
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