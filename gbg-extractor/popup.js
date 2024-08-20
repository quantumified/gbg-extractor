document.getElementById('extractBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: extractData
        });
    });

    document.getElementById('status').innerText = "Data extraction triggered.";
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'ERROR') {
        document.getElementById('error').innerText = message.errorMessage;
    }
});

function extractData() {
    // Send message to the background script to initiate extraction
    chrome.runtime.sendMessage({ type: 'EXTRACT_GBG_DATA' });
}
