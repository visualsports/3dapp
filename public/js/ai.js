async function generateAI() {
    const promptInput = document.getElementById('aiPrompt');
    const generateBtn = document.getElementById('generateBtn');
    const prompt = promptInput.value;

    if (!prompt) {
        alert("Please describe your vision first.");
        return;
    }

    generateBtn.innerText = "✨ Designing...";
    generateBtn.disabled = true;

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        
        // Esta es la sugerencia que te da la IA
        console.log("AI Suggestion:", data.text);
        alert("Visualynx AI Suggestion received. Next step: automatic pattern generation!");

    } catch (error) {
        console.error("AI Error:", error);
        alert("Connection lost with Visualynx AI. Check your API Key.");
    } finally {
        generateBtn.innerText = "✨ Generate Design";
        generateBtn.disabled = false;
    }
}

document.getElementById('generateBtn').onclick = generateAI;
