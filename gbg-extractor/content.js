function waitForFoEproxy() {
  if (typeof FoEproxy !== 'undefined') {
    console.log("FoEproxy is available.");
    // Adding a handler for the GuildBattlegroundService
    FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data) => {
      const mapData = data.responseData.map.provinces;
      console.log('Full map data:', mapData);
    });
  } else {
    console.log("FoEproxy is not yet available, retrying...");
    setTimeout(waitForFoEproxy, 100);  // Retry after 100ms
  }
}

waitForFoEproxy();