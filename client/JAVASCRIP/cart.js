document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContainer = document.getElementById("modal-container");
    const cartBtn = document.getElementById("cart-btn");

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
                product.quanty++;
                displayCart();
            });

            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
            });
        });

        // Footer del modal
        const total = cart.reduce((acc, el) => acc + (el.precio * el.quanty), 0);

        const modalFooter = document.createElement('div');
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `
            <div class="total-price">Total: ${total}</div>
        `;

        modalContainer.append(modalFooter);
    };

    // Asignar el evento click al botón del carrito
    cartBtn.addEventListener("click", displayCart);

    // Función para eliminar productos del carrito
    const deleteCartProduct = (id) => {
        const foundId = cart.findIndex((elemento) => elemento.id === id);
        cart.splice(foundId, 1);
        displayCart();
    };
});

