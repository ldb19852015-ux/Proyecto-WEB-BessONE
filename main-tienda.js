// Selección de elementos HTML
const btnCart = document.querySelector('.container-cart-icon');  // Botón para abrir el carrito
const containerCartProducts = document.querySelector('.container-cart-products'); // Contenedor de los productos en el carrito
const cartInfo = document.querySelector('.cart-product');  // Información de los productos en el carrito
const rowProduct = document.querySelector('.row-product');  // Fila de productos en el carrito
const productList = document.querySelector('.container-items');  // Lista de productos en la tienda
let allProducts = [];  // Arreglo para almacenar los productos añadidos al carrito
const valorTotal = document.querySelector('.total-pagar');  // Elemento para mostrar el total
const countProducts = document.querySelector('#contador-productos');  // Elemento para contar los productos
const cartEmpty = document.querySelector('.cart-empty');  // Mensaje cuando el carrito está vacío
const cartTotal = document.querySelector('.cart-total');  // Contenedor de los totales del carrito
const btnWhatsApp = document.querySelector('.btn-whatsapp');  // Botón para enviar el pedido por WhatsApp

// Evento para mostrar/ocultar el carrito al hacer clic en el icono del carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Evento para añadir productos al carrito
productList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {  // Verifica si se ha hecho clic en el botón de añadir
        const product = e.target.parentElement;  // Obtiene el contenedor del producto

        const infoProduct = {  // Crea un objeto con la información del producto
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        // Verifica si el producto ya existe en el carrito
        const exits = allProducts.some(product => product.title === infoProduct.title);

        if (exits) {  // Si el producto ya existe, incrementa su cantidad
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;  // Aumenta la cantidad del producto
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];  // Actualiza el array con los productos modificados
        } else {  // Si el producto no existe, lo añade al carrito
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();  // Actualiza la vista del carrito
    }
});

// Evento para eliminar productos del carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {  // Verifica si se ha hecho clic en el icono de eliminar
        const product = e.target.parentElement;  // Obtiene el contenedor del producto
        const title = product.querySelector('p').textContent;  // Obtiene el nombre del producto

        // Filtra el carrito para eliminar el producto seleccionado
        allProducts = allProducts.filter(product => product.title !== title);
        showHTML();  // Actualiza la vista del carrito
    }
});

// Función para actualizar la vista del carrito
const showHTML = () => {
    // Si el carrito está vacío, muestra el mensaje correspondiente y oculta los totales
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {  // Si hay productos, muestra la información del carrito
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Vacía el contenido actual de los productos en el carrito
    rowProduct.innerHTML = '';

    let total = 0;  // Variable para calcular el total del carrito
    let totalOfProducts = 0;  // Variable para contar la cantidad total de productos

    // Recorre todos los productos en el carrito y los muestra
    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        // Añade el contenido HTML del producto
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        `;

        rowProduct.append(containerProduct);  // Añade el producto al carrito

        // Calcula el total y la cantidad de productos
        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    // Actualiza el total y la cantidad de productos en el carrito
    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;

    // Genera el enlace de WhatsApp y lo asigna al botón
    const enlaceWhatsApp = generateWhatsAppLink();
    btnWhatsApp.href = enlaceWhatsApp;
};

// Función para generar el enlace de WhatsApp con los detalles del pedido
const generateWhatsAppLink = () => {
    let mensaje = "¡Hola! Me gustaría hacer un pedido con los siguientes productos:\n";
    let total = 0;

    // Recorre los productos y genera el mensaje con el detalle
    allProducts.forEach(product => {
        mensaje += `${product.title} x${product.quantity} - $${product.price.slice(1) * product.quantity}\n`;
        total += product.quantity * parseInt(product.price.slice(1));  // Calcula el total del pedido
    });

    // Añade el total al final del mensaje
    mensaje += `\nTotal: $${total}\n\nPor favor, ¿puedo recibir más detalles para finalizar mi compra?`;
    
    const numeroTelefono = "5491158024010";  // Número de WhatsApp al que se enviará el mensaje
    const mensajeCodificado = encodeURIComponent(mensaje);  // Codifica el mensaje para la URL
    const enlaceWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;  // Crea el enlace de WhatsApp

    return enlaceWhatsApp;  // Retorna el enlace generado
};
