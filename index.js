const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to simulate an order placement and trigger WhatsApp message
app.post('/place-order', async (req, res) => {
    const { phoneNumber, orderDetails } = req.body;

    if (!phoneNumber || !orderDetails) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Call your WhatsApp API here (for example, using axios to send the message)
        const response = await axios.post('https://api.whatsapp.com/send', {
            phone: phoneNumber,
            message: `Your order: ${orderDetails} has been placed.`
        });

        res.status(200).json({ success: 'Message sent successfully', data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
