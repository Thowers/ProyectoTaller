// Seleccionar el contenedor del popup y los elementos de imagen, título y texto
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const closeButton = document.querySelector(".close-button");

// Función para abrir el popup con los datos del artista
function openPopup(imageSrc, title, description) {
    popupImage.src = imageSrc;
    popupTitle.textContent = title;
    popupText.textContent = description;
    popup.style.display = "flex"; // Mostrar el popup con estilo centrado
}

// Añadir el evento de clic a cada imagen
document.querySelectorAll(".disco-image").forEach(image => {
    image.addEventListener("click", () => {
        const imageSrc = image.getAttribute("data-image");
        const title = image.getAttribute("data-title");
        const description = image.getAttribute("data-description");
        openPopup(imageSrc, title, description);
    });
});

// Cerrar el popup al hacer clic en la "x"
closeButton.addEventListener("click", () => {
    popup.style.display = "none";
});

// Cerrar el popup al hacer clic fuera del contenido
window.addEventListener("click", event => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});

// Añadir evento de clic a cada imagen de álbum
document.querySelectorAll(".album-image").forEach(image => {
    image.addEventListener("click", () => {
        const url = image.getAttribute("data-url");
        if (url) {
            window.open(url, "_blank"); // Abre el enlace en una nueva pestaña
        }
    });
});