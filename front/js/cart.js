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
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article> -->



function displayCartArticle(article) {// Notre fonction qui nous sert a afficher nos éléments.

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
  let divContentHtml = document.createElement("div"); //on déclare le nom de notre variable et on crée la div.
  divContentHtml.className = "cart__item__content"; // on récupère et on attribut la classe cart__item__content à divContentHtml
  articleHtml.appendChild(divContentHtml);//La valeur renvoyée est divContentHtml (divContentHtml enfant de articleHtml)

  //description
  let divDescriptionHtml = document.createElement("div");//on déclare le nom de notre variable et on crée l'article.
  divDescriptionHtml.className = "cart__item__content__description";// on récupère et on attribut la classe cart__item__content à divDescriptionHtml
  divContentHtml.appendChild(divDescriptionHtml); //La valeur renvoyée est divDescriptionHtml (divDescriptionHtml enfant de divContentHtml)

  //title
  let titleHtml = document.createElement("h2");//on déclare le nom de notre variable et on crée le titre.
  titleHtml.textContent = article.name;//textContent récupère le contenu de tous les éléments, y compris <script> et <style>, ce qui n'est pas le cas de innerText.
  divDescriptionHtml.appendChild(titleHtml);//La valeur renvoyée est titleHtml (titleHtml enfant de divDescriptionHtml)

  //color
  let colorHtml = document.createElement("p");//on déclare le nom de notre variable et on crée la couleur.
  divDescriptionHtml.appendChild(colorHtml);//La valeur renvoyée est colorHtml (colorHtml enfant de divDescriptionHtml)
  colorHtml.textContent = article.color;//textContent récupère le contenu de la couleur 

  //price
    let priceHtml =  document.createElement("p");//on déclare le nom de notre variable et on crée le prix.
     priceHtml.textContent = article.price;// price non fonctionnel pour le moment .. ?/?/?/?/?/?/?/?/?/?/?/?/?/?/?/?/?
     divDescriptionHtml.appendChild(priceHtml);//La valeur renvoyée est priceHtm (colorHtml enfant de divDescriptionHtml)

  //settings
  let settingsHtml = document.createElement("div");//on déclare le nom de notre variable et on crée la div des réglages.
  articleHtml.appendChild(settingsHtml);//La valeur renvoyée est settingsHtml (settingsHtml enfant de articleHtml)
  settingsHtml.className = "cart__item__content__settings";// on récupère et on attribut la classe cart__item__content__settings à settingsHtml

    //quantityContent
    let divQuantityHtml =  document.createElement("div");//on déclare le nom de notre variable et on crée le prix.
    divQuantityHtml.className = "cart__item__content__settings__quantity";// on récupère et on attribut la classe cart__item__content__settings__quantity à divQuantityHtml
    settingsHtml.appendChild(divQuantityHtml);//La valeur renvoyée est divQuantityHtml (divQuantityHtml enfant de settingsHtml)

    //quantity
    let quantity_p =  document.createElement("p");//on déclare le nom de notre variable et on crée l'élément p.
    quantity_p.textContent = article.quantity;//textContent récupère le contenu de la quantité
    divQuantityHtml.appendChild(quantity_p);//La valeur renvoyée est quantity_p (settingsHtml enfant de  divQuantityHtml)

    //input
    let inputHtml = document.createElement("input");//on déclare le nom de notre variable et on crée l'élément input.
    inputHtml.className =  "itemQuantity"; // La classe de input est itemQuantity///////////Que faire avec l'input ?/?/?/?/?/?/?/?/?
    divQuantityHtml.appendChild(inputHtml);// Comme quantity, inputHtml est enfant de divQuantityHtml

    //settingsDelete
    let settingsDeleteHtml = document.createElement("div");//on déclare le nom de notre variable et on crée l'élément div.
settingsDeleteHtml.className = "cart__item__content__settings__delete";// La classe de settingsDeleteHtml est cart__item__content__settings__delete
settingsHtml.appendChild(settingsDeleteHtml);//La valeur renvoyée est settingsDeleteHtml (settingsDeleteHtml enfant de  settingsHtml)

//<p class="deleteItem">Supprimer</p>
//Delete item
let deleteItemHtml = document.createElement("p");//on déclare le nom de notre variable et on crée l'élément p.
deleteItemHtml.className = "deleteItem";//La classe de deleteItemHtml est deleteItem
settingsDeleteHtml.appendChild(deleteItemHtml);//La valeur renvoyée est deleteItemHtml (deleteItemHtml enfant de  settingsDeleteHtml)
}

//La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau
cart.forEach((cartArticle) => {
  displayCartArticle(cartArticle);
});
