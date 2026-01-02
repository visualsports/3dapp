// Inicializar el lienzo técnico oculto (65x80cm)
const canvas = new fabric.Canvas('production-canvas', { 
    width: 650, 
    height: 800, 
    backgroundColor: '#FFFFFF' 
});

// Función para proyectar el diseño del plano al maniquí visual
function syncView() {
    const dataURL = canvas.toDataURL({ format: 'png' });
    const mask = document.getElementById('dynamic-mask');
    mask.style.backgroundImage = `url(${dataURL})`;
    mask.style.backgroundSize = 'contain';
    mask.style.backgroundRepeat = 'no-repeat';
    mask.style.backgroundPosition = 'center';
}

// Carga de logos
document.getElementById('logoUpload').onchange = function(e) {
    const reader = new FileReader();
    reader.onload = function(f) {
        fabric.Image.fromURL(f.target.result, function(img) {
            img.scaleToWidth(150);
            canvas.add(img);
            canvas.centerObject(img);
            syncView();
        });
    };
    reader.readAsDataURL(e.target.files[0]);
};
