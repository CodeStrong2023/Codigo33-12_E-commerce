// Array para almacenar usuarios registrados
let usuariosRegistrados = [];

// Elementos del DOM
const containerLogin = document.getElementById('container-login');

// Función para mostrar el formulario de registro
function mostrarRegistro() {
    // Cambiar el contenido del containerLogin con el formulario de registro
    containerLogin.innerHTML = `
        <h2>Registrarse</h2>
        <form id="registerForm">
            <div class="input-group">
                <input type="text" id="username" name="username" placeholder=" 👤 USUARIO" autocomplete="username" required>
            </div>
            <div class="input-group">
                <input type="email" id="email" name="email" placeholder=" ✉️ EMAIL" autocomplete="email" required>
            </div>
            <div class="input-group">
                <input type="password" id="password" name="password" placeholder=" 🔒 CONTRASEÑA" autocomplete="new-password" required>
            </div>
            <div class="input-group">
                <input type="password" id="confirm_password" name="confirm_password" placeholder=" 🔒 CONFIRMAR CONTRASEÑA" autocomplete="new-password" required>
            </div>
            <button type="submit" class="boton">REGISTRARSE</button>
        </form>
        <p>Ya tienes cuenta? <a href="#" id="iniciarSesionLink">Iniciar Sesión</a></p>
    `;

    // Añadir el event listener para el formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío del formulario
        registrarUsuario(); // Registrar el usuario
    });

    // Añadir event listener para volver al formulario de inicio de sesión
    document.getElementById('iniciarSesionLink').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarLogin(); // Mostrar el formulario de inicio de sesión
    });
}

// Función para mostrar el formulario de login
function mostrarLogin() {
    // Cambiar el contenido del containerLogin con el formulario de login
    containerLogin.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <form action="login.php" method="post" id="loginForm">
            <div class="input-group">
                <input type="text" id="username" name="username" placeholder=" 👤 USUARIO" required>
            </div>
            <div class="input-group">
                <input type="password" id="password" name="password" placeholder=" 🔒 CONTRASEÑA" autocomplete="current-password" required>
            </div>
            <p>Olvidaste tu contraseña? <a href="#">Restaurar contraseña.</a></p>
            <button type="submit" class="boton">INGRESAR</button>
        </form>
        <p>No tienes cuenta? <a href="#" id="registrarseLink">REGISTRARSE</a></p>
    `;

    // Añadir event listener para cambiar al formulario de registro
    document.getElementById('registrarseLink').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarRegistro(); // Mostrar el formulario de registro
    });
}

// Función para registrar un usuario
function registrarUsuario() {
    // Obtener los valores de los campos del formulario de registro
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    // Crear un objeto usuario y añadirlo al array de usuarios registrados
    const nuevoUsuario = {
        username: username,
        email: email,
        password: password
    };

    usuariosRegistrados.push(nuevoUsuario);

    // Mostrar un mensaje de éxito y limpiar el formulario
    alert("Registro exitoso!");
    console.log("Usuarios registrados:", usuariosRegistrados);

    // Mostrar el formulario de login después del registro
    mostrarLogin();
}

// Inicialización: añadir evento al enlace de registro al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrarseLink').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarRegistro(); // Mostrar el formulario de registro
    });
});