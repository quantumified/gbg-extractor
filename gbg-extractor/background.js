let isScriptInjected = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logMapData') {
    injectScriptsAndLogData();
  }
});

function injectScriptsAndLogData() {
  console.log("Injecting Scripts...");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found. Retrying...");
      setTimeout(injectScriptsAndLogData, 500); // Retry after 500ms if no active tab is found
      return;
    }

    const activeTabId = tabs[0].id;

    // Check if the script is already injected to avoid duplicate injections
    if (!isScriptInjected) {
      console.log("Setting up script trigger.");
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTabId },
          function: logGBGData,
        },
        (results) => {
          // Handle the results or errors from logGBGData execution
          if (chrome.runtime.lastError) {
            console.error("Script injection error:", chrome.runtime.lastError);
          } else {
            console.log("Script executed:", results);
            isScriptInjected = true; // Mark script as injected after first successful execution
          }
        }
      );
    } else {
      console.log("Script already injected, skipping re-injection.");
    }
  });
}

function logGBGData() {
  console.log("called logGBGData()");
  if (typeof FoEproxy !== 'undefined') {
    console.log("FoEproxy is available");

    // Listen for Guild Battleground data from FoEproxy
    FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data) => {
      if (data && data.responseData && data.responseData.map) {
        const mapData = data.responseData.map.provinces;
        console.log('Extracted GBG map data:', mapData);
      } else {
        console.log("No map data available in GuildBattlegroundService response.");
      }
    });
  } else {
    console.error('FoEproxy is not available.');
  }
}
