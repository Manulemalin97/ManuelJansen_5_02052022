// La propriété href de l'objet location stocke l'URL de la page Web actuelle.
// En modifiant la propriété href , un utilisateur peut accéder à une nouvelle URL
let string = window.location.href;
var url = new URL(string);
//L'interface URLSearchParams définit des méthodes utilitaires pour travailler avec la chaîne de requête d'une URL.
let idProduct = url.searchParams.get("id");
console.log(idProduct);


//Ensuite on récupère les donées de l'Api
fetch("http://localhost:3000/api/products/" + idProduct)
  .then((res) => res.json())
  .then((article) => {
    console.log(article);
    console.log(article.name);
    console.log(article.description);

    let name = article.name;
    let description = article.description;
    let price = article.price;

    const chosenColor = document.getElementById("colors");

    let nameHtml = document.getElementById("title");
    nameHtml.textContent = name;
    let descriptionHtml = document.getElementById("description");
    descriptionHtml.textContent = description;
    let priceHtml = document.getElementById("price");
    priceHtml.textContent = price;

    let productImg = document.createElement("img");
    document.getElementsByClassName("item__img")[0].appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    for (let color of article.colors) {
      console.log(color);
      let productColor = document.createElement("option");
      productColor.value = color;
      productColor.textContent = color;
      chosenColor.appendChild(productColor);
    }
  });

/**
 * Fonction createCartArticle
 *
 * Définition de nos articles, 2 informations obligatoires, l'id et la couleur.
 */
function createCartArticle(articleId, articleColor, articleQuantity) {
  let cartArticle = {
    id: articleId,
    color: articleColor,
    quantity: articleQuantity,
  };
  return cartArticle;
}
/**
 * Fonction getCartArticle
 *
 * La syntaxe get permet de lier une propriété d'un objet à une fonction qui sera appelée lorsqu'on accédera à la propriété.
 */
function getCartArticle(articleId, articleColor) {
  let key = "article" + articleId + "_" + articleColor;
  let value = localStorage.getItem(key);
  //La JSON.parse()méthode analyse une chaîne JSON, on transforme l'objet json en objet javascript 
  let cartArticle = JSON.parse(value);
  return cartArticle;
}

/**
 * Fonction createCartFromLocalStorage
 *
 * Définition de nos articles, 2 infos importantes, l'id et la couleur
 */
function setCartArticle(articleId, articleColor, articleQuantity) {
  let cartArticle = createCartArticle(articleId, articleColor, articleQuantity);
  let key = "article" + articleId + "_" + articleColor;
   //La JSON.stringify()méthode transforme une valeur JavaScript en chaîne JSON,
  let value = JSON.stringify(cartArticle);
  localStorage.setItem(key, value);
}
/* Récupérer les options de l'article à ajouter au panier */

/**
 * Fonction addToCart
 *
 * récupération de la couleur et de la quantité dans le dom, puis on ajoute les paramètres de selection.
 * @return boolean vrai si le nom est valide, faux si non.
 */
function addToCart() {
  const color = document.getElementById("colors").value;
  const quantity = document.getElementById("quantity").value;
  // on paramètre les propriétés d'utilisateur, si couleur est nulle ou couleur = 0 et si quanitity = null ou 0 on retourne un message derreur
  if (color == null || color == "" || quantity == null || quantity == 0) {//null ou undefined a tester
    alert("Please select a color and the quantity");
    return false;//cela ne s'est pas bien passé
  }else{
  setCartArticle(idProduct, color, quantity);
  return true; //cela s'est bien passé
}
};
const button = document.getElementById("addToCart");
if (button != null) {
  button.addEventListener("click", (e) => {
    // en locurence ici on écoute notre panier pour savoir quel article doit etre chargé puis récupéré

   let ret = addToCart();
   if(ret){//l'ajout s'est bien passé, on va sur la page panier
    window.location.href = "cart.html";
  }
  });
}

