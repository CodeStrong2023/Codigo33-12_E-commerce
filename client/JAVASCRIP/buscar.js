// buscar.js
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const shopContent = document.getElementById('shopContent');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
            // Si no hay término de búsqueda, puedes mostrar un mensaje o simplemente no hacer nada
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/zapatillas?search=${encodeURIComponent(searchTerm)}`);
            
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const zapatillas = await response.json();

            // Limpiar el contenido previo
            shopContent.innerHTML = '';

            // Verificar si hay resultados
            if (zapatillas.length === 0) {
                shopContent.innerHTML = '<p>No se encontraron resultados.</p>';
                return;
            }

            // Renderizar los resultados
            zapatillas.forEach(zapatilla => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card'); // Asegúrate de tener estilos para esta clase
                productCard.innerHTML = `
                    <h2>${zapatilla.nombre}</h2>
                    <p>Color: ${zapatilla.color}</p>
                    <p>Talle: ${zapatilla.talle}</p>
                    <p>Precio: $${zapatilla.precio}</p>
                `;
                shopContent.appendChild(productCard);
            });
        } catch (error) {
            console.error('Error al buscar zapatillas:', error);
            shopContent.innerHTML = '<p>Error al buscar los productos. Inténtalo de nuevo más tarde.</p>';
        }
    });
});

