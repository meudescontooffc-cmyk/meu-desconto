let map;
let markers = [];
let userMarker;
let directionsService;
let directionsRenderer;

const ZOOM_MINIMO_EXIBIR = 13;

let imagemAtual = 0;
let imagensGaleria = [];
let startX = 0;

let lojas = [
{
nome:"Farmácia Abreu",
lat:-3.395241,
lng:-44.358245,
desconto:"10% de Desconto",
condicoes:"Valor Minimo R$ 20,00",
descricao:"Farmácia com ampla variedade de medicamentos e atendimento rápido.",
categoria:"farmacia",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Abreu%2FAbreu1.webp?alt=media&token=4bec1797-aaba-4bc4-b20f-a3389a93149a",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Abreu%2FAbreu2.webp?alt=media&token=9a4741c7-cc4b-435d-af6a-7296c51bec75",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Abreu%2FAbreu3.webp?alt=media&token=f41821b9-0460-4d94-85b9-c88b0278ea84"
]
},
{
nome:"Tribo da Moda",
lat:-3.397097,
lng:-44.355530,
desconto:"5% de Desconto",
condicoes:"Valor Minimo R$ 30,00",
descricao:"Loja de moda com roupas modernas e preços acessíveis.",
categoria:"moda",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Tribo%20da%20moda%2Ftribo1.webp?alt=media&token=3c56a3f7-397e-4e3a-9d31-36a80fd69268",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Tribo%20da%20moda%2Ftribo2.webp?alt=media&token=bfb3a776-f43f-4114-bb06-e5e91e14164b",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Tribo%20da%20moda%2Ftribo3.webp?alt=media&token=6772c9dc-5c5c-4c38-ba8d-49af3ab89700",
]
},
{
nome:"Regis-Net",
lat:-3.3983681,
lng:-44.3531561,
desconto:"10% de Desconto",
condicoes:"Valor Minimo R$ 00,00",
descricao:"Loja de eletrônicos com celulares videogames e acessórios diversos.",
categoria:"tecnologia",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2Fregi1.webp?alt=media&token=8de7eace-95cd-4d4e-bef3-9b0bffd31dc6",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2Fregi2.webp?alt=media&token=f16b20e8-1040-412b-8e3f-c2c5d1a53333",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2Fregi3.webp?alt=media&token=5520e438-9a1f-4336-b747-92dbcf3bc62e"
]
},
{
nome:"Festas e Decoração",
lat:-3.399528,
lng:-44.356014,
desconto:"10% a 20% de Desconto",
condicoes:"Valor Minimo R$ 30,00",
descricao:"Loja com artigos de festas e itens decorativos para diversas ocasiões.",
categoria:"decoração",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Festa%20e%20decora%C3%A7%C3%A3o%2Ffesta1.webp?alt=media&token=374c5b39-c14a-4d07-9ade-f38dc487c8e7",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Festa%20e%20decora%C3%A7%C3%A3o%2Ffesta2.webp?alt=media&token=7058eff6-1a48-4296-a6c9-a0416f354dfb",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Festa%20e%20decora%C3%A7%C3%A3o%2Ffesta3.webp?alt=media&token=aa643cd6-0199-4af0-a403-eadeb7ee1c6a"
]
}
];

function initMap(){

const centro={lat:-3.398823,lng:-44.356215};

map=new google.maps.Map(document.getElementById("map"),{
center:centro,
zoom:14,
disableDefaultUI:true,
gestureHandling:"cooperative",
clickableIcons:false,
styles:[
{featureType:"poi",stylers:[{visibility:"off"}]},
{featureType:"transit",stylers:[{visibility:"off"}]}
]
});

directionsService=new google.maps.DirectionsService();

directionsRenderer=new google.maps.DirectionsRenderer({
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

navigator.geolocation.getCurrentPosition((pos)=>{

const local={
lat:pos.coords.latitude,
lng:pos.coords.longitude
};

userMarker=new google.maps.Marker({
position:local,
map:map,
icon:{
path:google.maps.SymbolPath.CIRCLE,
scale:8,
fillColor:"#4285F4",
fillOpacity:1,
strokeColor:"#fff",
strokeWeight:3
}
});

map.setCenter(local);

});

}

}

function renderMarkers(lista){

markers.forEach(m=>m.setMap(null));
markers=[];

const iconBase="https://maps.google.com/mapfiles/ms/icons/";

const iconMap={
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
content:`<div style="padding:10px"><b>${loja.nome}</b><br>${loja.desconto}</div>`
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

if(zoom>=18)return new google.maps.Size(40,40);
if(zoom>=16)return new google.maps.Size(32,32);
if(zoom>=14)return new google.maps.Size(24,24);

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

/* IMAGEM BORRADA ATÉ CARREGAR */
function criarImagemLazy(src){

const img=document.createElement("img");

img.loading="lazy";
img.style.filter="blur(20px)";
img.style.transition="filter 0.4s ease";

const temp=new Image();
temp.src=src;

temp.onload=()=>{
img.src=src;
img.style.filter="blur(0)";
};

temp.onerror=()=>{
img.src="https://via.placeholder.com/300x200?text=Imagem";
img.style.filter="blur(0)";
};

return img;

}

function renderLojas(lista){

const container=document.getElementById("lojasContainer");

container.innerHTML="";

lista.forEach(loja=>{

const div=document.createElement("div");
div.className="loja";

const img=criarImagemLazy(loja.imagens[0]);

const info=document.createElement("div");

info.className="info";

info.innerHTML=`
<h3>${loja.nome}</h3>
<p>${loja.desconto}</p>
`;

div.appendChild(img);
div.appendChild(info);

div.onclick=()=>openModal(loja);

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

imagensGaleria=loja.imagens;

loja.imagens.forEach((img,index)=>{

const imagem=criarImagemLazy(img);

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

if(!userMarker){
alert("Ative sua localização.");
return;
}

markers.forEach(m=>m.setMap(null));

const request={
origin:userMarker.getPosition(),
destination:{lat:destLat,lng:destLng},
travelMode:"DRIVING"
};

directionsService.route(request,(result,status)=>{

if(status==="OK"){

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

function filterCategory(cat,btn){

document.querySelectorAll(".categories button")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

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

if(imagemAtual<0)imagemAtual=imagensGaleria.length-1;
if(imagemAtual>=imagensGaleria.length)imagemAtual=0;

document.getElementById("viewerImg").src=imagensGaleria[imagemAtual];

atualizarBolinhas();

}

function criarBolinhas(){

const container=document.getElementById("viewerDots");

container.innerHTML="";

imagensGaleria.forEach((img,index)=>{

const dot=document.createElement("div");

dot.className="dot";

if(index===imagemAtual)dot.classList.add("active");

dot.onclick=()=>{
imagemAtual=index;
document.getElementById("viewerImg").src=img;
atualizarBolinhas();
};

container.appendChild(dot);

});

}

function atualizarBolinhas(){

document.querySelectorAll(".dot").forEach((dot,index)=>{
dot.classList.toggle("active",index===imagemAtual);
});

}

document.addEventListener("touchstart",(e)=>{
startX=e.touches[0].clientX;
});

document.addEventListener("touchend",(e)=>{

if(!document.getElementById("imageViewer").classList.contains("show"))return;

let endX=e.changedTouches[0].clientX;

if(startX-endX>50)mudarImagem(1);
if(endX-startX>50)mudarImagem(-1);

});
