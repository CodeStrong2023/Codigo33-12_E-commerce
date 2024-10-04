// Array de usuarios pre-registrados
const usuarios = [
    {
        'username': 'gianellaAchetoni',
        'contraseña': '123456'
    },
    {
        'username': 'ezequielFlores',
        'contraseña': '123456'
    },
    {
        'username': 'jessiPagano',
        'contraseña': '123456'
    }
];

// Elementos del DOM
const containerLogin = document.getElementById('container-login');

// Función para mostrar el formulario de registro
function mostrarRegistro() {
    containerLogin.innerHTML = `
        <h2>Registrarse</h2>
        <form id="registerForm">
            <div class="input-group">
                <input type="text" id="username" name="username" placeholder=" 👤 USUARIO" required>
            </div>
            <div class="input-group">
                <input type="email" id="email" name="email" placeholder=" ✉️ EMAIL" required>
            </div>
            <div class="input-group">
                <input type="password" id="password" name="password" placeholder=" 🔒 CONTRASEÑA" required>
            </div>
            <div class="input-group">
                <input type="password" id="confirm_password" name="confirm_password" placeholder=" 🔒 CONFIRMAR CONTRASEÑA" required>
            </div>
            <button type="submit" class="boton">REGISTRARSE</button>
        </form>
        <p>Ya tienes cuenta? <a href="#" id="iniciarSesionLink">Iniciar Sesión</a></p>
    `;

    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        registrarUsuario();
    });

    document.getElementById('iniciarSesionLink').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarLogin();
    });
}

// Función para mostrar el formulario de login
function mostrarLogin() {
    containerLogin.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <form id="loginForm">
            <div class="input-group">
                <input type="text" id="username" name="username" placeholder=" 👤 USUARIO" required>
            </div>
            <div class="input-group">
                <input type="password" id="password" name="password" placeholder=" 🔒 CONTRASEÑA"  required>
            </div>
            <p>Olvidaste tu contraseña? <a href="#">Restaurar contraseña.</a></p>
            <button type="submit" class="boton">INGRESAR</button>
        </form>
        <p>No tienes cuenta? <a href="#" id="registrarseLink">REGISTRARSE</a></p>
    `;

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        consultaUsuario();
    });

    document.getElementById('registrarseLink').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarRegistro();
    });
}

// Función para registrar un usuario
function registrarUsuario() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    const nuevoUsuario = {
        username: username,
        email: email,
        contraseña: password
    };

    usuarios.push(nuevoUsuario);

    alert("Registro exitoso!");
    mostrarLogin();
}

// Función para consultar si el usuario existe y verificar la contraseña
function consultaUsuario() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuarioEncontrado = usuarios.find(usuario => usuario.username === username);

    if (!usuarioEncontrado) {
        alert("Usuario no encontrado. Por favor, verifica tu nombre de usuario.");
        return;
    }

    if (usuarioEncontrado.contraseña !== password) {
        alert("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
        return;
    }

    alert("Inicio de sesión exitoso.");
}

// Inicialización: mostrar el formulario de inicio de sesión por defecto
document.addEventListener('DOMContentLoaded', function() {
    mostrarLogin();
});

