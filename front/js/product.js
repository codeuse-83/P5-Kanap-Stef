//Récupération de l'ID dans l'Url avec UrlSearchParams
var url = new URL(window.location.href);
let product_id = new URLSearchParams(window.location.search).get("_id");

//Appel de l'API pour recevoir les données du produit possédant l'ID récupérer et ajout des ses valeurs dasn le HTML
fetch(`http://localhost:3000/api/products/` + product_id)
.then((product) => product.json())
.then((product) => {
    displayProductsInfos(product);
    listenColorsEvent();
    listenQuanityEvent();
});

//Paramètre actuels du produit
let product_client = {
    id : product_id,
    color : "",
    quantity : 0
};

//Déclaration des selectors
let product_img = document.querySelector(".item__img");
let product_title = document.querySelector("#title");
let product_price = document.querySelector("#price");
let product_description = document.querySelector("#description");
let product_colors = document.querySelector("#colors");
let product_nb = document.querySelector("#quantity");
let product_miss = document.querySelector(".item__content");

//Affichage des infos sur le produit avec une boucle for
function displayProductsInfos(product) {
    product_img.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    product_title.innerHTML += `<h1 id="title"> ${product.name} </h1>`;
    product_price.innerHTML += `<span id>="price"> ${product.price} </span>`;
    product_description.innerHTML += `<p id="description"> ${product.description} </p>`;
    for (let i = 0; i < product.colors.length; i++) {
        product_colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
}

//Récuperée la valeur de la couleur quand elle change
function listenColorsEvent() {
  product_colors.addEventListener("change" , (event) => {
    product_client.color = event.target.value;
    if(product_client.color != 0) {
        document.querySelector(".color__miss").textContent = "";
    }
  })  
}

//Récuperer la value de la quantité quand elle change
function listenQuantityEvent() {
    product_nb.addEventListener("change", (event) => {
      product_client.quantity = parseInt(event.target.value);
      if(product_client.quantity != 0){
        document.querySelector(".quantity__miss").textContent = "";
      }
    });
  }

