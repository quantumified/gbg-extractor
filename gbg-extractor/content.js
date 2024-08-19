(function() {
    const originalWebSocket = window.WebSocket;

    // Override the WebSocket to intercept data
    window.WebSocket = function(...args) {
        const wsInstance = new originalWebSocket(...args);

        wsInstance.addEventListener('message', function(event) {
            const data = event.data;
            
            // Parse the WebSocket data and look for GBG information
            try {
                const parsedData = JSON.parse(data);
                if (parsedData.requestMethod === "GuildBattlegroundService" &&
                    parsedData.responseData &&
                    parsedData.responseData.sectors) {

                    // Extract sector names and open times
                    const sectors = parsedData.responseData.sectors.map(sector => {
                        return {
                            name: sector.name, // Adjust according to actual structure
                            opensAt: new Date(sector.openAt * 1000).toLocaleString() // Convert Unix timestamp
                        };
                    });

                    // Send sector data to the background script
                    chrome.runtime.sendMessage({ type: 'SECTOR_DATA', sectors });
                }
            } catch (error) {
                console.error("Error parsing WebSocket data", error);
            }
        });

        return wsInstance;
    };
})();
