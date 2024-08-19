document.getElementById('extractBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: extractData
        });
    });
    document.getElementById('status').innerText = "Data extraction triggered.";
});

function extractData() {
    // This function runs in the context of the web page
    chrome.runtime.sendMessage({ type: 'EXTRACT_GBG_DATA' });
}
