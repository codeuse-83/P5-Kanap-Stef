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

  // Sélections de chaque produits du tableau api_products
 
function displayProducts() {
  let cart_items = document.querySelector("#cart__items");
  cart_items.innerHTML = api_products
    .map((product) => {
      return `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" >Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
    })
    .join("");
  listenDeleteEvents();
  changeInput();
  totalQty();
}


