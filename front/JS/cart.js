



function viewProductStorage() {
    for (let index = 0; index < localStorage.length; index++) {
        const product = localStorage.getItem(localStorage.key(index));
        const productData = JSON.parse(product)
        console.log(productData.title)
        const cartId = document.getElementById("cart__items")
        cartId.innerHTML += `
            <article class="cart__item" data-id="${productData.id}" data-color="${productData.color}">
        <div class="cart__item__img">
        <img src="${productData.img}"${productData.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productData.title}</h2>
            <p>${productData.color}</p>
            <p>${productData.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`

    };

}



function loadProduct() {
viewProductStorage()
};

window.onload = loadProduct