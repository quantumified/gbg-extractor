chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logMapData') {
    injectScriptsAndLogData();
  }
});

function injectScriptsAndLogData(retryCount = 0) {
  console.log("Injecting Scripts");

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found.");
      
      // Retry up to 5 times if no active tab is found
      if (retryCount < 5) {
        setTimeout(() => injectScriptsAndLogData(retryCount + 1), 200);
      } else {
        console.error("Unable to find active tab after retries.");
      }
      return;
    }

    const activeTabId = tabs[0].id;
    console.log("Active tab found:", tabs[0]);

    chrome.scripting.executeScript(
      {
        target: { tabId: activeTabId },
        function: logGBGData,
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error("Script injection error:", chrome.runtime.lastError.message);
        } else {
          console.log("Script executed, result:", results);
        }
      }
    );
  });
}

// Function that logs the Guild Battleground data
function logGBGData() {
  console.log("called logGBGData()");
  if (typeof FoEproxy !== 'undefined') {
    console.log("FoEproxy is available");

    FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data) => {
      if (data && data.responseData && data.responseData.map) {
        const mapData = data.responseData.map.provinces;
        console.log('Extracted GBG map data:', mapData);
      } else {
        console.log("No map data found in GuildBattlegroundService response.");
      }
    });
  } else {
    console.error('FoEproxy is not available.');
  }
}