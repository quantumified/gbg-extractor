// Ensure FoEproxy is loaded and functioning correctly
if (typeof FoEproxy !== 'undefined') {
  FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data) => {
    const mapData = data.responseData.map.provinces;

    if (!mapData || mapData.length === 0) {
      console.log('No GBG game found.'); // Log if no data found
    } else {
      console.log('Full map data:', mapData); // Log the map data if found
    }
  });
} else {
  console.error('FoEproxy is not available.');
}
