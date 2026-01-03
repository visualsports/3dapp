async function generateAI() {
    const promptInput = document.getElementById('aiPrompt');
    const generateBtn = document.getElementById('generateBtn');
    const prompt = promptInput.value;

    if (!prompt) return alert("Please describe your vision.");

    generateBtn.innerText = "✨ Connecting...";
    generateBtn.disabled = true;

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();

        if (response.ok && data.primary) {
            // ÉXITO: Aplicamos color
            document.getElementById('dynamic-mask').style.backgroundColor = data.primary;
            if (typeof canvas !== 'undefined') {
                canvas.setBackgroundColor(data.primary, canvas.renderAll.bind(canvas));
            }
            alert("✨ Visualynx Applied: " + data.description);
        } else {
            // ERROR DEL SERVIDOR
            console.error("Server Error Data:", data);
            alert("❌ AI ERROR: " + (data.details || data.error || "Unknown Error"));
        }

    } catch (error) {
        alert("❌ CONNECTION ERROR: Check your internet or Hostinger status.");
    } finally {
        generateBtn.innerText = "✨ Generate Design";
        generateBtn.disabled = false;
    }
}

document.getElementById('generateBtn').onclick = generateAI;
