document.querySelector('.search__btn').addEventListener('click', async () => {
    // Obtener el término de búsqueda ingresado por el usuario
    const search = document.querySelector('.input').value.trim();

    // Validar que el término de búsqueda no esté vacío
    if (!search) {
        console.log("Por favor, ingrese un término de búsqueda.");
        return;
    }

    console.log("Término de búsqueda:", search);

    try {
        // Hacer la solicitud al backend con el término de búsqueda
        const response = await fetch(`http://localhost:4000/api/zapatillas?search=${encodeURIComponent(search)}`);
        
        // Comprobar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud al backend');
        }

        // Obtener los datos de la respuesta
        const data = await response.json();
        console.log("Datos recibidos:", data);

        // Limpiar los resultados previos
        const shopContent = document.getElementById('shopContent');
        shopContent.innerHTML = ''; // Limpiar contenido anterior

        // Verificar si hay resultados
        if (data.length === 0) {
            shopContent.innerHTML = '<p>No se encontraron productos que coincidan con la búsqueda.</p>';
            return;
        }

        // Renderizar los productos encontrados en el DOM
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card'; // Asegúrate de que tienes un estilo para esto

            productCard.innerHTML = `
                <h3>${product.nombre}</h3>
                <p>Color: ${product.color}</p>
                <p>Talle: ${product.talle}</p>
                <p>Precio: $${product.precio}</p>
                <button class="buy-btn">Comprar</button>
            `;

            shopContent.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error al hacer la búsqueda:", error);
    }
});
