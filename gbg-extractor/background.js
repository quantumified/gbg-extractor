chrome.runtime.onInstalled.addListener(() => {
  console.log('FoE Guild Battleground Extractor installed.');
});

// Listener for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logMapData') {
    logMapData();
  }
});

// Function to log the map data to the console (executed in the content script context)
function logMapData() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found. Please ensure you have a tab open and active.");
      return; // Early return if no active tab is found
    }

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        if (typeof FoEproxy !== 'undefined') {
          FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data) => {
            const mapData = data.responseData.map.provinces;

            // Check if mapData is empty
            if (!mapData || mapData.length === 0) {
              console.log('No GBG game found.'); // Log if no map data is present
            } else {
              console.log('Full map data:', mapData); // Log the map data if present
            }
          });
        } else {
          console.error('FoEproxy is not available. This may indicate that the GBG is not currently active.');
        }
      },
    });
  });
}