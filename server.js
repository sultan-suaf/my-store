const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const client = new OAuth2Client(process.env.CLIENT_ID);

// Middleware
app.use(cors());
app.use(express.json());

// Google authentication endpoint
app.post('/auth/google', async (req, res) => {
    const { token } = req.body;
    try {
        // Verify the ID token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();

        // Respond with user information
        res.json({
            user: {
                id: payload['sub'], // User ID
                name: payload['name'], // User name
                email: payload['email'], // User email
                picture: payload['picture'], // User profile picture
            },
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
