
const windowsSearch = (window.location.search);
const url = new URLSearchParams(windowsSearch)
const id = url.get("id")

const itemImg = document.getElementsByClassName("item__img")[0];
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const optionColor = document.getElementById("colors");
const addCart = document.getElementById("addToCart");
const createImg = document.createElement("img")


function fetchProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(data => product(data))
};

function product(data) {

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
        if (color == "" || quantity <= 0) {
            alert("veuillez selectionner une couleur et une quantité")
        } else {
            let data = {
                id: id,
                title: title.innerHTML,
                color: color,
                quantity: quantity,
                img: createImg.src,
                alt: createImg.alt,

            };
            localStorage.setItem(id, JSON.stringify(data));
            let dataStorage = JSON.parse(localStorage.getItem("data"));
            alert("article ajoutée")
            // localStorage.getItem("clé");
            // localStorage.removeItem("clé");
            // localStorage.clear();
           
        }

    })

};

function loadProduct() {
    fetchProduct(),
        cart();

};

window.onload = loadProduct