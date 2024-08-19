chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SECTOR_DATA') {
        const sectors = message.sectors;
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Prepare data for the Discord bot
        const sectorInfo = sectors.map(s => `${s.opensAt} ${s.name}`).join(' ');
        const discordMessage = `Sector Data: ${sectorInfo}, User Timezone: ${userTimezone}`;

        // Send this data to the Discord bot
        const discordWebhookUrl = 'https://discordapp.com/api/webhooks/YOUR_WEBHOOK_URL';
        
        fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: discordMessage
            }),
        })
        .then(response => response.json())
        .then(data => console.log('Successfully sent data to Discord bot:', data))
        .catch(error => console.error('Error sending data to Discord bot:', error));
    }
});
