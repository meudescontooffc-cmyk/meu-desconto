let map;
let markers = [];
let userMarker;
let directionsService;
let directionsRenderer;
let rotaAtiva = false;

const ZOOM_MINIMO_EXIBIR = 14;

let lojas = [
  {
    nome: "Farmácia Abreu",
    lat: -3.395241,
    lng: -44.358245,
    desconto: "10% de desconto",
    condicoes: "Válido de segunda a sexta.",
    categoria: "farmacia",
    img: "https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/IMG_20260301_121351.jpg?alt=media&token=d383940f-8722-41f3-8782-d7065eef3f62"
  },
  {
    nome: "Mercadinho Central",
    lat: -3.397800,
    lng: -44.355500,
    desconto: "15% à vista",
    condicoes: "Pagamento em dinheiro.",
    categoria: "mercado",
    img: "img/mercado.jpg"
  }
];

function initMap() {

  const centro = { lat: -3.398823, lng: -44.356215 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: centro,
    zoom: 17,
    disableDefaultUI: true,
    gestureHandling: "greedy",
    styles: [
      { featureType: "poi", stylers: [{ visibility: "off" }] },
      { featureType: "transit", stylers: [{ visibility: "off" }] }
    ]
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "#d4af37",
      strokeWeight: 6
    }
  });

  directionsRenderer.setMap(map);

  map.addListener("zoom_changed", controlarZoom);

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

  let iconBase = "http://maps.google.com/mapfiles/ms/icons/";

  let iconMap = {
    farmacia: "green-dot.png",
    mercado: "blue-dot.png",
    restaurante: "red-dot.png",
    academia: "yellow-dot.png",
    salao: "purple-dot.png"
  };

  lista.forEach(loja => {

    const marker = new google.maps.Marker({
      position: { lat: loja.lat, lng: loja.lng },
      map: map,
      title: loja.nome,
      icon: {
        url: iconBase + iconMap[loja.categoria],
        scaledSize: getIconSize()
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding:10px;max-width:200px">
          <h3 style="margin:0;color:#111">${loja.nome}</h3>
          <p style="margin:5px 0;color:#444">${loja.desconto}</p>
          <small style="color:#777">${loja.condicoes}</small>
        </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
      openModal(loja);
    });

    markers.push(marker);
  });

  controlarZoom();
}

function getIconSize() {
  const zoom = map.getZoom();

  if (zoom >= 18) return new google.maps.Size(40, 40);
  if (zoom >= 16) return new google.maps.Size(32, 32);
  if (zoom >= 14) return new google.maps.Size(24, 24);
  return new google.maps.Size(18, 18);
}

function controlarZoom() {

  const zoom = map.getZoom();

  markers.forEach(marker => {

    if (zoom < ZOOM_MINIMO_EXIBIR) {
      marker.setMap(null);
    } else {
      marker.setMap(map);
      marker.setIcon({
        url: marker.getIcon().url,
        scaledSize: getIconSize()
      });
    }

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

  if (!userMarker) return alert("Ative sua localização.");

  markers.forEach(m => m.setMap(null));

  const request = {
    origin: userMarker.getPosition(),
    destination: { lat: destLat, lng: destLng },
    travelMode: "DRIVING"
  };

  directionsService.route(request, function(result, status) {

    if (status == "OK") {
      directionsRenderer.setDirections(result);

      const distancia = result.routes[0].legs[0].distance.text;
      const duracao = result.routes[0].legs[0].duration.text;

      alert(`🚗 Distância: ${distancia}\n⏱ Tempo estimado: ${duracao}`);
    }

  });
}

function cancelarRota() {
  directionsRenderer.setDirections({ routes: [] });
  renderMarkers(lojas);
}

function searchLojas() {
  const texto = document.getElementById("searchInput").value.toLowerCase();

  const filtradas = lojas.filter(loja =>
    loja.nome.toLowerCase().includes(texto)
  );

  renderMarkers(filtradas);
  renderLojas(filtradas);
}

function filterCategory(cat) {

  document.querySelectorAll(".categories button")
    .forEach(btn => btn.classList.remove("active"));

  event.target.classList.add("active");

  if (cat === "all") {
    renderMarkers(lojas);
    renderLojas(lojas);
    return;
  }

  const filtradas = lojas.filter(loja => loja.categoria === cat);

  renderMarkers(filtradas);
  renderLojas(filtradas);
}
