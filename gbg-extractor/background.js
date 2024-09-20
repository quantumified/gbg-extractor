chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendMessage') {
        const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL';
        const message = request.message;
        const timezone = request.timezone;

        // Combine the message and timezone on the same line
        const fullMessage = `${message} (${timezone})`;

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: fullMessage }),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Message sent successfully!');
            } else {
                console.error('Failed to send message.');
            }
        })
        .catch((error) => console.error('Error:', error));
    }
});
