async function generateAI() {
    const promptInput = document.getElementById('aiPrompt');
    const generateBtn = document.getElementById('generateBtn');
    const prompt = promptInput.value;

    if (!prompt) {
        alert("Please describe your vision first.");
        return;
    }

    // Estética de carga
    generateBtn.innerText = "✨ Designing...";
    generateBtn.style.opacity = "0.5";

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        
        // Por ahora, la IA nos devolverá consejos de diseño.
        // En el siguiente paso, haremos que genere la imagen real.
        alert("Visualynx AI Suggestion:\n" + data.text);

    } catch (error) {
        console.error("AI Error:", error);
        alert("The AI is taking a break. Please try again.");
    } finally {
        generateBtn.innerText = "✨ Generate Design";
        generateBtn.style.opacity = "1";
    }
}

// Conectar el botón del UI con esta función
document.getElementById('generateBtn').onclick = generateAI;
