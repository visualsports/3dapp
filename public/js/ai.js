async function generateAI() {
    const promptInput = document.getElementById('aiPrompt');
    const generateBtn = document.getElementById('generateBtn');
    const prompt = promptInput.value;

    if (!prompt) return alert("Please describe your vision first.");

    generateBtn.innerText = "✨ Designing...";
    generateBtn.disabled = true;

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        
        if (data.error) {
            // SI HAY UN ERROR, LO MOSTRARÁ AQUÍ
            alert("SERVER ERROR: " + data.error);
            return;
        }

        document.getElementById('dynamic-mask').style.backgroundColor = data.primary;
        canvas.setBackgroundColor(data.primary, canvas.renderAll.bind(canvas));
        alert("AI Suggestion: " + data.description);

    } catch (error) {
        // ERROR DE CONEXIÓN O RED
        alert("CONNECTION ERROR: " + error.message);
    } finally {
        generateBtn.innerText = "✨ Generate Design";
        generateBtn.disabled = false;
    }
}

document.getElementById('generateBtn').onclick = generateAI;
