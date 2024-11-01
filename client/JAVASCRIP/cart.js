document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContainer = document.getElementById("modal-container");
    const cartBtn = document.getElementById("cart-btn");

    //MercadoPago 
    const mp = new MercadoPago('APP_USR-ee55e85a-ec0e-4818-8bcc-c6cc28e5459e', {
        locale: 'es-AR' 
    });

    const displayCart = () => {
        // Inicializa el modal
        modalContainer.innerHTML = "";
        modalContainer.style.display = "block";
        modalOverlay.style.display = "block";

        // Crear el header del modal
        const modalHeader = document.createElement('div');
        const modalClose = document.createElement('div');
        modalClose.innerText = "❌";
        modalClose.className = "modal-close";
        modalContainer.append(modalHeader);

        // Botón para cerrar el modal
        modalClose.addEventListener("click", () => {
            modalContainer.style.display = "none";
            modalOverlay.style.display = "none";
        });

        modalHeader.append(modalClose);

        const modalTitle = document.createElement('div');
        modalTitle.innerText = "Carrito";
        modalTitle.className = "modal-title";
        modalHeader.append(modalTitle);

        // Cuerpo del modal
        cart.forEach((product) => {
            const modalBody = document.createElement('div');
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
                <div class="product">
                    <img class="product" src="${product.imagen}"/>
                    <div class="product-info">
                        <h4>${product.nombre}</h4>
                        <p>Talle: ${product.talle}</p>
                    </div>
                    <div class="quantity">
                        <span class="quantity-btn-decrese">-</span>
                        <span class="quantity-input">${product.quanty}</span>
                        <span class="quantity-btn-increse">+</span>
                    </div>
                    <div class="price">${product.precio * product.quanty}</div>
                    <div class="delete-product">❌</div>
                </div>
            `;

            modalContainer.append(modalBody);

            // Lógica para aumentar/disminuir la cantidad y eliminar productos
            const decrese = modalBody.querySelector(".quantity-btn-decrese");
            decrese.addEventListener("click", () => {
                if (product.quanty !== 1) {
                    product.quanty--;
                    displayCart();
                }
            });

            const increse = modalBody.querySelector(".quantity-btn-increse");
            increse.addEventListener("click", () => {
                if (product.quanty < product.stock) {
                    product.quanty++;
                    displayCart();
                }
            });

            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
            });
        });

        // Footer del modal
        const total = cart.reduce((acc, el) => acc + (el.precio * el.quanty), 0);
        const orderData = {
            title: "Su compra",
            quantity: cart.length, // O la cantidad total de productos si es necesario
            price: total, // Asegúrate de que `total` sea mayor que cero
        };


        const modalFooter = document.createElement('div');
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `
            <div class="total-price">Total: ${total}</div>
            <button class= "btn-primary" id= "buy-button">checkout</button>
            <div id="wallet_container"></div> 
        `; //para MercadoPago

        modalContainer.append(modalFooter);

        document.getElementById("buy-button").addEventListener("click", async () => {
            try {
                const response = await fetch("http://localhost:4000/create_preference", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                });
    
                const preference = await response.json();
                if (!preference.id) {
                    throw new Error("Preferencia no válida");
                }
                createCheckoutButton(preference.id);
            } catch (error) {
                console.error("Error al crear la preferencia:", error);
                alert("error");
            }
        });
    };

    const createCheckoutButton = (preferenceId) => {
        const bricksBuilder = mp.bricks();
    
        const renderComponent = async () => {
            if (window.checkoutButton) window.checkoutButton.unmount();
    
            await bricksBuilder.create("wallet", "wallet_container", {
                initialization: {
                    preferenceId: preferenceId, // Asegúrate de que preferenceId no sea undefined
                },
            });
        };
        renderComponent();
    };
    

    // Función para eliminar productos del carrito
    const deleteCartProduct = (id) => {
        const foundId = cart.findIndex((elemento) => elemento.id === id);
        cart.splice(foundId, 1);
        displayCart();
    };

     // Asignar el evento click al botón del carrito
     cartBtn.addEventListener("click", displayCart);
});


