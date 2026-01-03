const assets = {
    front: { base: 'assets/frente_base.png', sombras: 'assets/frente_sombras.png', highlights: 'assets/frente_highlights.png' },
    back: { base: 'assets/espalda_base.png', sombras: 'assets/espalda_sombras.png', highlights: 'assets/espalda_highlights.png' }
};

function switchView(view) {
    // Cambiar botones
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + view).classList.add('active');
    
    // Cambiar capas del maniquí
    const mask = document.getElementById('dynamic-mask');
    mask.style.maskImage = `url('${assets[view].base}')`;
    mask.style.webkitMaskImage = `url('${assets[view].base}')`;
    
    document.getElementById('img-shadows').src = assets[view].sombras;
    document.getElementById('img-highlights').src = assets[view].highlights;
}

// Eventos de botones
document.getElementById('btn-front').onclick = () => switchView('front');
document.getElementById('btn-back').onclick = () => switchView('back');

document.getElementById('generateBtn').onclick = () => {
    const prompt = document.getElementById('aiPrompt').value;
    alert("✨ Visualynx AI will now create a pattern for: " + prompt);
};

document.getElementById('finalizeBtn').onclick = () => {
    // Aquí es donde en el futuro llamaremos a la función que guarda en la base de datos
    document.getElementById('successModal').style.display = 'flex';
};

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}
};

// Iniciar con vista frontal
switchView('front');
