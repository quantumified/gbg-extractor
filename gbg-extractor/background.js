chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logMapData') {
    injectScriptsAndLogData();
  }
});

function injectScriptsAndLogData() {
  console.log("Injecting Scripts");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }

    const tabId = tabs[0].id;

    // Execute logGBGData in the active tab
    console.log("setup script trigger");
    chrome.scripting.executeScript({
      target: { tabId },
      func: logGBGData,
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error("Error executing script:", chrome.runtime.lastError.message);
      } else if (!results || results.length === 0) {
        console.error("Script executed but no results returned.");
      } else {
        console.log("Script executed successfully:", results);
      }
    });
  });
}

// Function that logs the Guild Battleground data
function logGBGData() {
  console.log("called logGBGData()");
  if (typeof FoEproxy !== 'undefined') {
    console.log("FoEproxy is available");
    FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data) => {
      console.log('Full data:', data);
    });
  } else {
    console.error('FoEproxy is not available.');
  }
}
