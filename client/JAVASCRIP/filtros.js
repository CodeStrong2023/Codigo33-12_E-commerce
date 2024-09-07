const filtro = document.getElementById("filters");
const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");
const aplica = [];

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
    modalTitle.innerText = "FILTROS";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    const modalBody = document.createElement('div');
    modalBody.className = "modal-body";
    modalBody.innerHTML = `
    <div>
        <ul>
            <li class="lista-de-filtros">ORDENAR<select name="ordenar">
                <option>Precio(Menor a Mayor)</option>
                <option>Precio(Mayor a Menor)</option>
                <option>Novedades</option>
            </select></li>

            <li class="lista-de-filtros">MARCAS<select name="marcas">
                <option>Adidas</option>
                <option>Nike</option>
                <option>New balance</option>
                <option>Todos</option>
            </select></li>
            
            <li class="lista-de-filtros">TALLE<select name="talle">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>Todos</option>
            </select></li>
            
            <li class="lista-de-filtros">COLORES<select name="colores">
                <option>Azul</option>
                <option>Rojo</option>
                <option>Negro</option>
                <option>Blanco</option>
                <option>Verde</option>
                <option>Todos</option>
            </select></li>
            
            <li class="lista-de-filtros">GENERO<select name="genero">
                <option>Femenino</option>
                <option>Masculino</option>
                <option>Unisex</option>
                <option>Todos</option>
            </select></li>
            
        </ul>
    </div>
    `;
    modalContainer.append(modalBody);

    //creacion de boton para guardar las elecciones
    const modalApli = document.createElement('div');
    modalApli.innerHTML = "Aplicar";
    modalApli.className = "modal-apli";

    //boton para guardar lo que quiere aplicar
    modalApli.addEventListener("click", ()=>{
        aplica.push({
            marca: "marca",
            talle: "talle",
            colores:"colores",
            genero:"genero"
        });
        console.log(aplica);
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    
    modalContainer.append(modalApli);

}

filtro.addEventListener("click", displayCart)