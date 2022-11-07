let items_container = document.querySelector(".items");

//Récupération de l'API et envoie une requête au back-end
fetch(`http://localhost:3000/api/products`)
//Récupération des données de l'API dans un fichier .json
.then((products) => products.json())
.then((products) => {
    displayProducts(products);
});

//Fonction pour afficher les éléments HTML
function displayProducts(products) {
    items_container.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        // c'est ici que les canapés s'affichent
        items_container.innerHTML +=`
        <a href="./product.html?_id=${products[i]._id}">
        <article>
        <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
        <h3 class="productName">${products[i].name}</h3> 
        <p class="productDescription">${products[i].description}</p>
      </article>
    </a>`;
  }
}
