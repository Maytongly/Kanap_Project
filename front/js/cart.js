let cart = [...JSON.parse(localStorage.getItem('cart'))]
console.log(cart);

displayItemsCart(cart)

function displayItemsCart (cart){

    let cartItems = document.getElementById('cart__items')
    cartItems.innerHTML = "" 

    cart.forEach((element, index) => {
 
        cartItems.innerHTML += `
        <article class="cart__item" data-id="${index}">
            <div class="cart__item__img">
                <img src="${element.imageUrl}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${element.name} - ${element.selectedColors}</h2>
                        <p>${element.description}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article> `

    });

    let btnSupprimer = Array.from(document.getElementsByClassName("deleteItem"))

    btnSupprimer.forEach((element, index) => {

    element.addEventListener('click', function(event){
        console.log('click') 
        //comment viser la class cart__item?
       // clickDelete = event.target.parentNode.parentNode.parentNode.parentNode;
        //console.log(clickDelete.parentNode.parentNode.parentNode.parentNode)
        
        cart.splice(index,1)
        console.log(cart)

        localStorage.setItem('cart', JSON.stringify(cart))
        displayItemsCart(cart)
    })
    })

    let newItemQuantity = Array.from(document.getElementsByClassName("itemQuantity"));
console.log(newItemQuantity)

newItemQuantity.forEach((element, index) => {


    element.addEventListener('input', function(event){
        console.log('change' + index)
       // console.log(event.target.value)

    let changeQuantity = event.target.value 
    console.log(changeQuantity)
    cart[index].quantity = changeQuantity
    
    
    console.log(cart)

     localStorage.setItem('cart', JSON.stringify(cart))
    
    })
})


}

//---------------------------total panier-----------------------

let totalQuantity = document.getElementById('totalQuantity')
let totalPrice = document.getElementById('totalPrice')

totalQuantity.innerHTML += "nombre d'articles dans le panier"
totalPrice.innerHTML += calculTotalPrice(cart)


function calculTotalPrice (cart){
    let total = 0
    cart.forEach(element => {
    console.log(element.price)
    console.log(element.quantity)
    total = total + (element.price * element.quantity)
    });
    console.log(total)
    return total .toFixed(2)
}

//------------------------Vérification des inputs----------------------------------------

function verificationsForm(){

    let firstNameInput = document.getElementById('firstName');
    const regexName = /^[A-Za-z]\D*$/
    if(!regexName.test(firstNameInput.value)){
//message d'erreur
        alert("Entrer un prénom valide")
        return false
    }
    
}


document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    verificationsForm()
})


// Page de confirmation:
//L'utilisateur doit voir afficher son numéro de commande.
//Le numéro de commande doit être stocké null part