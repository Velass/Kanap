// Affichage de la liste des produits

const items = document.getElementById("items")

function fetchProduct() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.length; index++) {
                items.innerHTML += `
                <a href=./product.html?id=${data[index]._id}>
                   <article>
                     <img src=${data[index].imageUrl} alt=${data[index].altTxt}>
                     <h3 class="productName">${data[index].name}</h3>
                     <p class="productDescription">${data[index].description}</p>
                   </article>
                </a> `;
            }
        })

}

function loadProduct() {

    fetchProduct();

};

window.onload = loadProduct
