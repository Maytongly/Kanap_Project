fetch("http://localhost:3000/api/products")
//le premier .then nous permet de récupérer le résultat au format json
.then(function(response){
    if(response.ok){
        return response.json();
    }
})
//récupère les données du serveur
.then(function(items){

    items.forEach(item => {

        let itemElement = document.getElementById("items")

        itemElement.innerHTML += `<a href="./product.html?id=${item._id}">
        <article>
          <img src="${item.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">${item.name}</h3>
          <p class="productDescription">${item.description}</p>
        </article>
      </a>`    
    })

    console.log(items)
    
})
.catch(function(err){
    console.log("erreur :" + err)  
})