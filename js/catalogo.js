
document.addEventListener('DOMContentLoaded', () => {
    
    const sesionActual = JSON.parse(localStorage.getItem('sesionActual'));
    if (!sesionActual) {
        window.location.href = 'index.html';
        return;
    }
    
    
    cargarCursos();
    
    
    function cargarCursos() {
        const cursosContainer = document.getElementById('cursosContainer');
        
        
        const cursos = [
            {
                id: 1,
                nombre: 'Desarrollo Web Full Stack',
                descripcion: 'Aprende HTML, CSS, JavaScript, Node.js y más. Conviértete en desarrollador web completo.',
                precio: 299.99,
                imagen: 'img/full-stack.jpg'
            },
            {
                id: 2,
                nombre: 'Python para Data Science',
                descripcion: 'Domina Python y sus librerías para análisis de datos y machine learning.',
                precio: 249.99,
                imagen: 'img/maxresdefault.jpg'
            },
            {
                id: 3,
                nombre: 'React.js Avanzado',
                descripcion: 'Construye aplicaciones web modernas con React, Redux y Hooks.',
                precio: 199.99,
                imagen: 'img/curso-react.jpg'
            },
            {
                id: 4,
                nombre: 'DevOps y Cloud Computing',
                descripcion: 'Aprende Docker, Kubernetes, AWS y prácticas de DevOps.',
                precio: 349.99,
                imagen: 'img/1634011708493.jpg'
            },
            {
                id: 5,
                nombre: 'Ciberseguridad Ética',
                descripcion: 'Protege sistemas y redes. Aprende técnicas de hacking ético.',
                precio: 279.99,
                imagen: 'img/hacker-etico.jpg'
            },
            {
                id: 6,
                nombre: 'Inteligencia Artificial',
                descripcion: 'Fundamentos de IA, redes neuronales y aprendizaje profundo.',
                precio: 399.99,
                imagen: 'img/inteligencia-artificial.jpg'
            }
        ];
        
        
        localStorage.setItem('cursos', JSON.stringify(cursos));
        
        
        cursosContainer.innerHTML = cursos.map(curso => `
            <div class="curso-card">
                <img src="${curso.imagen}" alt="${curso.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Curso'">
                <div class="curso-info">
                    <h3>${curso.nombre}</h3>
                    <p class="curso-descripcion">${curso.descripcion}</p>
                    <p class="curso-precio">$${curso.precio.toFixed(2)}</p>
                    <button class="btn-primary" onclick="agregarAlCarrito(${curso.id})">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `).join('');
    }
    
   
    window.agregarAlCarrito = function(cursoId) {
        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        const curso = cursos.find(c => c.id === cursoId);
        
        if (!curso) {
            mostrarMensaje('Error: Curso no encontrado', 'error');
            return;
        }
        
       
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
       
        const cursoExistente = carrito.find(item => item.id === cursoId);
        
        if (cursoExistente) {
            cursoExistente.cantidad += 1;
            mostrarMensaje(`Se agregó otra unidad de "${curso.nombre}" al carrito`, 'success');
        } else {
            carrito.push({
                id: curso.id,
                nombre: curso.nombre,
                precio: curso.precio,
                imagen: curso.imagen,
                cantidad: 1
            });
            mostrarMensaje(`"${curso.nombre}" agregado al carrito`, 'success');
        }
        
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };
    
    
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