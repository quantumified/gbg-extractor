chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logMapData') {
    injectScriptsAndLogData();
  }
});

function injectScriptsAndLogData() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }

    // Inject FoEproxy script into the page
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['foeproxy.js'], // Inject the FoEproxy script
    }, (injectionResults) => {
      // Ensure the script was injected successfully
      if (chrome.runtime.lastError || !injectionResults || injectionResults.length === 0) {
        console.error('Failed to inject FoEproxy:', chrome.runtime.lastError);
        return;
      }

      // Now execute logGBGData after the FoEproxy script is injected
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: logGBGData, // Call this function to log GBG data
      });
    });
  });
}

// Function that logs the Guild Battleground data
function logGBGData() {
  if (typeof FoEproxy !== 'undefined') {
    FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data) => {
      const mapData = data.responseData.map.provinces;

      if (!mapData || mapData.length === 0) {
        console.log('No GBG game found.');
      } else {
        console.log('Full map data:', mapData);
      }
    });
  } else {
    console.error('FoEproxy is not available.');
  }
                  }
