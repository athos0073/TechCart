// Gestión del carrito (actualizar, eliminar) con localStorage
document.addEventListener('DOMContentLoaded', () => {
    // Verificar sesión
    const sesionActual = JSON.parse(localStorage.getItem('sesionActual'));
    if (!sesionActual) {
        window.location.href = 'index.html';
        return;
    }
    
    // Cargar carrito
    cargarCarrito();
    
    // Función para cargar el carrito
    function cargarCarrito() {
        const carritoContainer = document.getElementById('carritoContainer');
        const carritoTotal = document.getElementById('carritoTotal');
        
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p class="alert alert-info">Tu carrito está vacío</p>';
            carritoTotal.innerHTML = '';
            return;
        }
        
        // Calcular total
        let total = 0;
        
        // Generar HTML del carrito
        carritoContainer.innerHTML = carrito.map(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            
            return `
                <div class="carrito-item" data-id="${item.id}">
                    <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/100x100?text=Curso'">
                    <div class="item-info">
                        <h3>${item.nombre}</h3>
                        <p>Precio unitario: $${item.precio.toFixed(2)}</p>
                        <p>Subtotal: $${subtotal.toFixed(2)}</p>
                    </div>
                    <div class="item-actions">
                        <input type="number" min="1" value="${item.cantidad}" 
                               onchange="actualizarCantidad(${item.id}, this.value)">
                        <button class="btn-danger" onclick="eliminarDelCarrito(${item.id})">
                            Eliminar
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Mostrar total
        carritoTotal.innerHTML = `
            <h3>Total: $${total.toFixed(2)}</h3>
            <button class="btn-primary" onclick="finalizarCompra()">Finalizar Compra</button>
        `;
    }
    
    // Función global para actualizar cantidad
    window.actualizarCantidad = function(cursoId, nuevaCantidad) {
        nuevaCantidad = parseInt(nuevaCantidad);
        
        if (nuevaCantidad < 1) {
            eliminarDelCarrito(cursoId);
            return;
        }
        
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const cursoIndex = carrito.findIndex(item => item.id === cursoId);
        
        if (cursoIndex !== -1) {
            carrito[cursoIndex].cantidad = nuevaCantidad;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            cargarCarrito(); // Recargar carrito
            mostrarMensaje('Cantidad actualizada', 'success');
        }
    };
    
    // Función global para eliminar del carrito
    window.eliminarDelCarrito = function(cursoId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const cursoEliminado = carrito.find(item => item.id === cursoId);
        
        carrito = carrito.filter(item => item.id !== cursoId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        cargarCarrito(); // Recargar carrito
        mostrarMensaje(`"${cursoEliminado.nombre}" eliminado del carrito`, 'success');
    };
    
    // Función global para finalizar compra
    window.finalizarCompra = function() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        if (carrito.length === 0) {
            mostrarMensaje('No hay productos en el carrito', 'error');
            return;
        }
        
        // Calcular total
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        
        // Simular compra
        const confirmacion = confirm(`Total a pagar: $${total.toFixed(2)}\n¿Deseas finalizar la compra?`);
        
        if (confirmacion) {
            // Vaciar carrito
            localStorage.setItem('carrito', JSON.stringify([]));
            mostrarMensaje('¡Compra realizada con éxito!', 'success');
            
            setTimeout(() => {
                cargarCarrito(); // Recargar carrito (vacío)
            }, 1500);
        }
    };
    
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