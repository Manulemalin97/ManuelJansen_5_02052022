//grace a window.location.href on affiche l'id du bon élément sur la page produit
let string = window.location.href;
var url = new URL(string);
let idProduct = url.searchParams.get("id");
console.log(idProduct);

const chosenColor = document.getElementById("colors");
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
  
  // Localstorage
function createCartArticle(articleId,articleColor,articleQuantity){
  let cartArticle = {
    id: articleId, 
    color: articleColor,
    quantity: articleQuantity
  }
  return cartArticle
}
function getCartArticle (articleId, articleColor){
  let key = "article" + articleId + "_" + articleColor
  let value = localStorage.getItem(key)
  let cartArticle = JSON.parse(value)
  return cartArticle
}
function setCartArticle(articleId,articleColor,articleQuantity){
  let cartArticle = createCartArticle (articleId,articleColor,articleQuantity)
  let key = "article" + articleId + "_" + articleColor
let value = JSON.stringify(cartArticle)
 localStorage.setItem( key,value)
}
//on crée notre objet avec nos informations concernant le produit

 setCartArticle("107fb5b75607497b96722bda5b504926", "White", 0)

// //On déclare notre objet dans le localStorage en indiquant son nom de clé, l'id et sa couleur. Ensuite on séréalise et on transforme nos données en chaine de caractère grace a JSON.stringify

// //On modifie nos données du
 let sinopeWhite = getCartArticle("107fb5b75607497b96722bda5b504926","White")
 sinopeWhite.quantity++
setCartArticle (sinopeWhite.id, sinopeWhite.color, sinopeWhite.quantity)

 setCartArticle("107fb5b75607497b96722bda5b504926", "Blue", 0)
 let sinopeBlue = getCartArticle("107fb5b75607497b96722bda5b504926","Blue")
 sinopeBlue.quantity += 5
setCartArticle ( sinopeBlue.id,  sinopeBlue.color,  sinopeBlue.quantity)


//le formulaire s'adapte au nombre d'options qu'il y a dans l'objet du produit
function addToCart(){
const color = document.getElementById("colors").value
  const quantity = document.getElementById("quantity").value
  // on paramètre les propriétés d'utilisateur, si couleur est nulle ou couleur = 0 et si quanitity = null ou 0 on retourne un message derreur 
  if (color == null || color == "" || quantity == null || quantity == 0){
   alert("Please select the color and the quantity")
  }
  setCartArticle(idProduct,color,quantity)
}
 const button = document.getElementById("addToCart")
 if (button != null){
 button.addEventListener("click", (e) => {
   // en locurence ici on écoute notre panier pour savoir quel article doit etre chargé puis récupéré
  addToCart()
  window.location.href = "cart.html"
  })
  }
  
