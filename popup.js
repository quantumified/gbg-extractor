document.getElementById("logMapButton").addEventListener("click", function() {
  console.log('Log Map Data button clicked');
  chrome.runtime.sendMessage({ action: "logMapData" });
});
