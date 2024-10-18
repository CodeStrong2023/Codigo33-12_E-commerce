const shopContent = document.getElementById("shopContent");
const cart = [];

//NO TOCAR
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

// Función para renderizar los productos agrupados por marca, nombre y color
function renderProducts(productos) {
    // Agrupar productos por marca, nombre y color
    const productosAgrupados = {};
    
    productos.forEach((producto) => {
        const key = `${producto.marca}-${producto.nombre}-${producto.color}`;
        
        if (!productosAgrupados[key]) {
            productosAgrupados[key] = [];
        }
        
        productosAgrupados[key].push(producto);
    });

    // Renderizar un producto por cada grupo, con opción de elegir talle
    Object.values(productosAgrupados).forEach((grupo) => {
        const primerProducto = grupo[0]; // Usamos el primer producto del grupo para mostrarlo

        const content = document.createElement("div");
        content.classList.add("product");

        content.innerHTML = `
            <img src="${primerProducto.url_imagen}" alt="${primerProducto.nombre}">
            <h3>${primerProducto.nombre}</h3>
            <p>Precio: $${primerProducto.precio}</p>
            <div class="talles-container">
                <p>Selecciona un talle:</p>
                ${grupo.map(producto => `
                    <button class="talle-button" data-talle="${producto.talle}">
                        ${producto.talle}
                    </button>
                `).join('')}
            </div>
        `;
        shopContent.append(content);

        const talleButtons = content.querySelectorAll(".talle-button");
        let selectedTalle = null;

        talleButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                selectedTalle = event.target.getAttribute("data-talle");
                // Remover clase activa de otros botones
                talleButtons.forEach(btn => btn.classList.remove("active"));
                // Agregar clase activa al botón seleccionado
                event.target.classList.add("active");
            });
        });

        const buyButton = document.createElement("button");
        buyButton.innerText = "COMPRAR";
        buyButton.classList.add("buy-button");

        content.append(buyButton);

        buyButton.addEventListener("click", () => {
            if (!selectedTalle) {
                alert("Por favor selecciona un talle antes de comprar.");
                return;
            }
        
        
            // Convertir el talle seleccionado y el talle de los productos en el mismo tipo
            const productoSeleccionado = grupo.find(producto => String(producto.talle) === String(selectedTalle));
        
            if (!productoSeleccionado) {
                alert("No se ha encontrado el producto con el talle seleccionado.");
                return;
            }
        
            // Continuar con el proceso de agregar al carrito...
            const repeat = cart.some((repeatProduct) => repeatProduct.id === productoSeleccionado.id);
        
            if (repeat) {
                cart.map((prod) => {
                    if (prod.id === productoSeleccionado.id) {
                        prod.quanty++;
                    }
                });
            } else {
                cart.push({
                    id: productoSeleccionado.id,
                    nombre: productoSeleccionado.nombre,
                    precio: productoSeleccionado.precio,
                    talle: productoSeleccionado.talle,
                    quanty: 1,
                    imagen: productoSeleccionado.url_imagen 
                });
            }
        });
        
    });
}



// Llamada a la función para obtener los productos al cargar la página
fetchProducts();


