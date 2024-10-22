chrome.runtime.onInstalled.addListener(() => {
  console.log('FoE Guild Battleground Extractor installed.');
});

// Define the button click action to log the full map data
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: logMapData
  });
});

// Function to log the map data to the console (executed in the content script context)
function logMapData() {
  if (typeof FoEproxy !== 'undefined') {
    FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data, postData) => {
      const mapData = data.responseData.map.provinces;
      console.log('Full map data:', mapData);
    });
  } else {
    console.error('FoEproxy is not available on this page.');
  }
}
