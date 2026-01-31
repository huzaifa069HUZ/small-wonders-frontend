const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Basic security check (we will enforce Firebase auth on frontend)
        // In a production app, we would verify the Firebase ID token here too.

        const file = req.body;
        // Note: Vercel functions handle streaming automatically, but for blobs we might need parsing.
        // However, @vercel/blob handles 'request' objects directly in many cases.
        // Since we are likely sending a POST with the file query param or body.

        // Better approach for client uploads:
        // We will use the handleUpload helper OR simple direct server-side upload if the file is small.
        // For simplicity, let's assume we pass the filename in query and content in body.

        const filename = req.query.filename;

        if (!filename) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        // Capture the file from the request body
        // Note: This requires the body to be the raw binary data or a buffer
        const blob = await put(filename, req.body, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN, // Vercel adds this automatically
        });

        return res.status(200).json(blob);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Upload failed: ' + error.message });
    }
};
