function send(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action });
    }
  });
}

document.getElementById('show').addEventListener('click', () => {
  chrome.storage.local.set({ timerVisible: true });
  send('showTimer');
});

document.getElementById('hide').addEventListener('click', () => {
  chrome.storage.local.set({ timerVisible: false });
  send('hideTimer');
});
