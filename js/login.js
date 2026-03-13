// Validación e inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Verificar si ya hay una sesión activa
    const sesionActual = JSON.parse(localStorage.getItem('sesionActual'));
    if (sesionActual && sesionActual.email) {
        window.location.href = 'catalogo.html';
        return;
    }
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Validar campos no vacíos
        if (!email || !password) {
            mostrarMensaje('Por favor, completa todos los campos', 'error');
            return;
        }
        
        // Obtener usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Buscar usuario
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        
        if (usuario) {
            // Guardar sesión actual
            localStorage.setItem('sesionActual', JSON.stringify({
                email: usuario.email,
                nombre: usuario.nombre
            }));
            
            mostrarMensaje('Inicio de sesión exitoso. Redirigiendo...', 'success');
            
            setTimeout(() => {
                window.location.href = 'catalogo.html';
            }, 1500);
        } else {
            mostrarMensaje('Credenciales incorrectas', 'error');
        }
    });
    
    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
        // Eliminar mensaje anterior si existe
        const mensajeAnterior = document.querySelector('.alert');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }
        
        const mensaje = document.createElement('div');
        mensaje.className = `alert alert-${tipo}`;
        mensaje.textContent = texto;
        
        const form = document.querySelector('.form-container');
        form.insertBefore(mensaje, loginForm);
        
        // Eliminar mensaje después de 3 segundos
        setTimeout(() => {
            if (mensaje.parentNode) {
                mensaje.remove();
            }
        }, 3000);
    }
});