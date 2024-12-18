body {
 
document.querySelectorAll('.foto img').forEach(img => {
    img.addEventListener('click', function() {
        // Eliminar el borde de enfoque al hacer clic en la imagen
        this.style.outline = 'none';
        this.style.border = 'none';

        // Crear el popup con la imagen clickeada
        let popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <button class="close-popup">Cerrar</button>
        `;

        // Añadir el popup al cuerpo de la página
        document.body.appendChild(popup);

        // Cerrar el popup al hacer clic en el botón
        document.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
        });

        // Asegurarse de que el popup aparezca de manera correcta
        popup.style.display = 'flex';
    });
});
