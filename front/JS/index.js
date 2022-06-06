console.log("charger")

const items = document.getElementById("items")
const createa = document.createElement("a")
function fetchProduct(){
    fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let index = 0; index < 7; index++) {
            const id = data[index]._id;
            const imageUrl = "test " + data[index].imageUrl;
            console.log(imageUrl)
            
        }
    })

}


function loadProduct(){

    // recup de l'element id items
    fetchProduct()
    //recup de fetch(http://localhost:3000/api/products) 
    //boucle for sur le resultat fetch
    // dans la boucle generer une chaine de caractere qui contient le html des articles
    // assigner dans le inerhtml de items la valeurs que je recupere (la chaine de caracterre)

};

window.onload = loadProduct
