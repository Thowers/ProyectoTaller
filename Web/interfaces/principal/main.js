// Función de búsqueda (simulación)
function buscar() {
    let terminoBusqueda = document.getElementById("searchInput").value;
    if (terminoBusqueda) {
        alert("Buscando: " + terminoBusqueda);
    } else {
        alert("Por favor ingresa un término de búsqueda.");
    }
}

// Función para el botón de "Explora Ahora" (lleva a la sección de Artistas)
function explora() {
    window.location.href = "#artistas";
}