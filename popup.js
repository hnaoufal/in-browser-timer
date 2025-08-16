function withActiveTab(cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      cb(tabs[0]);
    }
  });
}

document.getElementById('show').addEventListener('click', () => {
  chrome.storage.local.set({ timerVisible: true });
  withActiveTab((tab) => {
    chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ['timer.css'] }, () => {
      chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['timer.js'] }, () => {
        chrome.tabs.sendMessage(tab.id, { action: 'showTimer' });
      });
    });
  });
});

document.getElementById('hide').addEventListener('click', () => {
  chrome.storage.local.set({ timerVisible: false });
  withActiveTab((tab) => {
    chrome.tabs.sendMessage(tab.id, { action: 'hideTimer' });
  });
});
