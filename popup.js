window.onload = function () {
  chrome.storage.sync.get('storedUrls', function (data) {
    if (data.storedUrls) {
      document.getElementById('urls').value = data.storedUrls.join('\n');
    }
  });
};

document.getElementById('openAndPin').addEventListener('click', function () {
  const textareaValue = document.getElementById('urls').value;
  const urls = textareaValue.split('\n');

  chrome.storage.sync.set({ 'storedUrls': urls });

  for (let url of urls) {
    // Check if the URL is valid.
    if (url.trim() && isValidURL(url.trim())) {
      chrome.tabs.create({ url: url.trim(), pinned: true });
    }
  }

  // Close the popup after the action.
  window.close();
});

// on close
window.onbeforeunload = function () {
  // store the urls
  const textareaValue = document.getElementById('urls').value;
  chrome.storage.sync.set({ 'storedUrls': textareaValue.split('\n') });
}

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
