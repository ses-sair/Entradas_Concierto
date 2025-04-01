document.addEventListener("DOMContentLoaded", function() {
    // Configurar formulario
    const form = document.getElementById("compraForm");
    if (form) form.addEventListener("submit", function(e) {
        // Validación básica
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const ciudad = document.getElementById("ciudad").value;
        const metodoPago = document.querySelector('input[name="metodoPago"]:checked');
        const terminos = document.getElementById("terminos").checked;
        
        // Validación mejorada
        if (!nombre || nombre.indexOf(" ") === -1) {
            alert("Ingresa nombre y apellido");
            e.preventDefault();
            return;
        }
        
        if (!email || !email.includes("@")) {
            alert("Email inválido");
            e.preventDefault();
            return;
        }
        
        // Validar teléfono (9 dígitos para España)
        if (!/^\d{9}$/.test(telefono)) {
            alert("El teléfono debe tener 9 dígitos");
            e.preventDefault();
            return;
        }
        
        // Validar selección de ciudad
        if (!ciudad) {
            alert("Selecciona una ciudad");
            e.preventDefault();
            return;
        }
        
        // Validar método de pago
        if (!metodoPago) {
            alert("Selecciona un método de pago");
            e.preventDefault();
            return;
        }
        
        // Validar términos
        if (!terminos) {
            alert("Debes aceptar los términos");
            e.preventDefault();
            return;
        }
        
        // Guardar datos
        const datos = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            ciudad: ciudad,
            entradas: document.getElementById("entradas").value,
            tipoEntrada: document.getElementById("tipoEntrada").value,
            metodoPago: metodoPago.value,
            precio: { general: 40, vip: 80, platinum: 120 }[document.getElementById("tipoEntrada").value] || 0
        };
        
        sessionStorage.setItem("datosCompra", JSON.stringify(datos));
    });
    
    // Mostrar resumen
    const resumen = document.getElementById("resumenCompra");
    if (resumen) {
        // Obtener datos
        let datos;
        const datosJSON = sessionStorage.getItem("datosCompra");
        
        if (datosJSON) {
            datos = JSON.parse(datosJSON);
            
            // Mostrar datos con formato mejorado
            const total = datos.entradas * datos.precio;
            
            // Formatear valores para mejor presentación
            const tipoFormateado = {
                'general': 'General',
                'vip': 'VIP',
                'platinum': 'Platinum'
            }[datos.tipoEntrada] || datos.tipoEntrada;
            
            const metodoPagoFormateado = {
                'visa': 'Visa',
                'mastercard': 'MasterCard',
                'paypal': 'PayPal',
                'bizum': 'Bizum'
            }[datos.metodoPago] || datos.metodoPago;
            
            resumen.innerHTML = `
                <p><strong>Nombre:</strong> ${datos.nombre}</p>
                <p><strong>Email:</strong> ${datos.email}</p>
                <p><strong>Teléfono:</strong> ${datos.telefono}</p>
                <p><strong>Concierto:</strong> ${datos.ciudad}</p>
                <p><strong>Tipo de entrada:</strong> ${tipoFormateado}</p>
                <p><strong>Entradas:</strong> ${datos.entradas}</p>
                <p><strong>Precio unitario:</strong> ${datos.precio}€</p>
                <p><strong>Total a pagar:</strong> ${total}€</p>
                <p><strong>Método de pago:</strong> ${metodoPagoFormateado}</p>
            `;
        } else {
            resumen.innerHTML = "<p>No hay datos disponibles</p>";
        }
    }
});