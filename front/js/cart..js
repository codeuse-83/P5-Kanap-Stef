let cart = JSON.parse(localStorage.getItem("product_client"));
let api_products = [];

//Affichage des produits par ordre alphabétique
  
function nameOrder() {
  api_products.sort(function (a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

api_products(cart);

