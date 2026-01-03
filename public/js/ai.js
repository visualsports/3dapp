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
        
        // APLICAR CAMBIOS VISUALES
        // 1. Cambiamos el color en el maniquí
        document.getElementById('dynamic-mask').style.backgroundColor = data.primary;
        
        // 2. Actualizamos el lienzo de producción (el de 65x80cm)
        canvas.setBackgroundColor(data.primary, canvas.renderAll.bind(canvas));

        // 3. Mostramos la descripción de la IA
        alert("Visualynx AI Suggestion: " + data.description);

    } catch (error) {
        console.error("AI Error:", error);
        alert("The AI is processing a lot of kits. Try again in a moment.");
    } finally {
        generateBtn.innerText = "✨ Generate Design";
        generateBtn.disabled = false;
    }
}

document.getElementById('generateBtn').onclick = generateAI;
