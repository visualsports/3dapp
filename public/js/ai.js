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
        console.log("AI Data Received:", data); // Esto lo veremos en la consola (F12)

        if (data.primary && data.description) {
            // Aplicar el color a la camiseta
            document.getElementById('dynamic-mask').style.backgroundColor = data.primary;
            
            // Aplicar el color al plano de producción
            if (typeof canvas !== 'undefined') {
                canvas.setBackgroundColor(data.primary, canvas.renderAll.bind(canvas));
            }
            
            alert("Visualynx AI Suggestion:\n" + data.description + "\n\nColor applied: " + data.primary);
        } else {
            alert("The AI sent a weird response. Try again with other words.");
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Connection error. Please refresh the page.");
    } finally {
        generateBtn.innerText = "✨ Generate Design";
        generateBtn.disabled = false;
    }
}

document.getElementById('generateBtn').onclick = generateAI;
