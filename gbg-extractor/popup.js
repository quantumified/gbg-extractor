document.getElementById('capture').addEventListener('click', () => {
  console.log('Capture button clicked');
  chrome.runtime.sendMessage({ action: 'captureData' });
});

document.getElementById("logMapButton").addEventListener("click", function() {
  console.log('Log Map Data button clicked');
  chrome.runtime.sendMessage({ action: "logMapData" });
});
