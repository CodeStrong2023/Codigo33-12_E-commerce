document.addEventListener('DOMContentLoaded', function() {
    // Verifica si el usuario ha iniciado sesión
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Si el usuario ha iniciado sesión
    if (isLoggedIn === 'true') {
        // Oculta el enlace de registrarse
        const registerLink = document.getElementById('register-link');
        if (registerLink) {
            registerLink.style.display = 'none'; // Oculta el enlace de 'Registrarse'
        }

        // Muestra el enlace de cerrar sesión
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.style.display = 'inline'; // Muestra el enlace de 'Cerrar sesión'
        }
    } else {
        // Si no está logueado, mostrar el enlace de registrarse
        const registerLink = document.getElementById('register-link');
        if (registerLink) {
            registerLink.style.display = 'inline'; // Asegura que el enlace de 'Registrarse' esté visible
        }

        // Ocultar el enlace de cerrar sesión
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.style.display = 'none'; // Oculta el enlace de 'Cerrar sesión'
        }
    }
});

// Función para cerrar sesión
function cerrarSesion() {
    // Elimina el estado de inicio de sesión
    localStorage.removeItem('isLoggedIn');

    // Recarga la página para actualizar la vista
    location.reload();
}
