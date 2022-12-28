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
 * Remplis le tableau cart avec les articles des produits stockés dans le localStorage
 */
function createCartFromLocalStorage() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    //La méthode key() de l'interface Storage prend un nombre n en argument et retourne la n-ième clé contenue dans storage
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
  //On parcours tout les quantity du panier pour les afficher.
  for (let i = 0; i < cart.length; i++) {
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


/**
 * Fonction deleteItem(
 *
 * Supprime l'article selectionée avec un id et une couleur spécifique
 */
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


/**
 * Fonction updatePriceAndQuantity(
 *
 * Mets à jour le prix et la quantité
 */
function updatePriceAndQuantity(cartKey, newValue) {
  console.log("newValue", newValue);
//La méthode find exécute la fonction callback une fois pour chaque élément présent dans le tableau jusqu'à ce qu'elle retourne une valeur vraie
  let itemToUpdate = cart.find((article) => article.cartKey === cartKey); 
  // on délare sa valeur, avec Number devant sinon c'est une chaine de charactere
  itemToUpdate.quantity = Number(newValue); 
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

/**
 * Fonction displayCartArticle(
 *
 * On crée tout les éléments requis et on récupère les existants.
 */
function displayCartArticle(cartArticle) {

  //article
  let articleHtml = document.createElement("article"); 
  articleHtml.className = "cart__item"; 

  //div de l'image
  let cartItems = document.getElementById("cart__items"); 

  // Ajoute un nouvel attribut ou change la valeur d'un attribut existant pour l'élément spécifié.
  //Si l'attribut existe déjà, la valeur est mise à jour ; sinon, un nouvel attribut est ajouté avec le nom et la valeur spécifiés.
  articleHtml.setAttribute("data-id", cartArticle.id); 
  articleHtml.setAttribute("data-color", cartArticle.color); 
  cartItems.appendChild(articleHtml); 

  //Image
  let divImgHtml = document.createElement("div"); 
  divImgHtml.className = "cart__item__img"; 
  articleHtml.appendChild(divImgHtml); 
  let imgHtml = document.createElement("img"); 
  imgHtml.src = allItemsAvailableForSale[cartArticle.id].imageUrl; 
  imgHtml.alt = allItemsAvailableForSale[cartArticle.id].altTxt; 
  divImgHtml.appendChild(imgHtml); 

  //Content
  let divContentHtml = document.createElement("div"); 
  divContentHtml.className = "cart__item__content"; 
  articleHtml.appendChild(divContentHtml); 

  //description
  let divDescriptionHtml = document.createElement("div"); 
  divDescriptionHtml.className = "cart__item__content__description"; 
  divContentHtml.appendChild(divDescriptionHtml); 

  //title
  let titleHtml = document.createElement("h2"); 
  titleHtml.textContent = allItemsAvailableForSale[cartArticle.id].name; 
  divDescriptionHtml.appendChild(titleHtml); 

  //color
  let colorHtml = document.createElement("p"); 
  divDescriptionHtml.appendChild(colorHtml); 
  colorHtml.textContent = cartArticle.color; 

  //price
  let priceHtml = document.createElement("p"); 
  priceHtml.textContent = allItemsAvailableForSale[cartArticle.id].price + "€"; 
  divDescriptionHtml.appendChild(priceHtml); 

  //settings
  let settingsHtml = document.createElement("div"); 
  articleHtml.appendChild(settingsHtml); 
  settingsHtml.className = "cart__item__content__settings"; 

  //quantityContent
  let divQuantityHtml = document.createElement("div"); 
  divQuantityHtml.className = "cart__item__content__settings__quantity"; 
  settingsHtml.appendChild(divQuantityHtml); 

  //quantity

  let quantityHtml = document.createElement("p"); 
  quantityHtml.textContent = "Qté : "; 
  divQuantityHtml.appendChild(quantityHtml); 
  //input
  
  let inputHtml = document.createElement("input"); 
  inputHtml.className = "itemQuantity"; 
  inputHtml.setAttribute("type", "number");
  inputHtml.setAttribute("name", "itemQuantity");
  inputHtml.setAttribute("min", "1");
  inputHtml.setAttribute("max", "100");
  inputHtml.setAttribute("value", cartArticle.quantity);
  divQuantityHtml.appendChild(inputHtml); 
  inputHtml.addEventListener("change", () =>
    updatePriceAndQuantity(cartArticle.cartKey, inputHtml.value));
  

  //settingsDelete
  let settingsDeleteHtml = document.createElement("div"); 
  settingsDeleteHtml.className = "cart__item__content__settings__delete"; 
  settingsHtml.appendChild(settingsDeleteHtml);
  settingsDeleteHtml.addEventListener("click", () => deleteItem(articleHtml));
  //Delete item
  let deleteItemHtml = document.createElement("p"); 
  deleteItemHtml.className = "deleteItem"; 
  deleteItemHtml.textContent = "Supprimer";
  settingsDeleteHtml.appendChild(deleteItemHtml);
}


/**
 * Fonction displayCart(
 *
 * Affiche le panier, on appelle totalpricecart et totalquantitycart
 */
function displayCart() {

  //On parcours tout les articles du panier pour les afficher.
  for (let i = 0; i < cart.length; i++) {
    displayCartArticle(cart[i]);
  }
  displayTotalPriceCart();
  displayTotalQuantityCart();
}

/**
 * Fonction startDisplayCart(
 *
 * On fetch les information dans l'api et on boucle sur tout les éléments du panier
 */
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



/**
 * Définition du formulaire en Js
 *
 * @var Array on récupère les id de nos formulaires
 */
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

/**
 * Définition des expressions régulières
 *
 * @var Array nos regex contenant les informations qui peuvent être renseigné dans nos champs de formulaires
 */
let regexFirstName = /^[A-Za-z\s\é\è\ê\-]{3,30}$/; 
let regexLastName = /^[A-Za-z\s\é\è\ê\-]{3,30}$/; 
let regexAddress = /^[a-zA-Z0-9\s.,'-]{3,200}$/; 
let regexCity = /^[A-Za-z\s\é\è\ê\â\à\'-]{2,50}$/;
let regexEmail = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+[a-zA-Z0-9]\.[a-z]{2,10}$/;

//  On submit
form.addEventListener("submit", function (event) {
  

  let submitOk = true;
  //applique un ET logique, renvoie false si un des deux elements est false 
  submitOk &= validFirstName();
  submitOk &= validLastName();
  submitOk &= validAddress();
  submitOk &= validCity();
  submitOk &= validEmail();
  submitOk &= validCart();
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
      products.push(cart[i].id);
    }

    let order = {
      contact: contact,
      products: products,
    };

    /**
 * Fetch
 *
 * On fetch les information dans l'api en utilisant la méthode post, on séréalise order qui est notre body et on utilise notre header pour communiquer en json
 */
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      // API Connector will use this content type unless you manually set Key = content-type, Value = application/json
      //  in the Headers table, like this.
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((rawData) => rawData.json())
      .then((jsonData) => {
        let orderId = jsonData.orderId;
        window.location.assign("confirmation.html?id=" + orderId);
      });
  }
});



/**
 * validFirstName
 *
 * Vérifie le contenu saisi pour le prénom et si le contenu n'est pas conforme, affichage d'un message d'erreur
 *
 * @return boolean vrai si le nom est valide, faux si non.
 */
function validFirstName() {
  //Test() nous renvoie true ou false dépendant de son match entre une expression régulière et une chaine de caractère spécifique
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

/**
 * validLastName
 *
 * Vérifie le contenu saisi pour le nom et si le contenu n'est pas conforme, affichage d'un message d'erreur
 *
 * @return boolean vrai si le nom est valide, faux si non.
 */
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

/**
 * validAddress
 *
 * Vérifie le contenu saisi pour l'adresse et si le contenu n'est pas conforme, affichage d'un message d'erreur
 *
 * @return boolean vrai si le nom est valide, faux si non.
 */
function validAddress() {
  //La méthode test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.
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

/**
 * validCity
 *
 * Vérifie le contenu saisi pour la ville et si le contenu n'est pas conforme, affichage d'un message d'erreur
 *
 * @return boolean vrai si le nom est valide, faux si non.
 */

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

/**
 * validEmail
 *
 * Vérifie le contenu saisi pour l'email et si le contenu n'est pas conforme, affichage d'un message d'erreur
 *
 * @return boolean vrai si le nom est valide, faux si non.
 */
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

function validCart(){
  
  return true
}
