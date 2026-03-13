// Validaciones del formulario de registro
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    // Validar fuerza de contraseña en tiempo real
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const fuerza = calcularFuerzaContrasena(password);
        actualizarIndicadorFuerza(fuerza);
    });
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Validar campos no vacíos
        if (!nombre || !email || !password || !confirmPassword) {
            mostrarMensaje('Por favor, completa todos los campos', 'error');
            return;
        }
        
        // Validar formato de email
        if (!validarEmail(email)) {
            mostrarMensaje('Por favor, ingresa un correo electrónico válido', 'error');
            return;
        }
        
        // Validar contraseña
        const fuerza = calcularFuerzaContrasena(password);
        if (fuerza.nivel === 0) {
            mostrarMensaje('La contraseña debe contener mayúsculas, minúsculas, números y signos', 'error');
            return;
        }
        
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            mostrarMensaje('Las contraseñas no coinciden', 'error');
            return;
        }
        
        // Obtener usuarios registrados
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Verificar si el email ya está registrado
        if (usuarios.some(u => u.email === email)) {
            mostrarMensaje('Este correo electrónico ya está registrado', 'error');
            return;
        }
        
        // Guardar nuevo usuario
        const nuevoUsuario = {
            nombre: nombre,
            email: email,
            password: password,
            fechaRegistro: new Date().toISOString()
        };
        
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        mostrarMensaje('Registro exitoso. Redirigiendo al inicio de sesión...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
    
    // Función para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Función para calcular fuerza de contraseña
    function calcularFuerzaContrasena(password) {
        let puntuacion = 0;
        const criterios = {
            mayuscula: /[A-Z]/.test(password),
            minuscula: /[a-z]/.test(password),
            numero: /[0-9]/.test(password),
            signo: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            longitud: password.length >= 8
        };
        
        // Calcular puntuación basada en criterios cumplidos
        for (let criterio in criterios) {
            if (criterios[criterio]) puntuacion++;
        }
        
        // Determinar nivel de fuerza
        let nivel = 0;
        let texto = '';
        let color = '';
        
        if (puntuacion <= 2) {
            nivel = 1;
            texto = 'Débil';
            color = '#dc3545';
        } else if (puntuacion <= 4) {
            nivel = 2;
            texto = 'Media';
            color = '#ffc107';
        } else if (puntuacion === 5) {
            nivel = 3;
            texto = 'Fuerte';
            color = '#28a745';
        }
        
        // Verificar si cumple con todos los requisitos básicos
        const requisitosBasicos = criterios.mayuscula && criterios.minuscula && 
                                  criterios.numero && criterios.signo;
        
        if (!requisitosBasicos) {
            nivel = 0;
            texto = 'No cumple requisitos';
            color = '#dc3545';
        }
        
        return { nivel, texto, color, puntuacion };
    }
    
    // Función para actualizar el indicador de fuerza
    function actualizarIndicadorFuerza(fuerza) {
        strengthBar.style.width = fuerza.nivel === 0 ? '100%' : (fuerza.puntuacion * 20) + '%';
        strengthBar.style.backgroundColor = fuerza.color;
        strengthText.textContent = `Fuerza: ${fuerza.texto}`;
        strengthText.style.color = fuerza.color;
    }
    
    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
        const mensajeAnterior = document.querySelector('.alert');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }
        
        const mensaje = document.createElement('div');
        mensaje.className = `alert alert-${tipo}`;
        mensaje.textContent = texto;
        
        const form = document.querySelector('.form-container');
        form.insertBefore(mensaje, registerForm);
        
        setTimeout(() => {
            if (mensaje.parentNode) {
                mensaje.remove();
            }
        }, 3000);
    }
});