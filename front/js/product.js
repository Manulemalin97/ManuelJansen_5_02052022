
//grace a window.location.href on affiche l'id du bon élément sur la page produit
let string = window.location.href;
var url = new URL(string);
let idProduct = url.searchParams.get("id");
console.log(idProduct);


//Ensuite on récupère les donées de l'Api
fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => res.json())
    .then((article) => {
        console.log(article);
console.log(article.name)
console.log(article.description)
        let name = article.name
        let description = article.description
        let price = article.price
        let nameHtml = document.getElementById("title")
        nameHtml.textContent = name
       let priceHtml = document.getElementById("price")
       priceHtml.textContent = price

    });





// On utilise l'objet url
//var str = "http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926";
//var url = new URL(str);
var name = url.searchParams.get("description");
console.log(description)
// Méthode 'has' pour vérifier si le paramètre existe
var str = "http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926";
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 

if(search_params.has('price')) {
  var name = search_params.get('price');
  console.log(price)
}
