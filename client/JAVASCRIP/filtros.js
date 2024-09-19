const filtro = document.getElementById("filters");
const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");
const aplica = [];

const displayCart = () => {
    // Resetear el contenido del modal y mostrarlo
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
        <div>
            <ul>
                <li class="lista-de-filtros">ORDENAR
                    <select id="ordenar" name="ordenar">
                        <option value="menorMayor">Precio (Menor a Mayor)</option>
                        <option value="mayorMenor">Precio (Mayor a Menor)</option>
                        <option value="novedades">Novedades</option>
                    </select>
                </li>
                <li class="lista-de-filtros">MARCAS
                    <select id="marcas" name="marcas">
                        <option value="Adidas">Adidas</option>
                        <option value="Nike">Nike</option>
                        <option value="New Balance">New Balance</option>
                        <option value="Todos">Todos</option>
                    </select>
                </li>
                <li class="lista-de-filtros">TALLE
                    <select id="talle" name="talle">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="Todos">Todos</option>
                    </select>
                </li>
                <li class="lista-de-filtros">COLORES
                    <select id="colores" name="colores">
                        <option value="Azul">Azul</option>
                        <option value="Rojo">Rojo</option>
                        <option value="Negro">Negro</option>
                        <option value="Blanco">Blanco</option>
                        <option value="Verde">Verde</option>
                        <option value="Todos">Todos</option>
                    </select>
                </li>
                <li class="lista-de-filtros">GÉNERO
                    <select id="genero" name="genero">
                        <option value="Femenino">Femenino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Unisex">Unisex</option>
                        <option value="Todos">Todos</option>
                    </select>
                </li>
            </ul>
        </div>
    `;
    modalContainer.append(modalBody);

    // Crear el botón para aplicar los filtros seleccionados
    const modalApli = document.createElement('div');
    modalApli.innerHTML = "Aplicar";
    modalApli.className = "modal-apli";

    // Crear el botón para reiniciar los valores
    const modalReset = document.createElement('div');
    modalReset.innerHTML = "Reiniciar";
    modalReset.className = "modal-reset";

    // Al hacer clic en aplicar, toma los valores seleccionados de los filtros
    modalApli.addEventListener("click", () => {
        const marca = document.getElementById('marcas').value;
        const talle = document.getElementById('talle').value;
        const colores = document.getElementById('colores').value;
        const genero = document.getElementById('genero').value;
        const ordenar = document.getElementById('ordenar').value;
        aplica.push({
            marca: marca,
            talle: talle,
            colores: colores,
            genero: genero,
            ordenar: ordenar
        });

        console.log(aplica);

        // Cerrar el modal
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    // Al hacer clic en reiniciar, restablece todos los filtros a los valores por defecto
    modalReset.addEventListener("click", () => {
        const marca = document.getElementById('marcas').value = "Todos";
        const talle = document.getElementById('talle').value = "Todos";
        const colores = document.getElementById('colores').value = "Todos";
        const genero = document.getElementById('genero').value = "Todos";
        const ordenar = document.getElementById('ordenar').value = "novedades";
        aplica.push({
            marca: marca,
            talle: talle,
            colores: colores,
            genero: genero,
            ordenar: ordenar
        });

        console.log(aplica);
        // Cerrar el modal
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    // Añadir ambos botones al modal
    modalContainer.append(modalApli);
    modalContainer.append(modalReset);
};

// Añadir el event listener al botón que abre el modal
filtro.addEventListener("click", displayCart);
