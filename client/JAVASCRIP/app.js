const shopContent = document.getElementById("shopContent");
const cart = [];

productos.forEach((producto) => {
    const content = document.createElement("div");
    content.classList.add("product"); // Agregar clase

    content.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.productName}">
        <h3>${producto.productName}</h3>
        <p>${producto.price}</p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";
    buyButton.classList.add("buy-button"); // Agregar clase

    content.append(buyButton);

    buyButton.addEventListener("click", () => {
        cart.push({
            id: producto.id,
            productName: producto.productName,
            price: producto.price,
            quanty: producto.quanty,
            imagen: producto.imagen
        });
        console.log(cart);
    });
});
