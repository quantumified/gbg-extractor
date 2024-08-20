(function() {
    const originalWebSocket = window.WebSocket;

    // Override WebSocket to intercept sector-related data
    window.WebSocket = function(...args) {
        const wsInstance = new originalWebSocket(...args);

        wsInstance.addEventListener('message', function(event) {
            try {
                const parsedData = JSON.parse(event.data);
                if (parsedData.requestMethod === "GuildBattlegroundService" && parsedData.responseData && parsedData.responseData.sectors) {

                    // Extract sector names and opening times (24-hour format)
                    const sectors = parsedData.responseData.sectors.map(sector => {
                        return {
                            name: sector.name,  // Adjust based on data structure
                            opensAt: new Date(sector.openAt * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) // 24-hour format
                        };
                    });

                    // Send the extracted sector data to the background script
                    chrome.runtime.sendMessage({
    type: 'SECTOR_DATA',
    sectors: extractedSectors // Replace with the actual data structure
});

                }
            } catch (error) {
                console.error("Error parsing WebSocket data", error);
            }
        });

        return wsInstance;
    };
})();
