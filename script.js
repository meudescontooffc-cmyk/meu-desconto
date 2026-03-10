let map;
let markers = [];
let userMarker;
let directionsService;
let directionsRenderer;
let rotaAtiva = false;

const ZOOM_MINIMO_EXIBIR = 13;

let imagemAtual = 0;
let imagensGaleria = [];

let lojas = [
{
nome: "Farmácia Abreu",
lat: -3.395241,
lng: -44.358245,
desconto: "10% de Desconto",
condicoes: "Valor Minimo R$ 20,00",
descricao: "Farmácia com ampla variedade de medicamentos e atendimento rápido.",
categoria: "farmacia",
imagens: [
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/IMG_0265.JPG?alt=media&token=5702769d-45a8-4d95-96ca-489b565e6e0b","https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/IMG_0255.JPG?alt=media&token=c311c354-a785-451b-855e-68df0ebd9073",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/IMG_0256.JPG?alt=media&token=2626e1b3-c420-49a8-9c0c-c766e19de32b"
]
},
{
nome: "Tribo da Moda",
lat: -3.397097,
lng: -44.355530,
desconto: "5% de Desconto",
condicoes: "Valor Minimo R$ 30,00",
descricao: "Loja de moda com roupas modernas e preços acessíveis.",
categoria: "moda",
imagens: [
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Tribo%20da%20moda%2FIMG_0262.JPG?alt=media&token=575a92bc-18fb-4353-9b8f-739b4ef2f725","https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Tribo%20da%20moda%2FIMG_0263.JPG?alt=media&token=3c009d41-4bf0-4934-a32b-4dd5d222ae3a","https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Tribo%20da%20moda%2FIMG_0264.JPG?alt=media&token=8f29faaa-bdaa-439b-9715-4dca213758ae"
]
},
{
nome: "Regis-Net",
lat: -3.3983681,
lng: -44.3531561,
desconto: "10% de Desconto",
condicoes: "Valor Minimo R$ 00,00",
descricao: "Loja de eletrônicos com celulares videogames e acessórios diversos.",
categoria: "tecnologia",
imagens: ["https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2FIMG_0257.JPG?alt=media&token=27dc4831-f18f-4961-8ede-0343318d5ac7","https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2FIMG_0258.JPG?alt=media&token=e4d70053-93b0-4b0d-a84c-a8d9b43c82d8","https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2FIMG_0259.JPG?alt=media&token=cea5a03b-eda6-4fa0-816d-3957d717cdaa",
]
},
{
nome: "Festas e Decoração",
lat: -3.399528,
lng: -44.356014,
desconto: "10% a 20% de Desconto",
condicoes: "Valor Minimo R$ 30,00",
descricao: "Loja de eletrônicos com celulares videogames e acessórios diversos.",
categoria: "decoração",
imagens: ["https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Festa%20e%20decora%C3%A7%C3%A3o%2FIMG_0266.JPG?alt=media&token=603c9fcb-7cdf-4dec-a2b7-6e35e34fcbaf","https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Festa%20e%20decora%C3%A7%C3%A3o%2FIMG_0267.JPG?alt=media&token=709117d9-6e98-4f04-bedf-dea92d5531d9","https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Festa%20e%20decora%C3%A7%C3%A3o%2FIMG_0268.JPG?alt=media&token=27e1d94f-5ad5-41e1-b0ed-223fd18cdb9a",
]
},
]
function initMap(){

const centro = { lat:-3.398823, lng:-44.356215 };

map = new google.maps.Map(document.getElementById("map"),{
center:centro,
zoom:14,
disableDefaultUI:true,
gestureHandling:"greedy",
styles:[
{ featureType:"poi", stylers:[{visibility:"off"}]},
{ featureType:"transit", stylers:[{visibility:"off"}]}
]
});

directionsService = new google.maps.DirectionsService();

directionsRenderer = new google.maps.DirectionsRenderer({
polylineOptions:{
strokeColor:"#d4af37",
strokeWeight:6
}
});

directionsRenderer.setMap(map);

map.addListener("zoom_changed",controlarZoom);

pegarLocalizacao();
renderMarkers(lojas);
renderLojas(lojas);

}

function pegarLocalizacao(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition((position)=>{

const pos={
lat:position.coords.latitude,
lng:position.coords.longitude
};

userMarker=new google.maps.Marker({
position:pos,
map:map,
icon:{
path:google.maps.SymbolPath.CIRCLE,
scale:8,
fillColor:"#4285F4",
fillOpacity:1,
strokeColor:"#ffffff",
strokeWeight:3
}
});

map.setCenter(pos);

});

}

}

function renderMarkers(lista){

markers.forEach(m=>m.setMap(null));
markers=[];

let iconBase="http://maps.google.com/mapfiles/ms/icons/";

let iconMap={
farmacia:"green-dot.png",
mercado:"blue-dot.png",
decoração:"red-dot.png",
tecnologia:"yellow-dot.png",
moda:"purple-dot.png"
};

lista.forEach(loja=>{

const marker=new google.maps.Marker({
position:{lat:loja.lat,lng:loja.lng},
map:map,
title:loja.nome,
icon:{
url:iconBase+iconMap[loja.categoria],
scaledSize:getIconSize()
}
});

const infoWindow=new google.maps.InfoWindow({
content:`
<div style="padding:10px;max-width:200px">
<h3 style="margin:0;color:#111">${loja.nome}</h3>
<p style="margin:5px 0;color:#444">${loja.desconto}</p>
<small style="color:#777">${loja.condicoes}</small>
</div>
`
});

marker.addListener("click",()=>{
infoWindow.open(map,marker);
openModal(loja);
});

markers.push(marker);

});

controlarZoom();

}

function getIconSize(){

const zoom=map.getZoom();

if(zoom>=18) return new google.maps.Size(40,40);
if(zoom>=16) return new google.maps.Size(32,32);
if(zoom>=14) return new google.maps.Size(24,24);

return new google.maps.Size(18,18);

}

function controlarZoom(){

const zoom=map.getZoom();

markers.forEach(marker=>{

if(zoom<ZOOM_MINIMO_EXIBIR){

marker.setMap(null);

}else{

marker.setMap(map);

marker.setIcon({
url:marker.getIcon().url,
scaledSize:getIconSize()
});

}

});

}

function renderLojas(lista){

const container=document.getElementById("lojasContainer");

container.innerHTML="";

lista.forEach(loja=>{

const div=document.createElement("div");

div.className="loja";

const primeiraImagem=loja.imagens[0];

div.innerHTML=`
<img src="${primeiraImagem}">
<div class="info">
<h3>${loja.nome}</h3>
<p>${loja.desconto}</p>
</div>
`;

div.addEventListener("click",()=>openModal(loja));

container.appendChild(div);

});

}

function openModal(loja){

document.getElementById("modalNome").innerText=loja.nome;
document.getElementById("modalDesconto").innerText=loja.desconto;
document.getElementById("modalCondicoes").innerText=loja.condicoes;
document.getElementById("modalDescricao").innerText=loja.descricao;

const galeria=document.getElementById("modalGaleria");

galeria.innerHTML="";

imagensGaleria = loja.imagens;

loja.imagens.forEach((img,index)=>{

const imagem=document.createElement("img");

imagem.src=img;

imagem.onclick=()=>abrirGaleria(index);

galeria.appendChild(imagem);

});

document.getElementById("rotaBtn").onclick=()=>{
calcularRota(loja.lat,loja.lng);
};

document.getElementById("lojaModal").classList.add("show");

}

function closeModal(){
document.getElementById("lojaModal").classList.remove("show");
}

function calcularRota(destLat,destLng){

if(!userMarker) return alert("Ative sua localização.");

markers.forEach(m=>m.setMap(null));

const request={
origin:userMarker.getPosition(),
destination:{lat:destLat,lng:destLng},
travelMode:"DRIVING"
};

directionsService.route(request,function(result,status){

if(status=="OK"){

directionsRenderer.setDirections(result);

const distancia=result.routes[0].legs[0].distance.text;
const duracao=result.routes[0].legs[0].duration.text;

alert(`🚗 Distância: ${distancia}\n⏱ Tempo estimado: ${duracao}`);

}

});

}

function cancelarRota(){

directionsRenderer.setDirections({routes:[]});

renderMarkers(lojas);

closeModal();

}

function searchLojas(){

const texto=document.getElementById("searchInput").value.toLowerCase();

const filtradas=lojas.filter(loja=>
loja.nome.toLowerCase().includes(texto)
);

renderMarkers(filtradas);
renderLojas(filtradas);

}

function filterCategory(cat){

document.querySelectorAll(".categories button")
.forEach(btn=>btn.classList.remove("active"));

event.target.classList.add("active");

if(cat==="all"){

renderMarkers(lojas);
renderLojas(lojas);

return;

}

const filtradas=lojas.filter(loja=>loja.categoria===cat);

renderMarkers(filtradas);
renderLojas(filtradas);

}

function abrirGaleria(index){

imagemAtual=index;

document.getElementById("viewerImg").src=imagensGaleria[index];

criarBolinhas();

document.getElementById("imageViewer").classList.add("show");

}

function fecharGaleria(){

document.getElementById("imageViewer").classList.remove("show");

}

function mudarImagem(direcao){

imagemAtual+=direcao;

if(imagemAtual<0) imagemAtual=imagensGaleria.length-1;
if(imagemAtual>=imagensGaleria.length) imagemAtual=0;

document.getElementById("viewerImg").src=imagensGaleria[imagemAtual];

atualizarBolinhas();

}

function criarBolinhas(){

const container=document.getElementById("viewerDots");

container.innerHTML="";

imagensGaleria.forEach((img,index)=>{

const dot=document.createElement("div");

dot.className="dot";

if(index===imagemAtual){
dot.classList.add("active");
}

dot.onclick=()=>{
imagemAtual=index;
document.getElementById("viewerImg").src=img;
atualizarBolinhas();
};

container.appendChild(dot);

});

}

function atualizarBolinhas(){

const dots=document.querySelectorAll(".dot");

dots.forEach((dot,index)=>{

dot.classList.remove("active");

if(index===imagemAtual){
dot.classList.add("active");
}

});

}

let startX=0;

document.addEventListener("touchstart",(e)=>{
startX=e.touches[0].clientX;
});

document.addEventListener("touchend",(e)=>{

let endX=e.changedTouches[0].clientX;

if(startX-endX>50){
mudarImagem(1);
}

if(endX-startX>50){
mudarImagem(-1);
}

});
