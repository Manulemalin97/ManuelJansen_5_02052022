/**
 * Définition du panier en JS
 *
 * @var Array cart Tableau implémentant le panier
 */
const cart = [];

/**
 * Définition de l'ensemble des articles disponibles à la vente
 *
 * @var Array allItemsAvailableForSale Tableau implémentant l'ensemble des articles disponibles à la vente
 */
let allItemsAvailableForSale = [];

/**
 * Fonction createCartFromLocalStorage
 *
 * Remplis le tableau cart avec les articles du panier stockés dans le localStorage
 */
function createCartFromLocalStorage() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    //item est une string et on veut un objet (key i est notre )
    let article = localStorage.getItem(localStorage.key(i));
    //on le transforme donc en objet avec JSON.parse
    const articleObject = JSON.parse(article);
    articleObject.cartKey = localStorage.key(i); // on lui ajoute sa clé de stockage pour pouvoir le supprimer plus facilement ultérieurement
    cart[i] = articleObject;
  }
}

/**
 * Fonction displayTotalQuantityCart
 *
 * Calcule la quantité totale du panier et l'affiche
 */
function displayTotalQuantityCart() {
  let totalQuantity = 0; //on initialise la nombre a 0
  let totalQuantityHtml = document.getElementById("totalQuantity");
  for (let i = 0; i < cart.length; i++) {
    //On parcours tout les quantity du panier pour les afficher.
    totalQuantity += JSON.parse(cart[i].quantity);
  }
  totalQuantityHtml.textContent = totalQuantity; // totalQuantity est initialisé à 0.
  console.log(totalQuantity);
}

/**
 * Fonction displayTotalPriceCart(
 *
 * Calcule le montant total du panier et l'affiche
 */
function displayTotalPriceCart() {
  let totalPrice = 0; //le total est initialisé à 0
  let totalPriceHtml = document.getElementById("totalPrice"); // on récupère l'élément HTML pour l'affichage du total
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let priceArticle = allItemsAvailableForSale[item.id].price;
    let quantityArticle = item.quantity;
    let totalArticlePrice = priceArticle * quantityArticle; // prix * article = total
    totalPrice += totalArticlePrice; // est égal a total + totalArticlePrice
  }
  totalPriceHtml.textContent = totalPrice;
}

function deleteItem(articleHtml) {
  // constitution de la clé définissant l'article précis
  let key =
    "article" + articleHtml.dataset.id + "_" + articleHtml.dataset.color;
  // Supression de l'article du panier dans le localstorage
  localStorage.removeItem(key);
  // Parcours du tableau cart pour supprimer l'article
  for (let i = 0; i < cart.length; i++) {
    // On parcours les articles du panier (tableau) à la rechercher de l'élément à supprimer
    if (cart[i].cartKey === key) {
      // Article trouvé
      cart.splice(i, 1); // On le retire
      break; // pas besoin de continuer à chercher
    }
  }
  // supression de l'élément graphique de l'article
  articleHtml.parentNode.removeChild(articleHtml);
  // réactualisation des totaux
  displayTotalPriceCart();
  displayTotalQuantityCart();
}

// function saveNewDataToLocalStorage(item) {
//   const dataToSave = JSON.stringify(item);
//   localStorage.setItem(item.id, dataToSave);
//   console.log(dataToSave);
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updatePriceAndQuantity(cartKey, newValue) {
  //id de notre event listener (voir l.102)
  console.log("newValue", newValue);

  let itemToUpdate = cart.find((article) => article.cartKey === cartKey); //méthode find, on lui fait chercher dans article et lui dire que article.id est egal a id
  itemToUpdate.quantity = Number(newValue); // on délare sa valeur, avec Number devant sinon c'est une chaine de charactere
  // on récupère l'objet du localstorage
  let localStorageItem = JSON.parse(localStorage.getItem(cartKey));
  // on mets à jour la valeur
  localStorageItem.quantity = Number(newValue);
  // on réenregistre l'objet mis à jour dans le LS
  localStorage.setItem(cartKey, JSON.stringify(localStorageItem));
  console.log(cart);
  //réactualisation des totaux
  displayTotalPriceCart();
  displayTotalQuantityCart();
}

function displayCartArticle(cartArticle) {
  // Notre fonction qui nous sert a afficher un élément(article) sur la page du panier.

  //article
  let articleHtml = document.createElement("article"); //on déclare le nom de notre variable et on crée l'article.
  articleHtml.className = "cart__item"; // on récupère et on attribut la cart__item à articleHtml qui sera à présent sa valeur.

  //div de l'image
  let cartItems = document.getElementById("cart__items"); // on récupère la section existante qui a pour id: cart__items.

  // Ajoute un nouvel attribut ou change la valeur d'un attribut existant pour l'élément spécifié.
  //Si l'attribut existe déjà, la valeur est mise à jour ; sinon, un nouvel attribut est ajouté avec le nom et la valeur spécifiés.
  articleHtml.setAttribute("data-id", cartArticle.id); //On ajoute son attribut id.
  articleHtml.setAttribute("data-color", cartArticle.color); //On ajoute son attribut color
  cartItems.appendChild(articleHtml); //La valeur renvoyée est articleHtml (articleHtml enfant de cartItems)

  //Image
  let divImgHtml = document.createElement("div"); //on déclare le nom de notre variable et on crée la div de l'image
  divImgHtml.className = "cart__item__img"; // on récupère et on attribut la classecart__item__img à divImgHtml qui sera à présent sa valeur
  articleHtml.appendChild(divImgHtml); // la divImgHtml est l'enfant de articleHtml donc sa valeur est renvoyée
  let imgHtml = document.createElement("img"); // on déclare et on crée l'image
  imgHtml.src = allItemsAvailableForSale[cartArticle.id].imageUrl; //la source/url
  imgHtml.alt = allItemsAvailableForSale[cartArticle.id].altTxt; // le tag alt (description de l'imahge)
  divImgHtml.appendChild(imgHtml); // la valeur revoyée est imgHtml enfant de divImgHtml

  //Content
  let divContentHtml = document.createElement("div"); //on déclare le nom de notre variable et on crée la div.
  divContentHtml.className = "cart__item__content"; // on récupère et on attribut la classe cart__item__content à divContentHtml
  articleHtml.appendChild(divContentHtml); //La valeur renvoyée est divContentHtml (divContentHtml enfant de articleHtml)

  //description
  let divDescriptionHtml = document.createElement("div"); //on déclare le nom de notre variable et on crée l'article.
  divDescriptionHtml.className = "cart__item__content__description"; // on récupère et on attribut la classe cart__item__content à divDescriptionHtml
  divContentHtml.appendChild(divDescriptionHtml); //La valeur renvoyée est divDescriptionHtml (divDescriptionHtml enfant de divContentHtml)

  //title
  let titleHtml = document.createElement("h2"); //on déclare le nom de notre variable et on crée le titre.
  titleHtml.textContent = allItemsAvailableForSale[cartArticle.id].name; //textContent récupère le contenu de tous les éléments, y compris <script> et <style>, ce qui n'est pas le cas de innerText.
  divDescriptionHtml.appendChild(titleHtml); //La valeur renvoyée est titleHtml (titleHtml enfant de divDescriptionHtml)

  //color
  let colorHtml = document.createElement("p"); //on déclare le nom de notre variable et on crée la couleur.
  divDescriptionHtml.appendChild(colorHtml); //La valeur renvoyée est colorHtml (colorHtml enfant de divDescriptionHtml)
  colorHtml.textContent = cartArticle.color; //textContent récupère le contenu de la couleur

  //price
  let priceHtml = document.createElement("p"); //on déclare le nom de notre variable et on crée le prix.
  priceHtml.textContent = allItemsAvailableForSale[cartArticle.id].price + "€"; // price non fonctionnel pour le moment .. ?/?/?/?/?/?/?/?/?/?/?/?/?/?/?/?/? NaN ?
  divDescriptionHtml.appendChild(priceHtml); //La valeur renvoyée est priceHtm (colorHtml enfant de divDescriptionHtml)

  //settings
  let settingsHtml = document.createElement("div"); //on déclare le nom de notre variable et on crée la div des réglages.
  articleHtml.appendChild(settingsHtml); //La valeur renvoyée est settingsHtml (settingsHtml enfant de articleHtml)
  settingsHtml.className = "cart__item__content__settings"; // on récupère et on attribut la classe cart__item__content__settings à settingsHtml

  //quantityContent
  let divQuantityHtml = document.createElement("div"); //on déclare le nom de notre variable et on crée le prix.
  divQuantityHtml.className = "cart__item__content__settings__quantity"; // on récupère et on attribut la classe cart__item__content__settings__quantity à divQuantityHtml
  settingsHtml.appendChild(divQuantityHtml); //La valeur renvoyée est divQuantityHtml (divQuantityHtml enfant de settingsHtml)

  //quantity

  let quantityHtml = document.createElement("p"); //on déclare le nom de notre variable et on crée l'élément p.
  quantityHtml.textContent = "Qté : "; //textContent récupère le contenu de la quantité
  divQuantityHtml.appendChild(quantityHtml); //La valeur renvoyée est quantity_p (quantity_p enfant de  divQuantityHtml)

  //input
  // <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
  let inputHtml = document.createElement("input"); //on déclare le nom de notre variable et on crée l'élément input.
  inputHtml.className = "itemQuantity"; // La classe de input est itemQuantity///////////Que faire avec l'input ?/?/?/?/?/?/?/?/?
  inputHtml.setAttribute("type", "number");
  inputHtml.setAttribute("name", "itemQuantity");
  inputHtml.setAttribute("min", "1");
  inputHtml.setAttribute("max", "100");
  inputHtml.setAttribute("value", cartArticle.quantity);
  divQuantityHtml.appendChild(inputHtml); // Comme quantity, inputHtml est enfant de divQuantityHtml
  inputHtml.addEventListener("change", () =>
    updatePriceAndQuantity(cartArticle.cartKey, inputHtml.value)
  );

  //settingsDelete
  let settingsDeleteHtml = document.createElement("div"); //on déclare le nom de notre variable et on crée l'élément div.
  settingsDeleteHtml.className = "cart__item__content__settings__delete"; // La classe de settingsDeleteHtml est cart__item__content__settings__delete
  settingsHtml.appendChild(settingsDeleteHtml); //La valeur renvoyée est settingsDeleteHtml (settingsDeleteHtml enfant de  settingsHtml)
  settingsDeleteHtml.addEventListener("click", () => deleteItem(articleHtml));
  //Delete item
  let deleteItemHtml = document.createElement("p"); //on déclare le nom de notre variable et on crée l'élément p.
  deleteItemHtml.className = "deleteItem"; //La classe de deleteItemHtml est deleteItem
  deleteItemHtml.textContent = "Supprimer";
  settingsDeleteHtml.appendChild(deleteItemHtml); //La valeur renvoyée est deleteItemHtml (deleteItemHtml enfant de  settingsDeleteHtml)
}

function displayCart() {
  //La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau
  //On parcours tout les articles du panier pour les afficher.
  for (let i = 0; i < cart.length; i++) {
    displayCartArticle(cart[i]);
  }
  displayTotalPriceCart();
  displayTotalQuantityCart();
}

function startDisplayCart() {
  fetch("http://localhost:3000/api/products")
    // quand on a la réponse on donne le résultat en json.
    .then((rawData) => rawData.json())
    .then((jsonData) => {
      for (let i in jsonData) {
        let item = jsonData[i];

        allItemsAvailableForSale[item._id] = item;
      }
      displayCart();
    });
}

/////////////////////////////////////////////// main //////////////////////////////////////////////////////////////////////
// on récupère le contenu du panier.
createCartFromLocalStorage();
//on récupère tous les articles disponible à la vente.
startDisplayCart();

//////////////////////////////////////////////Form/////////////////////////////////////////////////////////////////////////////
// Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type
// de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter un
// prénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. En
// cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ
// correspondant
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

//je déclare contact et products je vais le remplir au fur et à mesure de la validation


let form = document.getElementsByClassName("cart__order__form")[0];
let submit = document.getElementById("order");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");


let firstNameErrorMessage = document.getElementById("firstNameErrorMsg");
let lastNameErrorMessage = document.getElementById("lastNameErrorMsg");
let addressErrorMessage = document.getElementById("addressErrorMsg");
let cityErrorMessage = document.getElementById("cityErrorMsg");
let emailErrorMessage = document.getElementById("emailErrorMsg");
console.log(firstNameErrorMessage);
console.log(lastNameErrorMessage);
console.log(addressErrorMessage);
console.log(emailErrorMessage);

// The test() method executes a search for a match between a regular expression and a specified string. Returns true or false.

//regex test[a-zA-Z0-9\é\è\ê\-]+$
let regexFirstName = /^[A-Za-z\s\é\è\ê\-]{3,30}$/; // toutes les lètres de A-z (maj et min)
let regexLastName = /^[A-Za-z\s\é\è\ê\-]{3,30}$/; //le '+' signifie qu'on peut écrire le contenu de la reg ex une fois ou plusieurs fois
let regexAddress = /^[a-zA-Z0-9\s,.'-]{3,200}$/; //s = white
let regexCity = /^[A-Za-z\s\é\è\ê\â\à\'-]{2,50}$/;
let regexEmail = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+[a-zA-Z0-9]\.[a-z]{2,10}$/;
//email regex info (for me)
// ^ = début de string
// $ = fin de string
// [a-zA-Z0-9.-_] = voici le début de ma reg ex, ce qui vient avant le @, on déclare qu'on utilise les lettres de a-z, (maj et min) et
// on peut entres des chiffres de 0-9 ansi que des points, tirets et underscore
// le '+' signifie qu'on peut écrire le contenu de la reg ex une fois ou plusieurs fois
// le '@{1}' nous dit qu'on doit utiliser 1 seul @
// ensuite on refait la même chose et on ajoute un [.] pour la fin de ladresse mail, pas de chiffres autorisés et {2,10} pour dire 2 lettre min et 10 max

//  On submit
form.addEventListener("submit", function (event) {
  /////////////////////////////////////////////////////////// Depuis la dernière séance //////////////////////////////////////////////////////////
  let submitOk = true;
  submitOk &= validFirstName();
  submitOk &= validLastName();
  submitOk &= validAddress();
  submitOk &= validCity();
  submitOk &= validEmail();
  event.preventDefault();

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    window.alert("Veuillez compléter les informations du formulaire");
  }


  // Si submitOk me renvoie que tout est true, je fetch

  if (submitOk) {

    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    
    let products = [];
    for (let i = 0; i < cart.length; i++) {
      products.push(cart[i]);
    };

    let order = {
      contact: contact,
      products: products,
    };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      // API Connector will use this content type unless you manually set Key = content-type, Value = application/json
      //  in the Headers table, like this.
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((rawData) => rawData.json())
      .then((jsonData) => {
        let orderId = jsonData.orderId;
        window.location.assign("confirmation.html?id=" + orderId);
      });
  }
});
//En gros je veut que cette information soit envoyée avec POST vers l'api en lui disant qu'on veut que ce soit du Json

//////////////////////////////////////////////////// depuis la derniere séance/////////////////////////////////////////

/**
 * validFirstName
 *
 * Vérifie le contenu saisi pour le prénom et si le contenu n'est pas conforme, affichage d'un message d'erreur
 *
 * @return boolean vrai si le nom est valide, faux si non.
 */
function validFirstName() {
  //The test() method executes a search for a match between a regular expression and a specified string. Returns true or false.
  let testFirstName = regexFirstName.test(form.firstName.value);
  let errorMessage = form.firstName.nextElementSibling;

  if (testFirstName) {
    errorMessage.textContent = "Prénom valide";
  } else {
    errorMessage.textContent =
      "Prénom invalide, les chiffres et les caractères spéciaux ne sont pas acceptés, maximum 30 caractères";
  }
  return testFirstName;
}

//On écoute l'input de first Name grâce à form.firstName dans ce cas pour récupérer notre input
form.firstName.addEventListener("change", validFirstName);

//lastName

function validLastName() {
  let testLastName = regexLastName.test(form.lastName.value);
  let errorMessage = form.lastName.nextElementSibling;

  if (testLastName) {
    errorMessage.textContent = "Prénom valide";
  } else {
    errorMessage.textContent =
      "Nom invalide, les chiffres et les caractères spéciaux ne sont pas acceptés, maximum 30 caractères";
  }
  return testLastName;
}
form.lastName.addEventListener("change", validLastName);

// adress

function validAddress() {
  let testAddress = regexAddress.test(form.address.value);
  let errorMessage = form.address.nextElementSibling;

  if (testAddress) {
    errorMessage.textContent = "Prénom valide";
  } else {
    errorMessage.textContent =
      "Adresse invalide, veuillez entrer une adresse valide, maximum 200 caractères";
  }
  return testAddress;
}

form.address.addEventListener("change", validAddress);

// city

function validCity() {
  let testCity = regexCity.test(form.city.value);
  let errorMessage = form.city.nextElementSibling;

  if (testCity) {
    errorMessage.textContent = "Ville valide";
  } else {
    errorMessage.textContent =
      "Ville invalide, veuillez entrer une ville, maximum 50 caractères";
  }
  return testCity;
}

form.city.addEventListener("change", validCity);

// email

function validEmail() {
  let testEmail = regexEmail.test(form.email.value);
  let errorMessage = form.email.nextElementSibling;

  if (testEmail) {
    errorMessage.textContent = "Email valide";
  } else {
    errorMessage.textContent =
      "Email invalide, veuillez entrer un email valide";
  }
  return testEmail;
}

form.email.addEventListener("change", validEmail);
