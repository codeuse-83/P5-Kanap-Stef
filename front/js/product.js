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
