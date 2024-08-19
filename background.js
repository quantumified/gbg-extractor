chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SECTOR_DATA') {
        const sectors = message.sectors;
        console.log("Sectors received:", sectors);

        // Send this data to the Discord bot
        const discordWebhookUrl = 'https://discordapp.com/api/webhooks/YOUR_WEBHOOK_URL';
        
        fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `New sector data: ${JSON.stringify(sectors)}`
            }),
        })
        .then(response => response.json())
        .then(data => console.log('Successfully sent data to Discord bot:', data))
        .catch(error => console.error('Error sending data to Discord bot:', error));
    }
});
