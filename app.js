const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Verificación interna
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.length < 10) {
            return res.status(500).json({ error: "API KEY NOT FOUND IN HOSTINGER" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `Return ONLY a JSON object. No conversation, no backticks. 
        Example format: {"primary": "#FF0000", "description": "Design description"}
        User wants: ${prompt}`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        let text = response.text();
        
        // Limpiador agresivo de JSON
        const jsonMatch = text.match(/\{.*\}/s);
        if (jsonMatch) {
            res.json(JSON.parse(jsonMatch[0]));
        } else {
            res.status(500).json({ error: "Invalid format received", raw: text });
        }

    } catch (error) {
        res.status(500).json({ error: "Google API Error", details: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server debug mode on');
});
