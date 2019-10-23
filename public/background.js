chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.pageAction.show(tabId);
});

chrome.pageAction.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { callFunction: 'toggleSidebar' },
      (res) => {
        console.log(res);
      }
    );
  });
});
