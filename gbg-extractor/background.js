chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logMapData') {
    injectScriptsAndLogData();
  }
});

function injectScriptsAndLogData() {
  console.log("Injecting Scripts");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }
      // Now execute logGBGData after the FoEproxy script is injected
      console.log("setup script trigger");
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: logGBGData, // Call this function to log GBG data
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
