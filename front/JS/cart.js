

const items = []

// Affichage de(s) produit(s) via le localstorage et création du DOM via le templating

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

// Mise a jour du prix et de la quantité dans le panier

function theQuantity() {
  const totalQuantity = document.getElementById("totalQuantity")

  let total = 0
  for (let index = 0; index < items.length; index++) {
    const quantity = items[index].quantity
    total = parseInt(quantity, 10) + total
  }
  totalQuantity.innerHTML = total

}

function thePrice() {
  const totalPrice = document.getElementById("totalPrice")
  let total = 0
  for (let index = 0; index < items.length; index++) {
    const price = items[index].price * items[index].quantity;
    total = parseInt(price, 10) + total
  }
  totalPrice.innerHTML = total
}

function update() {
  const itemQuantity = document.getElementsByClassName("itemQuantity")
  for (let index = 0; index < itemQuantity.length; index++) {
    itemQuantity[index].addEventListener("change", (e) => {
      let quantity
      const cartItemInfo = document.getElementsByClassName("cart__item")
      quantity = itemQuantity[index].value
      const productId = items.find(item => item.id == cartItemInfo[index].dataset.id && item.color == cartItemInfo[index].dataset.color)
      productId.quantity = quantity
      localStorage.setItem(`${items[index].id}${items[index].color}`, JSON.stringify(productId))
      theQuantity()
      thePrice()
    })

  }
}

// Mise en place du bouton supprimé

function deleteItemOnCart() {
  const deleteItem = document.getElementsByClassName("deleteItem")
  for (let index = 0; index < items.length; index++) {
    deleteItem[index].addEventListener("click", (e) => {
      const cartItem = document.querySelector(`article[data-id="${items[index].id}"][data-color="${items[index].color}"]`);
      items.filter(
        (item => item.id != cartItem.attributes[1].value && item.color != cartItem.attributes[2].value)
      )
      cartItem.remove()
      localStorage.removeItem(`${cartItem.attributes[1].value}${cartItem.attributes[2].value}`)
      theQuantity()
      thePrice()
      location.reload()
    })

  }
}

// Mise en place du bouton commandé avec validation du formulaire

function order() {
  const orderButton = document.getElementById("order")
  orderButton.addEventListener("click", (event) => giveOrder(event))

}

function giveOrder(event) {
  event.preventDefault()
  if (items.length === 0 || firstName() === false || lastName() === false || address() === false || city() === false || email() === false) {
    alert("veuillez sélectionner un produit et bien remplir le formulaire")
    formValid()
  }else{
    const body = contacts()
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/JSON"
      }
      
    })
    .then(response => response.json())
    .then((data) => {
      const dataOrderId = data.orderId
      window.location.href = "/html/confirmation.html"+ "?orderId=" + dataOrderId
      
    })

  }
  

}

function contacts() {
  const cartOrder = document.getElementsByClassName("cart__order__form")
  const body = {
    contact: {
      firstName: cartOrder[0].elements[0].value,
      lastName: cartOrder[0].elements[1].value,
      address: cartOrder[0].elements[2].value,
      city: cartOrder[0].elements[3].value,
      email: cartOrder[0].elements[4].value,

    },
    products: contactProductId()
  }

  return body
}

function contactProductId() {

  const cartItemInfo = document.getElementsByClassName("cart__item")
  const productIds = []
  for (let index = 0; index < cartItemInfo.length; index++) {
    productId = [cartItemInfo[index].dataset.id];
    productIds.push(productId)
  }
  console.log(productIds)
  return productIds
}

// Gestion du formulaire avec les RegExp

function formValid() {
  const inputFirstName = document.getElementById("firstName")
  const inputLastName = document.getElementById("lastName")
  const inputAddress = document.getElementById("address")
  const inputCity = document.getElementById("city")
  const inputEmail = document.getElementById("email")
    inputFirstName.addEventListener("change", () => firstName())
    inputLastName.addEventListener("change", () => lastName())
    inputAddress.addEventListener("change", () => address())
    inputCity.addEventListener("change", () => city())
    inputEmail.addEventListener("change", () => email())
  

}

function firstName() {
  const firstNameRegExp = /^(?=.{3,50}$)[a-zA-Zéèà-]+(?:['_.\s][a-zA-Zéèà-]+)*$/
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
  let inputFirstName = document.getElementById("firstName")
  if (firstNameRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.textContent = "";
    return true;
    
  } else {
    firstNameErrorMsg.textContent = "Merci de bien vouloir saisir un Prénom valide"
    return false;
    
  }
  
}
function lastName() {
  const lastNameRegExp = /^(?=.{3,50}$)[a-zA-Zéèà-]+(?:['_.\s][a-zA-Zéèà-]+)*$/
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
  let inputLastName = document.getElementById("lastName")
  if (lastNameRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.textContent = "";
    return true;
    
  } else {
    lastNameErrorMsg.textContent = "Merci de bien vouloir saisir un Nom valide"
    return false;
  }

}

function address() {
  const addressRegExp = /^(?=.{3,50}$)[a-zA-Zéèàç0-9\s,. '-]{3,}$/
  const addressErrorMsg = document.getElementById("addressErrorMsg")
  let inputAddress = document.getElementById("address")
  if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.textContent = "";
    return true;

  } else {
    addressErrorMsg.textContent = "Merci de bien vouloir saisir une Adresse valide"
    return false;
  }
}

function city() {
  const cityRegExp = /^(?=.{3,50}$)[a-zA-Zéèà-]+(?:['_.\s][a-zA-Zéèà-]+)*$/
  const cityErrorMsg = document.getElementById("cityErrorMsg")
  let inputCity = document.getElementById("city")
  if (cityRegExp.test(inputCity.value)) {
    cityErrorMsg.textContent = "";
    return true;

  } else {
    cityErrorMsg.textContent = "Merci de bien vouloir saisir une Ville valide"
    return false;
  }

}
function email() {
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[a-z]{2,4}$/g;
  const emailErrorMsg = document.getElementById("emailErrorMsg")
  let inputEmail = document.getElementById("email")
  if (emailRegExp.test(inputEmail.value)) {
    emailErrorMsg.textContent = "";
    return true;

  } else {
    emailErrorMsg.textContent = "Merci de bien vouloir saisir un Email valide"
    return false;
  }
}


function loadProduct() {
  viewProductStorage(),
    theQuantity(),
    thePrice(),
    update(),
    deleteItemOnCart();
  order(),
  formValid();
};

window.onload = loadProduct