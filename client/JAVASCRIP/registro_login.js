// Array de usuarios pre-registrados
const usuarios = [
    {
        'username': 'gianellaAchetoni',
        'email':'gianellaachetoni@gmail.com',
        'contraseña': '123456'
    },
    {
        'username': 'ezequielFlores',
        'email': 'ezequiel@gmail.com', 
        'contraseña': '123456'
    },
    {
        'username': 'jessiPagano',
        'email': 'jessi@gmail.com', 
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
            <div class="input-group password-container">
                <div class="password">
                    <input type="password" id="password" name="password" placeholder=" 🔒 CONTRASEÑA" required>
                </div>
                <div class="password">
                    <input type="password" id="confirm_password" name="confirm_password" placeholder=" 🔒 CONFIRMAR" required>
                </div>
            </div>
            <div class="input-group">
                <input type="text" id="years" name="years" placeholder=" EDAD" required>
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

// Función para restaurar contraseña
function mostrarRestaurador() {
    containerLogin.innerHTML = `
        <h2>Restaurar Contraseña</h2>
        <form id="restaurarform"> <!-- Corregido from a form -->
            <div class="input-group">
                <input type="email" id="email" name="email" placeholder=" ✉️ EMAIL" required>
            </div>
            <button type="submit" class="boton">RESTAURAR</button>
        </form>
        <p>Recordaste la contraseña? <a href="#" id="iniciarSesionLink">Iniciar Sesión</a></p>
        <p>No tienes cuenta? <a href="#" id="registrarseLink">Resgistrarse</a></p>
    `;

    document.getElementById('restaurarform').addEventListener('submit', function(e) {
        e.preventDefault();
        consultaEmail();
    });

    document.getElementById('iniciarSesionLink').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarLogin();
    });

    document.getElementById('registrarseLink').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarRegistro();
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
            <p>Olvidaste tu contraseña? <a href="#" id="restaurarContraseña">Restaurar contraseña.</a></p>
            <button type="submit" class="boton">INGRESAR</button>
        </form>
        <p>No tienes cuenta? <a href="#" id="registrarseLink">Registrarse</a></p>
    `;

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        consultaUsuario();
    });

    document.getElementById('restaurarContraseña').addEventListener('click', function(e){
        e.preventDefault();
        mostrarRestaurador();
    })

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
    const edad = document.getElementById('years').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    //Funcion para verificar que la contraseña sea la misma que el de confirmar contraseña
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }
    //Funcion para verificar que sea mayor de edad
    if (edad < '18') {
        alert('Lo siento, debes ser mayor de edad')
        return;
    }

    //Funcion para verificar que el email no corresponda a ningun usuario existente
    const emailEncontrado = usuarios.find(usuario => usuario.email === email);
    if (emailEncontrado) {
        alert("Este email pertenece a una cuenta existente");
        return;
    }

    //Ingresar el nuevoUsuario 
    const nuevoUsuario = {
        username: username,
        email: email,
        contraseña: password,
        edad: edad
    };

    usuarios.push(nuevoUsuario);

    alert("Registro exitoso!");
    mostrarLogin();
}

// Función para verificar si el correo existe y enviar email con contraseña
function consultaEmail() {
    const email = document.getElementById('email').value;

    // Realizar la solicitud al servidor Node.js
    fetch('http://localhost:5500/enviar-contraseña', {  // Aquí está la URL correcta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })  // Enviar el email en el cuerpo de la solicitud
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Correo enviado exitosamente') {
            alert('Se ha enviado tu contraseña a tu correo.');
            mostrarLogin();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar el correo');
    });
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

