document.getElementById('send').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'sendMessage' });
});
