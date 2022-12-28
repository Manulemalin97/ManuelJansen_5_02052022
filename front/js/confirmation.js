
// La propriété href de l'objet location stocke l'URL de la page Web actuelle.
let string = window.location.href;
let url = new URL(string);
let idOrder = url.searchParams.get("id");
let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;



