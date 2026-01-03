const assets = {
    front: { base: 'assets/frente_base.png', sombras: 'assets/frente_sombras.png', highlights: 'assets/frente_highlights.png' },
    back: { base: 'assets/espalda_base.png', sombras: 'assets/espalda_sombras.png', highlights: 'assets/espalda_highlights.png' }
};

function switchView(view) {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    if(document.getElementById('btn-' + view)) document.getElementById('btn-' + view).classList.add('active');
    
    const mask = document.getElementById('dynamic-mask');
    mask.style.maskImage = `url('${assets[view].base}')`;
    mask.style.webkitMaskImage = `url('${assets[view].base}')`;
    
    document.getElementById('img-shadows').src = assets[view].sombras;
    document.getElementById('img-highlights').src = assets[view].highlights;
}

document.getElementById('btn-front').onclick = () => switchView('front');
document.getElementById('btn-back').onclick = () => switchView('back');

// Modal Logic
const modal = document.getElementById('successModal');
document.getElementById('finalizeBtn').onclick = () => modal.style.display = 'flex';
document.getElementById('closeModalBtn').onclick = () => modal.style.display = 'none';

switchView('front');
