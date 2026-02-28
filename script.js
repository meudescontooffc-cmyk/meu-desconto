let map;
let markers = [];
let infoWindows = [];
let userMarker;
let directionsService;
let directionsRenderer;

// 🔥 MAIS CATEGORIAS
let lojas = [
  {
    nome: "Farmácia Popular",
    lat: -3.399200,
    lng: -44.356900,
    desconto: "10% de desconto",
    condicoes: "Válido de segunda a sexta.",
    categoria: "farmacia",
    img: "img/farmacia.jpg"
  },
  {
    nome: "Mercadinho Central",
    lat: -3.397800,
    lng: -44.355500,
    desconto: "15% à vista",
    condicoes: "Pagamento em dinheiro.",
    categoria: "mercado",
    img: "img/mercado.jpg"
  },
  {
    nome: "Restaurante Sabor",
    lat: -3.398000,
    lng: -44.357000,
    desconto: "15% no prato principal",
    condicoes: "Terça a quinta.",
    categoria: "restaurante",
    img: "img/restaurante.jpg"
  },
  {
    nome: "Academia Power",
    lat: -3.398500,
    lng: -44.356000,
    desconto: "20% na matrícula",
    condicoes: "Plano anual.",
    categoria: "academia",
    img: "img/academia.jpg"
  },
  {
    nome: "Salão Beleza Pura",
    lat: -3.397900,
    lng: -44.357500,
    desconto: "15% em cortes",
    condicoes: "Segunda a quarta.",
    categoria: "salao",
    img: "img/salao.jpg"
  }
];

function initMap() {

  const centro = { lat: -3.398823, lng: -44.356215 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: centro,
    zoom: 16,
    disableDefaultUI: true,
    gestureHandling: "greedy",
    styles: [
      { featureType: "poi", stylers: [{ visibility: "off" }] },
      { featureType: "transit", stylers: [{ visibility: "off" }] }
    ]
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: false
  });
  directionsRenderer.setMap(map);

  pegarLocalizacao();
  renderMarkers(lojas);
  renderLojas(lojas);
}

function pegarLocalizacao() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      userMarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        }
      });

      map.setCenter(pos);
    });
  }
}

function renderMarkers(lista) {

  markers.forEach(m => m.setMap(null));
  markers = [];

  lista.forEach(loja => {

    const marker = new google.maps.Marker({
      position: { lat: loja.lat, lng: loja.lng },
      map: map,
      title: loja.nome
    });

    // 🔥 BALÃO CORRIGIDO
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="font-family:Arial">
          <strong>${loja.nome}</strong><br>
          ${loja.desconto}
        </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
      openModal(loja);
    });

    markers.push(marker);
  });
}

function renderLojas(lista) {
  const container = document.getElementById("lojasContainer");
  container.innerHTML = "";

  lista.forEach(loja => {

    const div = document.createElement("div");
    div.className = "loja";

    div.innerHTML = `
      <img src="${loja.img}">
      <div class="info">
        <h3>${loja.nome}</h3>
        <p>${loja.desconto}</p>
      </div>
    `;

    div.addEventListener("click", () => openModal(loja));

    container.appendChild(div);
  });
}

function openModal(loja) {

  document.getElementById("modalNome").innerText = loja.nome;
  document.getElementById("modalDesconto").innerText = loja.desconto;
  document.getElementById("modalCondicoes").innerText = loja.condicoes;
  document.getElementById("modalImagem").src = loja.img;

  document.getElementById("rotaBtn").onclick = () => {
    calcularRota(loja.lat, loja.lng);
  };

  document.getElementById("lojaModal").style.display = "block";
}

function closeModal() {
  document.getElementById("lojaModal").style.display = "none";
}

function calcularRota(destLat, destLng) {

  if (!userMarker) return alert("Localização não ativada");

  const request = {
    origin: userMarker.getPosition(),
    destination: { lat: destLat, lng: destLng },
    travelMode: "DRIVING"
  };

  directionsService.route(request, function(result, status) {
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    }
  });
}