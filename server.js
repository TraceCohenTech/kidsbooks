const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-comic', async (req, res) => {
    const { prompt } = req.body;
    const openaiKey = process.env.OPENAI_API_KEY;

    try {
        // Generate story using GPT-3
        const storyResponse = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`
            },
            body: JSON.stringify({
                prompt: `Create a short, simple story for a 3-year-old based on: ${prompt}`,
                max_tokens: 100,
                temperature: 0.7
            })
        });
        const storyData = await storyResponse.json();
        const story = storyData.choices[0].text.trim();

        // Generate image using DALL-E
        const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`
            },
            body: JSON.stringify({
                prompt: `A simple, colorful illustration for a children's book about: ${prompt}`,
                n: 1,
                size: "512x512"
            })
        });
        const imageData = await imageResponse.json();
        const imageUrl = imageData.data[0].url;

        res.json({ story, imageUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate comic' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
