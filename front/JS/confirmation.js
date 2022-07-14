// Mise en place du numéro de commande

function orderNumber() {
    const windowsSearch = (window.location.search);
    const url = new URLSearchParams(windowsSearch)
    const orderId = url.get("orderId")
    const id = document.getElementById("orderId")
    id.textContent = orderId
    localStorage.clear()
}

function loadProduct() {
    orderNumber();
}

window.onload = loadProduct