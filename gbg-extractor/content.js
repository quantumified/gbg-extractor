// Ensure FoEproxy is loaded
if (typeof FoEproxy !== 'undefined') {
  FoEproxy.addHandler('GuildBattlegroundService', 'getBattleground', (data, postData) => {
      const mapData = data.responseData.map.provinces;
      console.log('Full map data:', mapData);
  });
} else {
  console.error('FoEproxy is not available.');
}
