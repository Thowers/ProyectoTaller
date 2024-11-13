function mostrarPopup(artista, lugar, fecha,buyLink) {
    document.getElementById("popup-title").innerText = `${artista} en concierto`;
    document.getElementById("popup-location").innerText = `País: ${lugar}`;
    document.getElementById("popup-date").innerText = `Fecha: ${fecha}`;
    document.getElementById("popup-button").onclick = function() {
        window.location.href = buyLink; // Redirige al link de compra específico
    };
    document.getElementById("popup-overlay").style.display = "flex";
}

function cerrarPopup() {
    document.getElementById("popup-overlay").style.display = "none";
}

// Chat de soporte
function toggleChat() {
    const chatModal = document.getElementById('chatModal');
    chatModal.style.display = chatModal.style.display === 'block' ? 'none' : 'block';
}