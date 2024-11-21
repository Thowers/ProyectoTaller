// Seleccionar el contenedor del popup y los elementos de imagen, título y texto
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const closeButton = document.querySelector(".close-button");

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el tipo de usuario y el estado de la sesión desde localStorage
    const userType = localStorage.getItem('tipo');
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    // Validar si el usuario está logueado y si el tipo de usuario es correcto
    console.log('Tipo de usuario desde localStorage:', userType);
    console.log('Usuario logueado:', userLoggedIn);

    // Si el usuario ha iniciado sesión y el tipo es 'moderador', mostrar el botón
    if (userLoggedIn && userType === 'moderador') {
        document.querySelector('.back-button').style.display = 'block'; // Mostrar el botón
    } else {
        document.querySelector('.back-button').style.display = 'none'; // Ocultar el botón
    }
});

// Función para manejar el inicio de sesión
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Datos de usuario:', data); // Depuración
            // Almacenar tipo de usuario en localStorage
            localStorage.setItem('tipo', data.tipo);
    
            // Verificar que el tipo se ha guardado correctamente
            console.log('Tipo almacenado en localStorage:', localStorage.getItem('tipo'));
    
            // Mostrar/ocultar el botón según el tipo
            if (data.tipo === 'moderador') {
                document.querySelector('.back-button').style.display = 'block'; // Mostrar el botón
            } else {
                document.querySelector('.back-button').style.display = 'none'; // Ocultar el botón
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

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

// Chat de soporte
function toggleChat() {
    const chatModal = document.getElementById('chatModal');
    chatModal.style.display = chatModal.style.display === 'block' ? 'none' : 'block';
}


