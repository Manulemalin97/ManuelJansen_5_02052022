// on initialise notre panier en tant que tableau
const cart = [];
//on déclare notre fonction
cartArticle();
console.log(cart);

//on a récupéré nos élement et on les a mis dans 'cart'
function cartArticle() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    //item est une string et on veut un objet
    const item = localStorage.getItem(localStorage.key(i));
    //on le transforme donc en objet avec JSON.parse
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}
// <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//                 <div class="cart__item__img">
//                   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__description">
//                     <h2>Nom du produit</h2>
//                     <p>Vert</p>
//                     <p>42,00 €</p>
//                   </div>   //cart__item__content__description">
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>   //cart__item__content__settings">
//                 </div>    //carti item content
//               </article> -->
function displayCartArticle(article) {

  //div de l'image
  let cartItems = document.getElementById("cart__items");// on récupère la section existante qui a pour id: cart__items.

  //article
  let articleHtml = document.createElement("article");//on déclare le nom de notre variable et on crée l'article.
  articleHtml.className = "cart__item";  // on récupère et on attribut la cart__item à articleHtml qui sera à présent sa valeur.


  // Ajoute un nouvel attribut ou change la valeur d'un attribut existant pour l'élément spécifié. 
  //Si l'attribut existe déjà, la valeur est mise à jour ; sinon, un nouvel attribut est ajouté avec le nom et la valeur spécifiés.
  articleHtml.setAttribute("data-id", article.id); //On ajoute son attribut id.
  articleHtml.setAttribute("data-color", article.color);//On ajoute son attribut color
  cartItems.appendChild(articleHtml);//La valeur renvoyée est articleHtml (articleHtml enfant de cartItems)

  //Image
  let divImgHtml = document.createElement("div"); //on déclare le nom de notre variable et on crée la div de l'image
  divImgHtml.className = "cart__item__img"; // on récupère et on attribut la classecart__item__img à divImgHtml qui sera à présent sa valeur
  articleHtml.appendChild(divImgHtml); // la divImgHtml est l'enfant de articleHtml donc sa valeur est renvoyée
  let imgHtml = document.createElement("img"); // on déclare et on crée l'image
  imgHtml.src = "urlBidon"; //la source/url
  imgHtml.alt = "description de l'image"; // le tag alt (description de l'imahge)
  divImgHtml.appendChild(imgHtml); // la valeur revoyée est imgHtml enfant de divImgHtml

  //Content
  let divContentHtml = document.createElement("div"); //on déclare et on crée la div de cart__item__content
  divContentHtml.className = "cart__item__content"; // on récupère et on attribut la classe cart__item__content à divContentHtml
  articleHtml.appendChild(divContentHtml);//La valeur renvoyée est divContent (articleHtml enfant de articleHtml)

  //description
  let divDescription = document.createElement("div");
  divDescription.className = "cart__item__content__description";
  divContentHtml.appendChild(divDescription); 

  //title
  let titleHtml = document.createElement("h2");
  divDescription.appendChild(titleHtml);
  titleHtml.textContent = article.name;

  //color
  let colorHtml = document.createElement("p");
  divDescription.appendChild(colorHtml);
  colorHtml.textContent = article.color;

  //price
    let priceHtml =  document.createElement("p");
    divDescription.appendChild(priceHtml);
     priceHtml.textContent = article.price;// price non fonctionnel pour le moment .. 

  //settings
  let settingsHtml = document.createElement("div");
  articleHtml.appendChild(settingsHtml);
  settingsHtml.className = "cart__item__content__settings";

    //quantity content
    let divQuantityHtml =  document.createElement("div");
    divQuantityHtml.className = "cart__item__content__settings__quantity";
    settingsHtml.appendChild(divQuantityHtml);

    //quantity
    let quantity_p =  document.createElement("p");
    divQuantityHtml.appendChild(quantity_p);
    quantity_p.textContent = article.quantity;

    //input
    let inputHtml = document.createElement("input");
    inputHtml.className =  "itemQuantity"; // La classe de input est itemQuantity
    divQuantityHtml.appendChild(inputHtml);// Comme quantity, inputHtml est enfant de divQuantityHtml

    //settingsDelete
    let settingsDeleteHtml = document.createElement("div");
settingsDeleteHtml.className = "cart__item__content__settings__delete";
settingsHtml.appendChild(settingsDeleteHtml)

//<p class="deleteItem">Supprimer</p>
//Delete item
let deleteItemHtml = document.createElement("p");
deleteItemHtml.className = "deleteItem";
settingsDeleteHtml.appendChild(deleteItemHtml)
}

//La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau
cart.forEach((cartArticle) => {
  displayCartArticle(cartArticle);
});
