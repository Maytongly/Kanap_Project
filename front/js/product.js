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
    colors.innerHTML += `<option value="">--SVP, choisissez une couleur --</option>${displayColors (dataProductId.colors)}`
    
    //----------------Activer le bouton Ajouter au panier----------------------
    
    let btnAddToCart = document.querySelector("#addToCart")

    btnAddToCart.addEventListener('click', function(e){
        let selectDatas = document.querySelector('select')
        if(selectDatas.value == ""){
            alert("Choisir une couleur")
            return
        }
        let quantity = document.querySelector('#quantity')
       if(quantity.value == 0){
           alert("Choisir une quantité")
           return
       }else if (quantity.value == ''){
        alert("Choisir une quantité")
        return
       }


        let product = dataProductId
        product.selectedColors = selectDatas.value
        product.quantity = quantity.value
        console.log(product)


        let cart = [];
        if(localStorage.getItem('cart')){
            cart = [...JSON.parse(localStorage.getItem('cart'))]
        }
       
        let index = cart.findIndex(elt => elt._id === product._id && elt.selectedColors === product.selectedColors)
        if(index >= 0){
            cart[index].quantity = parseInt(cart[index].quantity) + parseInt(product.quantity)
        }else{
            cart.push(product)
        }
        
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))

    })

})
.catch(function(err){
    console.log("erreur :" + err)  
})

function displayColors (colors){
    return colors.map(color =>`<option>${color}</option>`).join("")
}
