const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.error('Missing BLOB_READ_WRITE_TOKEN');
            return res.status(500).json({ error: 'Server configuration error: Missing Blob Token' });
        }

        // Parse URL to get filename since bodyParser is false (raw request)
        // construct a full URL to parse search params easily
        const url = new URL(req.url, `http://${req.headers.host}`);
        const filename = url.searchParams.get('filename');

        if (!filename) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        // Stream the upload directly from the request
        const blob = await put(filename, req, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return res.status(200).json(blob);
    } catch (error) {
        console.error('Upload Error:', error);
        return res.status(500).json({ error: 'Upload failed: ' + error.message });
    }
};

// Disable Vercel's default body parser to handle the raw stream
module.exports.config = {
    api: {
        bodyParser: false,
    },
};
