// Obtener el header
const heroHeader = document.getElementById('heroHeader');

// Función para ajustar el tamaño del header al hacer scroll
window.onscroll = function() {
    if (window.scrollY > 50) {
        heroHeader.classList.add('shrink');
    } else {
        heroHeader.classList.remove('shrink');
    }
};
