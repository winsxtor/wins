body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-image: url('fondo.jpg'); /* Asegúrate de cambiar esto a tu imagen */
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
}

header {
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    text-align: center;
}

nav ul {
    list-style-type: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin: 0 15px;
}

.hero {
    text-align: center;
    margin: 50px 0;
}

.events {
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
}
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
