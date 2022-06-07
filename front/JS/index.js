
const items = document.getElementById("items")

function fetchProduct() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (let index = 0; index < data.length; index++) {
                items.innerHTML = items.innerHTML+ `
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
// let result = await fetch('http://localhost:3000/api/products') 
//result.json let data = result.json


function loadProduct() {

    // recup de l'element id items
    fetchProduct();
    //recup de fetch(http://localhost:3000/api/products) 
    //boucle for sur le resultat fetch
    // dans la boucle generer une chaine de caractere qui contient le html des datas
    // assigner dans le inerhtml drre)e items la valeurs que je recupere (la chaine de caracte

};

window.onload = loadProduct
