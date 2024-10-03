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
    buyButton.innerText = "COMPRAR";
    buyButton.classList.add("buy-button"); // Agregar clase

    content.append(buyButton);

    //Para agregar mas uno del mismo producto y no se duplique
    buyButton.addEventListener("click", ()=>{
        const repeat = cart.some((repeatProduct) => repeatProduct.id === producto.id); //Si encuentra es un true y sino es false
        if(repeat){
            cart.map((prod) => {
                if(prod.id === producto.id){
                    prod.quanty++;
                }
            });
        }else{
            cart.push({
                id:producto.id,
                productName:producto.productName,
                price:producto.price,
                quanty:producto.quanty,
                imagen:producto.imagen
            })
        }  
    })
});
