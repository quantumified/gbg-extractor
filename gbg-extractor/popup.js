document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message').value || "No message provided";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    chrome.runtime.sendMessage({ action: 'sendMessage', message, timezone });
});
