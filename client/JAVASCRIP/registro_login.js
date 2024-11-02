// Elementos del DOM
const containerLogin = document.getElementById('container-login');

// Función para mostrar el formulario de registro
function mostrarRegistro() {
    containerLogin.innerHTML = `
        <h2>Registrarse</h2>
        <form id="registerForm">
            <div class="input-group">
                <input type="text" id="username" name="username" autocomplete="username" placeholder=" 👤 USUARIO" required>
            </div>
            <div class="input-group">
                <input type="email" id="email" name="email" autocomplete="email" placeholder=" ✉️ EMAIL" required>
            </div>
            <div class="input-group password-container">
                <div class="password">
                    <input type="password" id="password" name="password" autocomplete="new-password" placeholder=" 🔒 CONTRASEÑA" required>
                </div>
                <div class="password">
                    <input type="password" id="confirm_password" name="confirm_password" autocomplete="new-password" placeholder=" 🔒 CONFIRMAR" required>
                </div>
            </div>
            <div class="input-group">
                <input type="text" id="years" name="years" autocomplete="age" placeholder=" EDAD" required>
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
                <input type="email" id="email" name="email" autocomplete:"email" placeholder=" ✉️ EMAIL" required>
            </div>
            <button type="submit" class="boton">RESTAURAR</button>
        </form>
        <p>Recordaste la contraseña? <a href="#" id="iniciarSesionLink">Iniciar Sesión</a></p>
        <p>No tienes cuenta? <a href="#" id="registrarseLink">Resgistrarse</a></p>
    `;

    document.getElementById('restaurarform').addEventListener('submit', function(e) {
        e.preventDefault();
        restablecerContrasena();
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
async function registrarUsuario() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const edad = document.getElementById('years').value; // Asegúrate de que este ID sea correcto
    const confirmPassword = document.getElementById('confirm_password').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }
    if (edad < '18') {
        alert('Lo siento, debes ser mayor de edad');
        return;
    }
    // Validación del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    const nuevoUsuario = {
        username: username,
        userpassword: password, // Cambia 'password' a 'userpassword'
        useremail: email, // Cambia 'email' a 'useremail'
        edad: edad // Asegúrate de usar 'edad' aquí
    };
    console.log(nuevoUsuario);
    try {
        const response = await fetch('http://localhost:4001/api/user', { // Asegúrate de que la URL sea correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar usuario');
        }

        alert(data.message);
        mostrarLogin();
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Ocurrió un error: " + error.message);
    }
}



// Función para consultar si el usuario existe y verificar la contraseña
async function consultaUsuario() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`http://localhost:4001/api/user/${username}`, { // Cambiado a GET y la ruta correcta
            method: 'GET', // Cambiado a GET
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            if (result.userpassword === password) { // Verifica la contraseña
                alert("Inicio de sesión exitoso"); // Mensaje de éxito
                // Aquí puedes redirigir al usuario a otra página si es necesario
            } else {
                alert("Contraseña incorrecta");
            }
        } else {
            alert(result.message); // Muestra el mensaje de error
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al iniciar sesión.');
    }
}

// Función para restablecer la contraseña
async function restablecerContrasena() {
    const email = document.getElementById('email').value; // Asegúrate de que este ID sea correcto

    const respuesta = {
        useremail: email
    };

    try {
        const response = await fetch('http://localhost:4001/api/user/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(respuesta)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al restablecer la contraseña');
        }

        alert(data.message); // Muestra un mensaje de éxito
    } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
        alert("Ocurrió un error: " + error.message);
    }
}




// Inicialización: mostrar el formulario de inicio de sesión por defecto
document.addEventListener('DOMContentLoaded', function() {
    mostrarLogin();
});

