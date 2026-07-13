let map;
let markers = [];
let userMarker;
let directionsService;
let directionsRenderer;
let rotaAtiva = false;
const ZOOM_MINIMO_EXIBIR = 13;

let imagemAtual = 0;
let imagensGaleria = [];
let startX = 0;

let mapaVisivel = false;

let lojas = [
{
nome:"Farmácia Abreu",
lat:-3.395241,
lng:-44.358245,
desconto:"10% de Desconto",
condicoes:"• Válido para compras a partir de R$ 20,00 \n• Pagamentos à vista",
descricao:"Farmácia com ampla variedade de medicamentos e atendimento rápido.",
categoria:"farmacia",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Abreu%2FAbreu1.webp?alt=media&token=4bec1797-aaba-4bc4-b20f-a3389a93149a",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Abreu%2FWhatsApp%20Image%202026-07-07%20at%2009.16.19%20(1).jpeg?alt=media&token=361d907a-558e-4652-8625-087e012558b4",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Abreu%2FWhatsApp%20Image%202026-07-07%20at%2009.16.19.jpeg?alt=media&token=3de33183-5b18-4854-8f46-aa428d08ccfc",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Abreu%2FAbreu3.webp?alt=media&token=f41821b9-0460-4d94-85b9-c88b0278ea84"
]
},
{
nome:"Tribo da Moda",
lat:-3.397097,
lng:-44.355530,
desconto:"5% de Desconto",
condicoes:"• Válido para compras a partir de R$ 30,00  \n• Pagamentos à vista",
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
condicoes:"• Desconto válido para qualquer produto ou servirço.  \n• Pagamentos à vista",
descricao:"Loja de eletrônicos com celulares, videogames e acessórios diversos.",
categoria:"tecnologia",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2Fregi1.webp?alt=media&token=8de7eace-95cd-4d4e-bef3-9b0bffd31dc6",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2Fregi3.webp?alt=media&token=5520e438-9a1f-4336-b747-92dbcf3bc62e",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2FWhatsApp%20Image%202026-07-07%20at%2008.41.17.jpeg?alt=media&token=2e0e8748-e369-4d83-879c-0d39a6ebddd1",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/Regi%20-net%2FWhatsApp%20Image%202026-07-07%20at%2008.41.17%20(1).jpeg?alt=media&token=1951071e-ebd2-4627-b97f-14fe3cba5018",
]
},
{
nome:"Dom Barbudos",
lat:-3.404442,
lng:-44.352711,
desconto:"15% a 20% de Desconto",
condicoes:"• Válido para cortes de cabelo \n• Pagamentos à vista",
descricao:"Sevirços de corte de cabelo",
categoria:"beleza",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/barbearia%2Fdom%20Barbudos%2FWhatsApp%20Image%202026-07-07%20at%2009.22.51.jpeg?alt=media&token=c2f07353-9080-4693-ac3d-a24159413470",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/barbearia%2Fdom%20Barbudos%2FWhatsApp%20Image%202026-07-07%20at%2009.22.51%20(2).jpeg?alt=media&token=1e3ac838-7885-4245-8092-43147ad66253",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/barbearia%2Fdom%20Barbudos%2FWhatsApp%20Image%202026-07-07%20at%2009.22.51%20(1).jpeg?alt=media&token=72e14112-ca51-4459-9292-852a541c3dbe",
]
},

{
nome:"Mirian Modas",
lat:-3.3944610,
lng:-44.3574034,
desconto:"20% de Desconto",
condicoes:"• Válido para todos os produtos da loja",
descricao:"• Moda atual com qualidade e preços acessíveis.",
categoria:"moda",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fmirian%20modas%2FWhatsApp%20Image%202026-07-07%20at%2009.30.45.jpeg?alt=media&token=ae4736c5-0fea-4d10-b5f5-37c52098aadd",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fmirian%20modas%2FWhatsApp%20Image%202026-07-07%20at%2009.30.44.jpeg?alt=media&token=028d93e0-7e2d-4d22-8a28-bd1b11dafedf",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fmirian%20modas%2FWhatsApp%20Image%202026-07-07%20at%2009.30.44%20(3).jpeg?alt=media&token=c92c3b93-8075-406d-9b27-92f8861f91f5",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fmirian%20modas%2FWhatsApp%20Image%202026-07-07%20at%2009.30.44%20(1).jpeg?alt=media&token=2a5aad0b-23b6-4b9e-af76-53ff671a296f",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fmirian%20modas%2FWhatsApp%20Image%202026-07-07%20at%2009.30.44%20(2).jpeg?alt=media&token=122da035-675d-4898-b186-353a36c758e0",

]
},
{
nome:"Belíssima Boutique",
lat:-3.3977372,
lng:-44.3542203,
desconto:"15% de Desconto",
condicoes:"• Válido para todos os produtos da loja \n• Pagamentos à vista",
descricao:"Peças modernas, qualidade e ótimos preços.",
categoria:"moda",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fbelissima%20boutique%2FWhatsApp%20Image%202026-07-07%20at%2009.42.25%20(2).jpeg?alt=media&token=5dc0953b-ccb1-40ef-9609-03d17bc70884",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fbelissima%20boutique%2FWhatsApp%20Image%202026-07-07%20at%2009.42.25.jpeg?alt=media&token=77909834-fbe3-49b1-bbb4-b6e0f5de79fc",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fbelissima%20boutique%2FWhatsApp%20Image%202026-07-07%20at%2009.42.25%20(1).jpeg?alt=media&token=8493e42b-179c-4be9-9328-3eb7a4c8abb8",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fbelissima%20boutique%2FWhatsApp%20Image%202026-07-07%20at%2009.42.24.jpeg?alt=media&token=89edb753-6b78-44d3-8afc-879f33a021e8",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Fbelissima%20boutique%2FWhatsApp%20Image%202026-07-07%20at%2009.42.24%20(1).jpeg?alt=media&token=c7b76cec-efd8-4ab3-bb0a-d077f33ae286",

]
},
{
nome:"Is Digital",
lat:-3.3939241,
lng:-44.3569317,
desconto:"10% a 15% de Desconto",
condicoes:"• Válido para acessórios e serviços \n• Desconto em aparelhos celulares durante campanhas especificas oferecidas pelo Clube \n• Pagamentos à vista",
descricao:"Loja especializada em aparelhos celulares, acessórios e serviços de assistência técnica.",
categoria:"tecnologia",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fis%20digital%2FWhatsApp%20Image%202026-07-07%20at%2009.58.38.jpeg?alt=media&token=a0a239dd-06a8-44d1-9e19-c994ab318c2d",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fis%20digital%2FWhatsApp%20Image%202026-07-07%20at%2009.58.39%20(1).jpeg?alt=media&token=6ffe26f1-0d97-49e0-9ca9-d69f93a74f5f",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fis%20digital%2FWhatsApp%20Image%202026-07-07%20at%2009.58.39%20(2).jpeg?alt=media&token=2be4814f-1341-455e-9940-c71e1c27337b",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fis%20digital%2FWhatsApp%20Image%202026-07-07%20at%2009.58.39.jpeg?alt=media&token=a3af2ba0-2f71-4c5a-9490-12b33045acc9",

]
},

{
nome:"Nutri Agro Rações",
lat:-3.3961685,
lng:-44.3561290,
desconto:"5% a 10% de Desconto",
condicoes:"• Válido para ferramentas e medicamentos em geral \n• Pagamentos à vista",
descricao:"Loja especializada em ferramentas, suplementos e medicamentos veterinários.",
categoria:"agropecuaria",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/rural%2Fnutre%20agro%20ra%C3%A7%C3%B5es%2FWhatsApp%20Image%202026-07-07%20at%2010.11.13.jpeg?alt=media&token=d6525236-aa5e-4efb-8571-3d6683169f03",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/rural%2Fnutre%20agro%20ra%C3%A7%C3%B5es%2FWhatsApp%20Image%202026-07-07%20at%2010.11.13%20(1).jpeg?alt=media&token=8c3a99ff-8c6f-4af3-b33d-8dfbd33c22a9",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/rural%2Fnutre%20agro%20ra%C3%A7%C3%B5es%2FWhatsApp%20Image%202026-07-07%20at%2010.11.14%20(1).jpeg?alt=media&token=c30323d0-d1e7-4d26-9bea-22140254be77",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/rural%2Fnutre%20agro%20ra%C3%A7%C3%B5es%2FWhatsApp%20Image%202026-07-07%20at%2010.11.14.jpeg?alt=media&token=d6754a2d-976a-46ea-835a-3ef213dea00f",

]
},

{
nome:"Casa Home Center",
lat:-3.4035062,
lng:-44.3541757,
desconto:"10% de Desconto",
condicoes:"• Válido nos seguintes setores  \n- pendentes: iluminação \n- utilitários: utensílios em geral \n- cadeiras em geral \n• Pagamentos à vista",
descricao:"Loja especializada em materiais para construção, reforma e produtos para o lar.",
categoria:"construção",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/costru%C3%A7ao%2Fcasa%20home%20center%2FWhatsApp%20Image%202026-07-07%20at%2010.25.17.jpeg?alt=media&token=b167eaaf-b84b-4e6d-b463-52a2dba789b8",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/costru%C3%A7ao%2Fcasa%20home%20center%2FWhatsApp%20Image%202026-07-07%20at%2010.25.17%20(5).jpeg?alt=media&token=b56f729c-1491-46a5-9a8a-26da426222e5",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/costru%C3%A7ao%2Fcasa%20home%20center%2FWhatsApp%20Image%202026-07-07%20at%2010.25.17%20(6).jpeg?alt=media&token=16831918-893e-41ab-afcd-3b29f61faba8",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/costru%C3%A7ao%2Fcasa%20home%20center%2FWhatsApp%20Image%202026-07-07%20at%2010.25.17%20(4).jpeg?alt=media&token=8b6e439b-172b-41fd-9248-b7d36634a8a9",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/costru%C3%A7ao%2Fcasa%20home%20center%2FWhatsApp%20Image%202026-07-07%20at%2010.25.17%20(3).jpeg?alt=media&token=e19a8696-3875-4d86-afc0-1f80cf230005",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/costru%C3%A7ao%2Fcasa%20home%20center%2FWhatsApp%20Image%202026-07-07%20at%2010.25.17%20(2).jpeg?alt=media&token=f9cda03f-0cf1-4dc2-8926-1aba3b3fd3bb",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/costru%C3%A7ao%2Fcasa%20home%20center%2FWhatsApp%20Image%202026-07-07%20at%2010.25.17%20(1).jpeg?alt=media&token=3b98f15a-5381-482e-a0d9-5984e5d512af",

]
},

{
nome:"Shopping do Celular",
lat:-3.3968352,
lng:-44.3575881,
desconto:"20% de Desconto",
condicoes:"• Válido para todos os produtos da loja. \n• Pagamentos à vista",
descricao:"Loja de eletrônicos com variedade em celulares, acessórios e produtos de tecnologia.",
categoria:"tecnologia",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fshoppig%20celular%2FWhatsApp%20Image%202026-07-07%20at%2012.10.27.jpeg?alt=media&token=75065f27-71be-4885-9fb3-a39058e19a1f",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fshoppig%20celular%2FWhatsApp%20Image%202026-07-07%20at%2012.10.26.jpeg?alt=media&token=8e5056d1-84f3-426d-8e7e-1e565055bb4a",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fshoppig%20celular%2FWhatsApp%20Image%202026-07-07%20at%2012.10.26%20(3).jpeg?alt=media&token=8506b570-86f6-4648-b487-afc168f31a3e",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fshoppig%20celular%2FWhatsApp%20Image%202026-07-07%20at%2012.10.26%20(2).jpeg?alt=media&token=b5a9381c-14bc-4964-8005-b9971f17bd55",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fshoppig%20celular%2FWhatsApp%20Image%202026-07-07%20at%2012.10.26%20(1).jpeg?alt=media&token=faebb90e-cbcf-4b2f-b408-0008273d62ff",
]
},



{
nome:"Ita Print",
lat:-3.3955454,
lng:-44.3554896,
desconto:"10% de Desconto",
condicoes:"• Desconto válido para sevirços graficos em geral \n• Pagamentos à vista",
descricao:"Empresa que atua com serviços gráficos, oferecendo impressões, comunicação visual e materiais personalizados para diversos segmentos",
categoria:"gráfica",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fita%20print%2FWhatsApp%20Image%202026-07-07%20at%2012.22.00.jpeg?alt=media&token=161c9556-8a45-49c9-a0c7-cb86e25cba76",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fita%20print%2FWhatsApp%20Image%202026-07-07%20at%2012.22.01%20(1).jpeg?alt=media&token=250e258e-846a-4487-bb21-03c63c9ca2ac",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fita%20print%2FWhatsApp%20Image%202026-07-07%20at%2012.22.01%20(2).jpeg?alt=media&token=3806c1fa-3a6c-4c6f-a171-9088140e3d2f",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fita%20print%2FWhatsApp%20Image%202026-07-07%20at%2012.22.01.jpeg?alt=media&token=242b7613-a6b5-4c2c-a259-ad5aeff752c1",


]
},

{
nome:"Lm Moda Masculina",
lat:-3.3963021,
lng:-44.3593416,
desconto:"10% de Desconto",
condicoes:"• Válido para compras a partir de R$ 50,00 \n• Pagamentos à vista",
descricao:"Loja de moda com roupas modernas e preços acessíveis.",
categoria:"moda",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Flm%20moda%20masculina%2FWhatsApp%20Image%202026-07-07%20at%2012.30.36.jpeg?alt=media&token=6beec362-f4f0-4361-9869-4ba30020a310",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Flm%20moda%20masculina%2FWhatsApp%20Image%202026-07-07%20at%2012.30.37%20(1).jpeg?alt=media&token=79534f30-2ced-419d-bbd1-cbdef5ba223c",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Flm%20moda%20masculina%2FWhatsApp%20Image%202026-07-07%20at%2012.30.37.jpeg?alt=media&token=d2670776-9536-4f50-9f80-d2bcffcb4c67",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Flm%20moda%20masculina%2FWhatsApp%20Image%202026-07-08%20at%2012.45.22.jpeg?alt=media&token=3a9a2472-dab6-4f34-aac1-534436b558a1",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/modas%2Flm%20moda%20masculina%2FWhatsApp%20Image%202026-07-08%20at%2012.45.22%20(1).jpeg?alt=media&token=70a69947-63de-47ee-883a-df4f39764045",


]
},

{
nome:"Ótica Carolli",
lat:-3.3949158,
lng:-44.3579147,
desconto:"30% de Desconto",
condicoes:"• Pagamentos à vista\n• 25% de Desconto em pagamentos parcelados",
descricao:"Ótica especializada em óculos de grau, óculos de sol e acessórios, com qualidade e variedade.",
categoria:"ótica",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20caroli%2FWhatsApp%20Image%202026-07-08%20at%2013.09.54.jpeg?alt=media&token=e8f3825b-99a1-437d-8e45-36952335df44",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20caroli%2FWhatsApp%20Image%202026-07-08%20at%2013.09.55%20(1).jpeg?alt=media&token=aabf0856-3cd4-4bb4-a97d-ff1302c73e3a",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20caroli%2FWhatsApp%20Image%202026-07-08%20at%2013.09.55%20(2).jpeg?alt=media&token=9ed3ecd9-3034-4779-9e7b-c16f03582bb9",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20caroli%2FWhatsApp%20Image%202026-07-08%20at%2013.09.55%20(3).jpeg?alt=media&token=36801a20-ae59-4488-a059-a69daf798ba9",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20caroli%2FWhatsApp%20Image%202026-07-08%20at%2013.09.55.jpeg?alt=media&token=d0787431-b9e1-49c4-a22c-0bf6255de28d",




]
},

{
nome:"Ótica Popular",
lat:-3.3967261,
lng:-44.3560180,
desconto:"30% de Desconto",
condicoes:"• Pagamentos à vista\n• 25% de Desconto em pagamentos parcelados",
descricao:"Ótica especializada em óculos de grau, óculos de sol e acessórios, com qualidade e variedade.",
categoria:"ótica",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20popular%2FWhatsApp%20Image%202026-07-08%20at%2016.48.17.jpeg?alt=media&token=d9971b5c-2750-496a-a1c7-ba9bc938b758",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20popular%2FWhatsApp%20Image%202026-07-08%20at%2016.45.02.jpeg?alt=media&token=11b21c0a-3aa2-48a5-b7e5-638374e03357",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20popular%2FWhatsApp%20Image%202026-07-08%20at%2016.45.02%20(2).jpeg?alt=media&token=db81a1d5-20f8-4dfb-a9b5-d1d6294f9557",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/oticas%2Fotica%20popular%2FWhatsApp%20Image%202026-07-08%20at%2016.45.02%20(1).jpeg?alt=media&token=c72c7085-29d9-4b4f-a6a5-ee6f6764cd54",





]
},

{
nome:"Carlos Celulares",
lat:-3.3942555,
lng:-44.3596233,
desconto:"10% a 20% de Desconto",
condicoes:"• Descontos variam conforme o produto ou seviço \n• Pagamentos à vista",
descricao:"Loja especializada em assistência técnica para celulares e acessórios para diversos modelos.",
categoria:"tecnologia",
imagens:[
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fcarlos%20celulares%2FWhatsApp%20Image%202026-07-08%20at%2017.00.26.jpeg?alt=media&token=c426e543-d0ef-4f52-b47f-98df23c86605",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fcarlos%20celulares%2FWhatsApp%20Image%202026-07-08%20at%2017.00.27%20(1).jpeg?alt=media&token=7e860798-77ae-414f-a249-7577cbc24cf3",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fcarlos%20celulares%2FWhatsApp%20Image%202026-07-08%20at%2017.00.27%20(2).jpeg?alt=media&token=0bafbb91-87fd-4764-8f76-a36b41bb96d3",
"https://firebasestorage.googleapis.com/v0/b/meu-desconto-6ecd2.firebasestorage.app/o/tegnologia%2Fcarlos%20celulares%2FWhatsApp%20Image%202026-07-08%20at%2017.00.27.jpeg?alt=media&token=ea8e3acb-9842-441b-93bd-0fc0fb63ecbf",





]
},






];

/* EMBARALHAR LOJAS */
function embaralharLojas(array){
for(let i=array.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[array[i],array[j]]=[array[j],array[i]];
}
}

function initMap(){

embaralharLojas(lojas);

const centro={lat:-3.398823,lng:-44.356215};

map=new google.maps.Map(document.getElementById("map"),{
center:centro,
zoom:14,
disableDefaultUI:true,
gestureHandling:"greedy",
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
// Pré-carrega capas em background para abrir modal mais rápido
setTimeout(()=>preCarregarCapas(lojas), 800);

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

  markers.forEach(m => m.setMap(null));
  markers = [];

  // Cor por categoria
  const coresCat = {
    farmacia:     { bg1:"#4ade80", bg2:"#16a34a", borda:"#14532d" },
    tecnologia:   { bg1:"#60a5fa", bg2:"#2563eb", borda:"#1e3a8a" },
    moda:         { bg1:"#f472b6", bg2:"#db2777", borda:"#831843" },
    beleza:       { bg1:"#fb923c", bg2:"#ea580c", borda:"#7c2d12" },
    construção:   { bg1:"#a78bfa", bg2:"#7c3aed", borda:"#4c1d95" },
    agropecuaria: { bg1:"#86efac", bg2:"#15803d", borda:"#14532d" },
    gráfica:      { bg1:"#f87171", bg2:"#dc2626", borda:"#7f1d1d" },
    ótica:        { bg1:"#38bdf8", bg2:"#0284c7", borda:"#0c4a6e" },
  };

  const padrao = { bg1:"#fde68a", bg2:"#b8860b", borda:"#7a5800" };

  function gerarSVG(categoria){
    const c = coresCat[categoria] || padrao;

    const simbolos = {
      farmacia: `
        <rect x="13" y="9"  width="10" height="3" rx="1.5" fill="#fff"/>
        <rect x="13" y="17" width="10" height="3" rx="1.5" fill="#fff"/>
        <rect x="9"  y="13" width="18" height="3" rx="1.5" fill="#fff"/>`,

      tecnologia: `
        <rect x="12" y="8" width="12" height="18" rx="2.5" fill="none" stroke="#fff" stroke-width="2"/>
        <circle cx="18" cy="23" r="1.2" fill="#fff"/>
        <rect x="15" y="11" width="6" height="1.5" rx="0.75" fill="#fff"/>`,

      moda: `
        <circle cx="18" cy="9" r="1.5" fill="none" stroke="#fff" stroke-width="1.6"/>
        <line x1="18" y1="10.5" x2="18" y2="13" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M10 23 L14 14 Q18 12 22 14 L26 23 Q22 20 18 21 Q14 20 10 23Z"
              fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>`,

      beleza: `
        <circle cx="14" cy="11" r="2.5" fill="none" stroke="#fff" stroke-width="1.8"/>
        <circle cx="22" cy="11" r="2.5" fill="none" stroke="#fff" stroke-width="1.8"/>
        <line x1="14" y1="13.5" x2="22" y2="24" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="22" y1="13.5" x2="14" y2="24" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>`,

      construção: `
        <polygon points="18,8 27,16 9,16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>
        <rect x="13" y="16" width="10" height="9" rx="1" fill="none" stroke="#fff" stroke-width="1.8"/>
        <rect x="16" y="20" width="4" height="5" rx="0.5" fill="#fff"/>`,

      agropecuaria: `
        <path d="M18 24 L18 12" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M18 18 C18 18 12 14 10 9 C14 10 18 14 18 18Z" fill="#fff"/>
        <path d="M18 15 C18 15 24 11 26 6 C22 7 18 11 18 15Z" fill="#fff"/>`,

      gráfica: `
        <rect x="11" y="8"  width="14" height="10" rx="1.5" fill="none" stroke="#fff" stroke-width="1.8"/>
        <rect x="13" y="18" width="10" height="7"  rx="1"   fill="none" stroke="#fff" stroke-width="1.8"/>
        <line x1="14" y1="21" x2="22" y2="21" stroke="#fff" stroke-width="1.5"/>
        <line x1="14" y1="23" x2="20" y2="23" stroke="#fff" stroke-width="1.5"/>`,

      ótica: `
        <circle cx="13" cy="17" r="4.5" fill="none" stroke="#fff" stroke-width="1.8"/>
        <circle cx="23" cy="17" r="4.5" fill="none" stroke="#fff" stroke-width="1.8"/>
        <line x1="17.5" y1="17" x2="18.5" y2="17" stroke="#fff" stroke-width="1.8"/>
        <line x1="8.5"  y1="14" x2="8"    y2="12" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="27.5" y1="14" x2="28"   y2="12" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>`,
    };

    const icone = simbolos[categoria] || `
      <circle cx="18" cy="17" r="5" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="18" cy="17" r="2" fill="#fff"/>`;

    
    // Usar viewBox maior com espaço transparente ao redor do pin
    // para que o SVG não corte tiles do mapa. O pin em si fica
    // no centro do viewBox e a área transparente ao redor garante
    // que as ruas vizinhas renderizem sem artefatos. 
    return `<svg xmlns="http://www.w3.org/2000/svg"
      width="72" height="88" viewBox="-18 -22 72 88">
      <defs>
        <radialGradient id="bg_${categoria}" cx="38%" cy="28%">
          <stop offset="0%"   stop-color="${c.bg1}"/>
          <stop offset="100%" stop-color="${c.bg2}"/>
        </radialGradient>
        <filter id="sombra" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5"
            flood-color="rgba(0,0,0,0.55)"/>
        </filter>
      </defs>
      <!-- Pin com sombra -->
      <g filter="url(#sombra)">
        <path d="M18 0C8 0 0 8 0 18c0 12 18 26 18 26S36 30 36 18C36 8 28 0 18 0z"
          fill="url(#bg_${categoria})" stroke="${c.borda}" stroke-width="1.2"/>
      </g>
      <!-- Círculo branco translúcido interno -->
      <circle cx="18" cy="16" r="13" fill="rgba(255,255,255,0.12)"/>
      <!-- Ícone da categoria -->
      ${icone}
    </svg>`;
  }

  function svgParaUrl(svg){
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg.trim());
  }

  lista.forEach(loja => {
    const svg = gerarSVG(loja.categoria);

    const marker = new google.maps.Marker({
      position: { lat: loja.lat, lng: loja.lng },
      map: map,
      icon: {
        url: svgParaUrl(svg),
        // ✅ scaledSize menor que o viewBox — o espaço transparente extra
        // fica fora da área clicável mas impede o bug de corte de tiles
        scaledSize: new google.maps.Size(36, 44),
        // ancora exatamente na ponta do pin (metade da largura, altura total)
        anchor: new google.maps.Point(18, 44),
        // Área clicável apenas no pin, não na sombra
        origin: new google.maps.Point(0, 0)
      },
      title: loja.nome,
      optimized: false  // ✅ ESSENCIAL: desativa canvas agrupado que causa bug de tiles
    });

    marker.addListener("click", () => { openModal(loja); });
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
// Cache de imagens já baixadas
const _imgCache = new Set();

function criarImagemLazy(src){
  const img = document.createElement("img");
  img.loading  = "lazy";
  img.decoding = "async";
  img.style.cssText = "opacity:0;transition:opacity 0.3s ease;";

  function carregarImagem(){
    if(_imgCache.has(src)){
      img.src = src;
      img.style.opacity = "1";
      return;
    }
    const temp = new Image();
    temp.onload = ()=>{
      _imgCache.add(src);
      img.src = src;
      img.style.opacity = "1";
    };
    temp.onerror = ()=>{
      img.src = "";
      img.style.opacity = "1";
    };
    temp.src = src;
  }

  if("IntersectionObserver" in window){
    const obs = new IntersectionObserver((entries, o)=>{
      if(entries[0].isIntersecting){ carregarImagem(); o.disconnect(); }
    }, {rootMargin:"300px"});
    obs.observe(img);
  } else {
    carregarImagem();
  }

  return img;
}

// Pré-carrega a primeira foto de todas as lojas em background
function preCarregarCapas(lista){
  lista.forEach(loja=>{
    if(loja.imagens && loja.imagens[0] && !_imgCache.has(loja.imagens[0])){
      const t = new Image();
      t.onload  = ()=>_imgCache.add(loja.imagens[0]);
      t.onerror = ()=>{};
      t.src = loja.imagens[0];
    }
  });
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
<p class="loja-categoria">${loja.categoria ? loja.categoria.charAt(0).toUpperCase() + loja.categoria.slice(1) : ''}</p>
<p class="loja-desconto">${loja.desconto}</p>
<span class="loja-badge">PARCEIRA OFICIAL</span>
`;

div.appendChild(img);
div.appendChild(info);
div.onclick=()=>openModal(loja);
container.appendChild(div);

});

}
/* MOSTRAR / OCULTAR MAPA */
function toggleMapa(){
  const mapa  = document.getElementById("mapContainer");
  const lista = document.getElementById("lojasContainer");
  const botao = document.getElementById("toggleMapBtn");

  // mapaVisivel = true quando ESTÁ visível (precisamos FECHAR)
  mapaVisivel = mapa.style.display !== "none";

  if(!mapaVisivel){
    // Abrir mapa
    mapa.style.display  = "block";
    lista.style.display = "none";
    document.getElementById("cancelarRotaContainer").style.display = "none";
    botao.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg> Fechar mapa`;
    setTimeout(()=>{
      google.maps.event.trigger(map,"resize");
      if(userMarker){
        map.setCenter(userMarker.getPosition());
      } else {
        map.setCenter({lat:-3.398823,lng:-44.356215});
      }
    },200);
  } else {
    // Fechar mapa
    mapa.style.display  = "none";
    lista.style.display = "block";
    document.getElementById("cancelarRotaContainer").style.display = "none";
    // Limpar rota ao fechar mapa
    if(rotaAtiva){
      directionsRenderer.setDirections({routes:[]});
      rotaAtiva = false;
      renderMarkers(lojas);
    }
    botao.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 3L3 7v14l6-4 6 4 6-4V3l-6 4-6-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg> Ver mapa`;
  }
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
  closeModal();

  if(!userMarker){
    alert("Ative sua localização para calcular a rota.");
    return;
  }

  // Abrir mapa
  document.getElementById("mapContainer").style.display = "block";
  document.getElementById("lojasContainer").style.display = "none";
  document.getElementById("toggleMapBtn").innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  </svg> Fechar mapa`;
  rotaAtiva = true;

  // Esconder marcadores durante a rota
  markers.forEach(m => m.setMap(null));

  // Botão cancelar flutuante dentro do mapa
  mostrarBotaoCancelarFlutuante(function(){
    directionsRenderer.setDirections({routes:[]});
    rotaAtiva = false;
    esconderBotaoCancelarFlutuante();
    document.getElementById("mapContainer").style.display = "none";
    document.getElementById("lojasContainer").style.display = "block";
    document.getElementById("toggleMapBtn").innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 3L3 7v14l6-4 6 4 6-4V3l-6 4-6-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg> Ver mapa`;
    renderMarkers(lojas);
  });

  setTimeout(()=>{ google.maps.event.trigger(map,"resize"); }, 200);

  const request = {
    origin: userMarker.getPosition(),
    destination: {lat:destLat, lng:destLng},
    travelMode: "DRIVING"
  };

  directionsService.route(request,(result,status)=>{
    if(status === "OK"){
      directionsRenderer.setDirections(result);
      const distancia = result.routes[0].legs[0].distance.text;
      const duracao   = result.routes[0].legs[0].duration.text;
      // Toast em vez de alert
      mostrarToast(` ${distancia}  •  ⏱ ${duracao}`);
    } else {
      mostrarToast("Não foi possível calcular a rota.");
    }
  });
}

function mostrarToast(msg){
  let t = document.getElementById("routeToast");
  if(!t){
    t = document.createElement("div");
    t.id = "routeToast";
    t.style.cssText = "position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#d4af37;border:1px solid #d4af37;border-radius:30px;padding:10px 22px;font-size:14px;font-weight:600;z-index:9999;box-shadow:0 4px 18px rgba(0,0,0,.5);opacity:0;transition:opacity .3s;";
    document.body.appendChild(t);
  }
  t.innerText = msg;
  t.style.opacity = "1";
  setTimeout(()=>{ t.style.opacity = "0"; }, 4000);
}

function mostrarBotaoCancelarFlutuante(onCancelar){
  let btn = document.getElementById("floatCancelarBtn");
  if(!btn){
    btn = document.createElement("button");
    btn.id = "floatCancelarBtn";
    btn.style.cssText = [
      "position:absolute",
      "top:10px",
      "left:50%",
      "transform:translateX(-50%)",
      "z-index:500",
      "background:rgba(255,255,255,0.97)",
      "color:#111111",
      "border:none",
      "border-radius:20px",
      "padding:8px 16px",
      "font-size:12px",
      "font-weight:700",
      "cursor:pointer",
      "display:inline-flex",
      "align-items:center",
      "gap:6px",
      "box-shadow:0 2px 12px rgba(0,0,0,0.25)",
      "letter-spacing:0.02em",
      "white-space:nowrap",
      "user-select:none"
    ].join(";");
    const mapContainer = document.getElementById("mapContainer");
    mapContainer.style.position = "relative";
    mapContainer.appendChild(btn);
  }
  btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg> Cancelar rota`;
  btn.style.display = "inline-flex";
  btn.onclick = onCancelar;
}

function esconderBotaoCancelarFlutuante(){
  const btn = document.getElementById("floatCancelarBtn");
  if(btn) btn.style.display = "none";
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

/* ACCORDION DO MODAL */
function toggleSec(id) {
  const sec = document.getElementById(id);
  if (!sec) return;
  const corpo = sec.querySelector('.secao-corpo');
  const seta  = sec.querySelector('.secao-seta');
  const aberto = corpo.classList.contains('secao-corpo-aberto');
  if (aberto) {
    corpo.classList.remove('secao-corpo-aberto');
    if (seta) seta.classList.remove('secao-seta-aberta');
  } else {
    corpo.classList.add('secao-corpo-aberto');
    if (seta) seta.classList.add('secao-seta-aberta');
  }
}


