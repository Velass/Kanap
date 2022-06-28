
const items = []


function viewProductStorage() {
  for (let index = 0; index < localStorage.length; index++) {
    const product = localStorage.getItem(localStorage.key(index));
    const productData = JSON.parse(product)
    items.push(productData)
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
function theQuantity() {
  const totalQuantity = document.getElementById("totalQuantity")
  let total = 0
  for (let index = 0; index < items.length; index++) {
    const quantity = items[index].quantity
    total = parseInt(quantity, 10) + parseInt(total, 10)
    totalQuantity.innerHTML = total
  }

}

function thePrice() {
  const totalPrice = document.getElementById("totalPrice")
  let total = 0
  for (let index = 0; index < items.length; index++) {
    const price = items[index].price * items[index].quantity;
    total = parseInt(price, 10)+ parseInt(total, 10)
    totalPrice.innerHTML = total
  }

}



function loadProduct() {
  viewProductStorage(),
    theQuantity(),
    thePrice();
};

window.onload = loadProduct