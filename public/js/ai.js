async function generateAI() {
    const promptInput = document.getElementById('aiPrompt');
    const generateBtn = document.getElementById('generateBtn');
    const mask = document.getElementById('dynamic-mask');
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

        if (!response.ok) throw new Error("Server Error");

        const data = await response.json();
        console.log("AI Applied:", data);

        if (data.primary) {
            // Aplicar color al Mockup visual
            mask.style.backgroundColor = data.primary;
            mask.style.backgroundImage = 'none'; // Limpiamos si había un logo previo
            
            // Aplicar al Canvas de impresión (65x80)
            if (canvas) {
                canvas.setBackgroundColor(data.primary, canvas.renderAll.bind(canvas));
            }
            
            alert("✨ Visualynx Suggestion:\n" + (data.description || "Design applied successfully."));
        } else {
            alert("The AI had trouble deciding the colors. Please try with: 'Neon Green' or 'Deep Purple'.");
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        alert("The server is busy. Please try again in 5 seconds.");
    } finally {
        generateBtn.innerText = "✨ Generate Design";
        generateBtn.disabled = false;
    }
}

document.getElementById('generateBtn').onclick = generateAI;
