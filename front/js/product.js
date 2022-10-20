
//grace a window.location.href on affiche l'id du bon élément sur la page produit
let string = window.location.href;
var url = new URL(string);
let idProduct = url.searchParams.get("id");
console.log(idProduct);

const chosenColor = document.getElementById("colors")
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

    for (let color of article.colors){
      console.log(color)
      let productColor = document.createElement("option");
      productColor.value = color;
      productColor.textContent = color;
      chosenColor.appendChild(productColor);
    }
    
  })

//Début de l'étape 7 : Localstorage

//on écoute le bouton pour enregistrer notre choix dans le localstorage
let button = document.getElementById("addToCart");
button.addEventListener("click", ()=>{ 
 
//liste des éléments a conserver dans le local storage
    function storageContent() {
      localStorage.setItem('color', document.getElementById('colors').value);
      localStorage.setItem('quantity', document.getElementById('quantity').value);
      localStorage.setItem('title', document.getElementById('title').value); // exemple mais ne marche pas (undefined)
      // récupérer l'id car elle est déjà dans le local storage reste la même .. 
    }
    storageContent()
  
   })