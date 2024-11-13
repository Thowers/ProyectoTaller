function navigateTo(section) {
    switch(section) {
        case 'crearArtista':
            window.location.href = "crear_artista.html";
            break;
        case 'añadirDisco':
            window.location.href = "añadir_disco.html";
            break;
        case 'añadirMerch':
            window.location.href = "añadir_merch.html";
            break;
        default:
            console.log("Sección no disponible");
    }
}