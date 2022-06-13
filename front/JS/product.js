
const windowsSearch = (window.location.search);
const url = new URLSearchParams(windowsSearch)
const id = url.get("id")

const itemImg = document.getElementsByClassName("item__img")[0];
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const optionColor = document.getElementById("colors");
const addCart = document.getElementById("addToCart");



function fetchProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(data => product(data))
};

function product(data) {
    const createImg = document.createElement("img")
    itemImg.appendChild(createImg)
    createImg.src = data.imageUrl;
    createImg.alt = data.altTxt
    title.innerHTML = data.name
    price.innerHTML = data.price
    description.innerHTML = data.description
    for (let color of data.colors) {
        const createOption = document.createElement("option")
        optionColor.appendChild(createOption)
        createOption.value = color
        createOption.innerHTML = color
    };

};



function cart() {

    addCart.addEventListener("click", (event) => {
        const color = optionColor.value;
        const quantity = document.getElementById("quantity").value;
        console.log(id)
        console.log(color)
        console.log(quantity)


    })

};

function loadProduct() {
    fetchProduct(),
    cart();

};

window.onload = loadProduct