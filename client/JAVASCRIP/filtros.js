const filtro = document.getElementById("filters");
const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");


const displayCart = () =>{
    //Setteo de inicio
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    //Modal header
    const modalHeader = document.createElement('div');

    const modalClose = document.createElement('div');
    modalClose.innerText = "x"
    modalClose.className = "modal-close";
    modalContainer.append(modalHeader);

    // Boton cerrar
    modalClose.addEventListener("click", ()=>{
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    })

    modalHeader.append(modalClose);

    const modalTitle = document.createElement('div');
    modalTitle.innerText = "Filtros";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    const modalBody = document.createElement('div');
    modalBody.className = "modal-body";
    modalBody.innerHTML = `
    <div class="Lista-de-filtros">
        <ul>
            <li>MARCAS <select name="marcas">
                <option>Adidas</option>
                <option>Nike</option>
                <option>New balance</option>
                <option>Ninguno</option>
            </select></li>
            
            <li>TALLE <select name="talle">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>Ninguno</option>
            </select></li>
            
            <li>COLORES <select name="colores">
                <option>Azul</option>
                <option>Rojo</option>
                <option>Negro</option>
                <option>Blanco</option>
                <option>Verde</option>
                <option>Ninguno</option>
            </select></li>
            
            <li>GENERO <select name="genero">
                <option>Femenino</option>
                <option>Masculino</option>
                <option>Unisex</option>
                <option>Ninguno</option>
            </select></li>
            
        </ul>
    </div>
    `;

    modalContainer.append(modalBody);
}

filtro.addEventListener("click", displayCart)