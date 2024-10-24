// NO TOCAR NADA
//ACA NOHAY FRON PARA MANIPULAR ES TODO PARA LA CONSULTA CON EL BACK
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const shopContent = document.getElementById('shopContent');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
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
            renderProducts(zapatillas); 

        } catch (error) {
            console.error('Error al buscar zapatillas:', error);
            shopContent.innerHTML = '<p>Error al buscar los productos. Inténtalo de nuevo más tarde.</p>';
        }
    });
});

