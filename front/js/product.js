const urlSearch = window.location.search

const urlParams = new URLSearchParams (urlSearch)

const productId = urlParams.get('id')


fetch(`http://localhost:3000/api/products/${productId}`)
//le premier .then nous permet de récupérer le résultat au format json
.then(function(response){
    if(response.ok){
        return response.json();
    }
})
//récupère les données du serveur
.then(function(dataProductId){
    console.log(dataProductId)

    let img = document.querySelector(".item__img")
    let title = document.querySelector("#title")
    let price = document.querySelector("#price")
    let description = document.querySelector("#description")


    img.innerHTML += `<img src="${dataProductId.imageUrl}" alt="Photographie d'un canapé">`
    title.innerHTML += `${dataProductId.name}`
    price.innerHTML += `${dataProductId.price}`
    description.innerHTML += `${dataProductId.description}`
    
    let colors = document.querySelector("#colors")
    colors.innerHTML += `${displayColors (dataProductId.colors)}`
    
    //----------------Activer le bouton Ajouter au panier----------------------
    //---> viser le bouton 
    let btnAddToCart = document.querySelector("#addToCart")
    //---> écouter le bouton au click pour:
    // 1) récupérer les données sélectionnées
    // 2) stocker les données dans le lcal storage
    btnAddToCart.addEventListener('click', function(e){
        // 1) récupérer les données sélectionnées
            // a) où se trouve les données?
        let selectDatas = document.querySelector('select')

        let product = dataProductId
        product.selectedColors = selectDatas.value
        console.log(product)

        let cart = [];
        if(localStorage.getItem('cart')){
            cart = [...JSON.parse(localStorage.getItem('panier'))]
        }
        
        cart.push(product)
        console.log(cart)
        localStorage.setItem('panier', JSON.stringify(cart))

    })

})
.catch(function(err){
    console.log("erreur :" + err)  
})

function displayColors (colors){
    return colors.map(color =>`<option>${color}</option>`).join("")
}
