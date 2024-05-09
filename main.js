const shortenUrl = async () => {
    try {
        const longUrl = document.getElementById('long-url').value;
        const data = {
            domain: "ewg7.short.gy",
            originalURL: longUrl,
            allowDuplicates: false
        };

        const response = await fetch('https://api.short.cm/links/public', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'pk_Y3VdyuTWAkOJOvvx'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }

        const responseData = await response.json();
        const shortUrl = responseData.shortURL;

        const shortUrlLink = document.getElementById('short-url');
        shortUrlLink.href = shortUrl;
        shortUrlLink.textContent = shortUrl;

        const shortUrlContainer = document.getElementById('short-url-container');
        shortUrlContainer.style.display = 'block';

        const copyBtn = document.getElementById('copy-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(shortUrl).then(() => {
                alert('Copied to clipboard!');
            }).catch((error) => {
                console.error('Failed to copy URL to clipboard:', error);
            });
        });

        console.log(shortUrl);
    } catch (error) {
        console.error('Error while shortening URL:', error);
    }
};

const shortenBtn = document.getElementById('shorten-btn');
shortenBtn.addEventListener('click', shortenUrl);
