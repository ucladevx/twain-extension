chrome.tabs.onUpdated.addListener((tabId, info) => {
  chrome.pageAction.show(tabId);
  if (info.status === 'complete') {
    chrome.tabs.query({ active: true }, (tabs) => {
      if (tabs[0].url.includes('calendar.google.com')) {
        chrome.tabs.sendMessage(tabs[0].id, { callFunction: 'enableSidebar' });
      }
    });
  }
});

chrome.pageAction.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { callFunction: 'toggleSidebar' });
  });
});
