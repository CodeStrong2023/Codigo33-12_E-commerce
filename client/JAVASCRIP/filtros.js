const filtro = document.getElementById("filters");
const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");

const aplica = [];

const displayFiltro = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    // Crear el header del modal
    const modalHeader = document.createElement('div');
    const modalClose = document.createElement('div');
    modalClose.innerText = "x";
    modalClose.className = "modal-close";
    modalContainer.append(modalHeader);

    // Botón para cerrar el modal
    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    modalHeader.append(modalClose);

    const modalTitle = document.createElement('div');
    modalTitle.innerText = "FILTROS";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    // Cuerpo del modal con los filtros
    const modalBody = document.createElement('div');
    modalBody.className = "modal-body";
    modalBody.innerHTML = `
        <form id="filtroForm">
            <ul>
                <li class="lista-de-filtros">ORDENAR
                    <select id="ordenarPor" name="ordenar">
                        <option value="menorMayor">Precio (Menor a Mayor)</option>
                        <option value="mayorMenor">Precio (Mayor a Menor)</option>
                        <option value="novedades">Novedades</option>
                    </select>
                </li>
                <li class="lista-de-filtros">MARCAS
                    <select id="marca" name="marcas">
                        <option value="">Todas</option>
                        <option value="Adidas">Adidas</option>
                        <option value="Nike">Nike</option>
                        <option value="Puma">Puma</option>
                    </select>
                </li>
                <li class="lista-de-filtros">TALLE
                    <select id="talle" name="talle">
                        <option value="">Todos</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                    </select>
                </li>
                <li class="lista-de-filtros">COLORES
                    <select id="color" name="colores">
                        <option value="">Todos</option>
                        <option value="Azul">Azul</option>
                        <option value="Rojo">Rojo</option>
                        <option value="Negro">Negro</option>
                        <option value="Blanco">Blanco</option>
                        <option value="Verde">Verde</option>
                        <option value="Gris">Gris</option>
                    </select>
                </li>
            </ul>
            <div class="modal-buttons">
                <button type="submit" class="modal-apli">Aplicar</button>
                <button type="button" class="modal-reset">Reiniciar</button>
            </div>
        </form>
    `;
    modalContainer.append(modalBody);


    //Esto tiene que ver directo con el back, NO TOCAR
    //NO TOCAR
    // Botón para reiniciar filtros y restaurar los productos iniciales
    document.querySelector(".modal-reset").addEventListener("click", async () => {
        document.getElementById('filtroForm').reset(); // Restablece los valores por defecto

        // Hacer una nueva solicitud para obtener todos los productos sin filtros
        try {
            const response = await fetch('http://localhost:4000/api/zapatillas');
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const productos = await response.json();

            // Limpiar el contenido previo y renderizar todos los productos
            shopContent.innerHTML = '';
            renderProducts(productos);

            // Cerrar el modal
            modalContainer.style.display = "none";
            modalOverlay.style.display = "none";
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    });

    //Esto tiene que ver con el back NO TOCAR
    //NO TOCAR
    // Añadir el event listener al formulario para enviar los filtros
    document.getElementById('filtroForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        // Obtener los valores de los filtros
        const color = document.getElementById('color').value;
        const talle = document.getElementById('talle').value;
        const marca = document.getElementById('marca').value;
        const ordenarPor = document.getElementById('ordenarPor').value;

        // Crear la URL con los filtros
        let url = 'http://localhost:4000/api/zapatillas?';
        if (color) url += `color=${color}&`;
        if (talle) url += `talle=${talle}&`;
        if (marca) url += `marca=${marca}&`;
        if (ordenarPor) url += `ordenarPor=${ordenarPor}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const productos = await response.json();

            // Limpiar el contenido previo antes de renderizar los productos filtrados
            shopContent.innerHTML = ''; 
            
            // Renderizar los productos usando la función renderProducts
            if (productos.length > 0) {
                renderProducts(productos); // Usa tu función renderProducts para mostrar los productos
            } else {
                // Si no se encuentran productos, mostrar un mensaje
                shopContent.innerHTML = '<p>No se encontraron productos.</p>';
            }

            // Cerrar el modal
            modalContainer.style.display = "none";
            modalOverlay.style.display = "none";
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    });
};

// Añadir el event listener al botón que abre el modal
filtro.addEventListener("click", displayFiltro);

