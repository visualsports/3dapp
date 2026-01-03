const assets = {
    front: { base: 'assets/frente_base.png', sombras: 'assets/frente_sombras.png', highlights: 'assets/frente_highlights.png' },
    back: { base: 'assets/espalda_base.png', sombras: 'assets/espalda_sombras.png', highlights: 'assets/espalda_highlights.png' }
};

// Función para cambiar de vista
function switchView(view) {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('btn-' + view);
    if(btn) btn.classList.add('active');
    
    const mask = document.getElementById('dynamic-mask');
    mask.style.maskImage = `url('${assets[view].base}')`;
    mask.style.webkitMaskImage = `url('${assets[view].base}')`;
    
    document.getElementById('img-shadows').src = assets[view].sombras;
    document.getElementById('img-highlights').src = assets[view].highlights;
}

// Botones de vista
document.getElementById('btn-front').onclick = () => switchView('front');
document.getElementById('btn-back').onclick = () => switchView('back');

// Lógica del MODAL
const successModal = document.getElementById('successModal');
const finalizeBtn = document.getElementById('finalizeBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

finalizeBtn.onclick = () => {
    // Mostramos el modal añadiendo la clase 'show'
    successModal.classList.add('show');
};

closeModalBtn.onclick = () => {
    successModal.classList.remove('show');
};

// Iniciar
switchView('front');
