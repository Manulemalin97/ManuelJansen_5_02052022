
/////////////////////////////// copié collé des premieres lignes de la page product.js/////////////////////////////////////////////
// let string = window.location.href;
// var url = new URL(string);
// let idProduct = url.searchParams.get("id");
// console.log(idProduct);


//grace a window.location.href on affiche l'id du bon élément sur la page produit
let string = window.location.href;
let url = new URL(string);
let idOrder = url.searchParams.get("id");

let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;


