document.getElementById('extractBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: extractData
        }).catch(error => {
            console.error('Error:', error);
            document.getElementById('error').innerText = 'Failed to execute script: ' + error.message;
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
    // This function will be executed in the context of the web page
    chrome.runtime.sendMessage({ type: 'EXTRACT_GBG_DATA' });
}
