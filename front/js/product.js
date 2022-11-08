//Récupération de l'ID dans l'url avec URLSearchParams.
var url = new URL(window.location.href);
let product_id = new URLSearchParams(window.location.search).get("_id");
//Appel de l'API pour recevoir les données du produit possédant l'ID récupéré et ajout de ses valeurs dans le html.
fetch(`http://localhost:3000/api/products/` + product_id)
  .then((product) => product.json()) 
  .then((product) => {
    displayProductInfos(product);
    listenColorsEvent();
    listenQuantityEvent();
  });

// Pamètre actuel de l'object product_client
let product_client = { 
  id : product_id,
  color : "",
  quantity : 0
};

// Déclaration des selectors
let product_img = document.querySelector(".item__img");
let product_title = document.querySelector("#title");
let product_price = document.querySelector("#price");
let product_description = document.querySelector("#description");
let product_colors = document.querySelector("#colors");
let product_nb = document.querySelector("#quantity");
let color_miss = document.querySelector(".item__content");

// Afficher les infos du produit avec une boucle for 
function displayProductInfos(product) { 
  product_img.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  product_title.innerHTML += `<h1 id="title"> ${product.name} </h1>`;
  product_price.innerHTML += `<span id="price"> ${product.price} </span>`;
  product_description.innerHTML += `<p id="description"> ${product.description} </p>`;
  for (let i = 0; i < product.colors.length; i++) {
    product_colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
}

// Récuperée la value de la couleur quand elle change
function listenColorsEvent() {
  product_colors.addEventListener("change", (event) => {
    product_client.color = event.target.value;
    if(product_client.color != 0){
      document.querySelector(".color__miss").textContent = "";
    }
  });
}

// Récuperer la value de quantité quand elle change
function listenQuantityEvent() {
  product_nb.addEventListener("change", (event) => {
    product_client.quantity = parseInt(event.target.value);
    if(product_client.quantity != 0){
      document.querySelector(".quantity__miss").textContent = "";
    }
  });
}


// Click sur le bouton ajouter au panier
let add_cart = document.querySelector("#addToCart");
add_cart.addEventListener("click", () => {
  verifyInput(product_client);
});


// Vérifier la couleur et la quantité choisi
function verifyInput(product_client) {
  if((product_client.color == "") && (product_client.quantity < 1 || product_client.quantity > 100)){
    colorQuantityMiss()
  } else if (product_client.color == "") {
    colorMiss();
  } else if (product_client.quantity < 1 || product_client.quantity > 100) {
    quantityMiss();
  } else {
    if (addLs(product_client)) {
      productAdded();
    } else {
      excessQuantity();
    }
  }
}


// Ajouter le produit au localStorage et ajouter uniquement la quantité
function addLs(product_client) {
  let cart = JSON.parse(localStorage.getItem("product_client")); // JSON.parse permet d'analyser locas.getItem comme du json 
  if (cart == null) {
    cart = [];
    cart.push(product_client);
    localStorage.setItem("product_client", JSON.stringify(cart));
  } else {
    let get_article = cart.find((cart_product) => product_client.id == cart_product.id && product_client.color == cart_product.color);
    if (get_article) {
      let nb = Number(product_client.quantity) + Number(get_article.quantity);
      if (nb < 101){
      get_article.quantity = nb;
      localStorage.setItem("product_client", JSON.stringify(cart));
      } else {
        return false
      }
    } else {
      cart.push(product_client);
      localStorage.setItem("product_client", JSON.stringify(cart));
    }
  } return true
} 

// Fonction pour les messages d'erreurs
let newElt = document.createElement("span");
let elt = color_miss;
elt.appendChild(newElt);
newElt.classList.add("color__miss", "quantity__miss","product__added", "excess__quantity");

function styleError(){
  newElt.style.color = "black";
  newElt.style.fontWeight = "bold";
  newElt.style.textAlign = "center";
  newElt.style.paddingTop = "5px";
}
function style(){
  newElt.style.color = "black";
  newElt.style.fontWeight = "bold";
  newElt.style.textAlign = "center";
  newElt.style.paddingTop = "5px";
}

function colorQuantityMiss(){
  document.querySelector(".color__miss , .quantity__miss").textContent = "Merci de bien choisir une couleur et une quantité";
  styleError()
}

function colorMiss(){
  document.querySelector(".color__miss").textContent = "Merci de bien vouloir choisir une couleur";
  styleError()
}

function quantityMiss(){
  document.querySelector(".quantity__miss").textContent = "Veuillez choisir une quantité comprise entre 1 et 100";
  styleError()
}

function productAdded(){
  document.querySelector(".product__added").textContent = `Votre commande à bien était ajoutée au panier`;
  style()
}

function excessQuantity(){
  document.querySelector(".excess__quantity").textContent = "La quantité total de l'article ne peux dépasser 100";
  styleError()
}



