// Perfil, cierre de sesión y menú de usuario
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay sesión activa
    const sesionActual = JSON.parse(localStorage.getItem('sesionActual'));
    
    if (!sesionActual || !sesionActual.email) {
        // Si no hay sesión y no estamos en la página de login o registro, redirigir
        const paginaActual = window.location.pathname.split('/').pop();
        if (paginaActual !== 'index.html' && paginaActual !== 'registro.html') {
            window.location.href = 'index.html';
        }
        return;
    }
    
    // Configurar menú de usuario
    const userMenuBtn = document.getElementById('userMenuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (userMenuBtn && dropdownMenu) {
        // Toggle menú al hacer clic en el icono
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        // Configurar opciones del menú
        const cartOption = document.getElementById('cartOption');
        const settingsOption = document.getElementById('settingsOption');
        const logoutOption = document.getElementById('logoutOption');
        
        if (cartOption) {
            cartOption.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'carrito.html';
            });
        }
        
        if (settingsOption) {
            settingsOption.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarConfiguracion();
            });
        }
        
        if (logoutOption) {
            logoutOption.addEventListener('click', (e) => {
                e.preventDefault();
                cerrarSesion();
            });
        }
    }
    
    // Función para cerrar sesión
    function cerrarSesion() {
        localStorage.removeItem('sesionActual');
        mostrarMensaje('Sesión cerrada exitosamente', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
    
    // Función para mostrar configuración (simulada)
    function mostrarConfiguracion() {
        const usuario = JSON.parse(localStorage.getItem('sesionActual'));
        alert(`Configuración de usuario\n\nNombre: ${usuario.nombre}\nEmail: ${usuario.email}\n\nFunción en desarrollo...`);
    }
    
    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
        const mensaje = document.createElement('div');
        mensaje.className = `alert alert-${tipo}`;
        mensaje.textContent = texto;
        mensaje.style.position = 'fixed';
        mensaje.style.top = '20px';
        mensaje.style.right = '20px';
        mensaje.style.zIndex = '9999';
        
        document.body.appendChild(mensaje);
        
        setTimeout(() => {
            if (mensaje.parentNode) {
                mensaje.remove();
            }
        }, 3000);
    }
});