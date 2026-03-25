// 1. BASE DE DATOS DE TIENDAS (Modifica las coordenadas aquí)
const tiendas = [
  {
        nombre: "MISCELANEA MILI",
        coords: [19.51151061403235, -99.19314148049266],
        horario: "9:30AM-9:00PM",
        pagos: "SOLO Efectivo",
        direccion: "Av. de las Culturas, Rosario 1 Sector CROC III B, Azcapotzalco, 02100 Ciudad de México, CDMX"
    },
    {
        nombre:"EL HUASTECO",
        coords: [19.512662580837958, -99.19682073052104],
        horario: "10:AM-9:00PM",
        pagos: "Efectivo ",
        direccion: "Calle MERCADERES 134"
    },
    {
        nombre:"Cremeria la 1",
        coords: [19.5128582,-99.1967727],
        horario: "LUNES A JUEVES Y DOMINGO =8:30AM-10:00PM ",
        pagos: "Efectivo ",
        direccion: "Calle MERCADERES 134"
    },
    {
        nombre:"Materias primas el Rosario",
        coords: [19.5142480,-99.1969916],
        horario: "1:00pm-11:00pm ",
        pagos: "Efectivo,tarjeta y transferencia ",
        direccion: "av cultura griega 62"
    },
    {
        nombre:"Abarrotes Palma",
        coords: [19.5134425,-99.1968964],
        horario: "lunes a sabado=11:00am-1:00am",
        pagos: "Efectivo y transferencia ",
        direccion: "av cultura griega manzana 078"
    },


];

// 2. CONFIGURACIÓN DEL MAPA
const map = L.map('map').setView([19.4326, -99.1332], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. DEFINIR EL STICKER (ICONO)
const stickerTienda = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/606/606363.png', // Imagen de tienda
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// 4. FUNCIÓN PARA MOSTRAR LA INFO EN LA BARRA LATERAL
function mostrarInfo(tienda) {
    const detailsDiv = document.getElementById('details');
    
    // Crear el link de Google Maps
    const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${tienda.coords[0]},${tienda.coords[1]}`;

    detailsDiv.innerHTML = `
        <div class="shop-card">
            <h3>${tienda.nombre}</h3>
            
            <div class="info-item">
                <span class="label">📍 Dirección Exacta</span>
                <span class="value">${tienda.direccion}</span>
            </div>
            
            <div class="info-item">
                <span class="label">⏰ Horario de Servicio</span>
                <span class="value">${tienda.horario}</span>
            </div>
            
            <div class="info-item">
                <span class="label">💳 Métodos de Pago</span>
                <span class="value">${tienda.pagos}</span>
            </div>

            <div class="info-item">
            <span class="label">📞 Contactar a la tienda
            <span class="value">${tienda.contacto}</span>
            
            <a href="${googleUrl}" target="_blank" class="btn-google">
                🚗 Abrir en Google Maps
            </a>
        </div>
    `;
}

// 5. DIBUJAR LAS TIENDAS EN EL MAPA
tiendas.forEach(tienda => {
    const marker = L.marker(tienda.coords, {icon: stickerTienda}).addTo(map);
    
    // Al pasar el mouse sale el nombre
    marker.bindTooltip(tienda.nombre);

    // Al hacer clic abre la info a la izquierda
    marker.on('click', () => {
        mostrarInfo(tienda);
        map.flyTo(tienda.coords, 16); // Efecto de vuelo suave a la tienda
    });
});

// 6. DETECTAR UBICACIÓN DEL USUARIO
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        const miLat = pos.coords.latitude;
        const miLng = pos.coords.longitude;
        
        // Círculo azul para el usuario
        L.circle([miLat, miLng], {
            color: '#4285F4',
            fillColor: '#4285F4',
            fillOpacity: 0.15,
            radius: 200
        }).addTo(map).bindPopup("Estás aquí");

        map.setView([miLat, miLng], 14);
        document.getElementById('status-location').innerText = "📍 Ubicación detectada con éxito";
    }, () => {
        document.getElementById('status-location').innerText = "⚠️ Activa el GPS para mejor precisión";
    });
}
