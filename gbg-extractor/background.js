chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendMessage') {
        const webhookURL = 'https://discord.com/api/webhooks/1274955137303183401/FLehqCkQD_tiRUGR2vE4X8jXLikzeCb8bMYpFFOoDoBxmMaJcKLPhLUJBKHRz3v1Hj2i';
        const message = request.message;
        const timezone = request.timezone;

        const fullMessage = `${message}\n\n(Timezone: ${timezone})`;

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
