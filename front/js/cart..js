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

//Si l'article n'est pas présent dans le localStorage, renvoie d'un message
async function getAPIProducts(products) {
    if (products === null || products == 0) {
      document.querySelector("#totalQuantity").innerHTML = "0";
      document.querySelector("#totalPrice").innerHTML = "0";
      document.querySelector("h1").innerHTML =
        "Vous n'avez pas d'article dans le panier";
    }
    try {
      for (let i = 0; i < products.length; i++) {
        let api_product = null;
        await fetch(`http://localhost:3000/api/products/` + products[i].id)
          .then((res) => res.json())
          .then((data) => (api_product = data));
        if (!api_product) {
          continue;
        }
        api_product.color = products[i].color;
        api_product.quantity = products[i].quantity;
        api_products.push(api_product);
        nameOrder();
      }
      displayProducts();
    } catch (err) {
      console.error(err);
    }
  }

