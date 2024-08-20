chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SECTOR_DATA') {
        console.log('Extracted Data:', message.sectors); // Log the extracted data
        const sectors = message.sectors;
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const sectorInfo = sectors.map(s => `${s.opensAt} ${s.name}`).join(' ');
        const discordMessage = `Sector Data: ${sectorInfo}, User Timezone: ${userTimezone}`;

        const discordWebhookUrl = 'https://discord.com/api/webhooks/1274955137303183401/FLehqCkQD_tiRUGR2vE4X8jXLikzeCb8bMYpFFOoDoBxmMaJcKLPhLUJBKHRz3v1Hj2i';
        
        fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: discordMessage })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Successfully sent data to Discord bot:', data);
        })
        .catch(error => {
            console.error('Error sending data to Discord bot:', error);
            sendErrorToPopup('Error sending data to Discord bot: ' + error.message);
        });
    }
});

function sendErrorToPopup(errorMessage) {
    chrome.runtime.sendMessage({ type: 'ERROR', errorMessage });
}
