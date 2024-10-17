const shopContent = document.getElementById("shopContent");
const cart = [];

// Función para obtener los productos
async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:4000/api/zapatillas");
        if (!response.ok) {
            throw new Error("Error al obtener los productos");
        }
        const productos = await response.json();
        renderProducts(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

// Función para renderizar los productos en el DOM
function renderProducts(productos) {
    productos.forEach((producto) => {
        const content = document.createElement("div");
        content.classList.add("product");

        content.innerHTML = `
            <img src="${producto.url_imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Talle: ${producto.talle}</p>
            <p>$${producto.precio}</p>
        `;
        shopContent.append(content);

        const buyButton = document.createElement("button");
        buyButton.innerText = "COMPRAR";
        buyButton.classList.add("buy-button");

        content.append(buyButton);

        buyButton.addEventListener("click", () => {
            const repeat = cart.some((repeatProduct) => repeatProduct.id === producto.id);
            if (repeat) {
                cart.map((prod) => {
                    if (prod.id === producto.id) {
                        prod.quanty++;
                    }
                });
            } else {
                cart.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    talle: producto.talle,
                    quanty: 1,
                    imagen: producto.url_imagen 
                });
            }
            console.log(cart);
        });
    });
}

// Llamada a la función para obtener los productos al cargar la página
fetchProducts();


