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

let cart = []; // Array para almacenar los productos del carrito

// Función para añadir productos al carrito
function addToCart(productName, price) {
    // Añadir producto al carrito
    cart.push({ name: productName, price: price });

    // Actualizar la interfaz del carrito
    updateCartPopup();
}

// Función para actualizar el pop-up del carrito
function updateCartPopup() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Limpiar el contenido actual del carrito
    cartItemsContainer.innerHTML = '';
    
    // Agregar los productos al pop-up
    let total = 0;
    cart.forEach(item => {
        cartItemsContainer.innerHTML += `<p>${item.name} - $${item.price}</p>`;
        total += item.price;
    });

    // Actualizar el total
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Función para mostrar o ocultar el pop-up del carrito
function toggleCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = (cartPopup.style.display === 'flex') ? 'none' : 'flex';
}

// Función para finalizar la compra (esto puede ser un enlace o una acción en tu backend)
function checkout() {
    alert("Proceso de compra finalizado. ¡Gracias por tu compra!");
    cart = []; // Limpiar carrito después de la compra
    updateCartPopup(); // Actualizar el pop-up para reflejar que el carrito está vacío
    toggleCartPopup(); // Cerrar el pop-up
}