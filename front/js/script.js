let objetsproduits =[];

/* Recupération des données de l'API */

 fetch("http://localhost:3000/api/products")
   // On passe une fonction de gestion à la méthode then() de la promesse. Lorsque l'opération de récupération a réussi (si elle a réussi), 
   //la promesse appellera le gestionnaire en lui passant un objet Response, qui contient la réponse du serveur.
   .then((res) => res.json())
   .then((promise) => {
     objetsproduits = promise;
     console.log(objetsproduits);
    //boucle qui va permettre la création des éléments et la distribution des informations de l'API
     for (let article in objetsproduits) {
       // Insertion de "l'ancre"
       let productLink = document.createElement("a");
       document.querySelector(".items").appendChild(productLink); //querySelector()  ne renvoie pas une liste des résultats, 
       //mais le premier élément qui correspond à la recherche.

       productLink.href = `product.html?id=${objetsproduits[article]._id}`;

       // Insertion de l'élément "article"
       let productArticle = document.createElement("article");
       productLink.appendChild(productArticle);

       let productImg = document.createElement("img");
       productArticle.appendChild(productImg);
       productImg.src = objetsproduits[article].imageUrl;
       productImg.alt = objetsproduits[article].altTxt;

       // <h3 class="productName">Kanap name1</h3>
       let productName = document.createElement("h3");
       productArticle.appendChild(productName); //appendChild. Cette fonction permet d'ajouter un élément à la liste des enfants du parent depuis lequel la fonction est appelée.
       productName.classList.add("productName"); //ajoute la classe a l'élément
       productName.textContent = objetsproduits[article].name; // on modifie le DOM avec .textContent

       // <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
       let productDescription = document.createElement("p");
       productArticle.appendChild(productDescription);
       productDescription.classList.add("productDescription");
       productDescription.textContent = objetsproduits[article].description;
     }
   });