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
        
        cart.splice(index,1)
        console.log(cart)

        localStorage.setItem('cart', JSON.stringify(cart))
        displayItemsCart(cart)

        let totalQuantity = document.getElementById('totalQuantity')
        let totalPrice = document.getElementById('totalPrice')
        
        totalQuantity.innerHTML = numberOfItems(cart)
        totalPrice.innerHTML = calculTotalPrice(cart)
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
    
    let totalQuantity = document.getElementById('totalQuantity')
    let totalPrice = document.getElementById('totalPrice')

    totalQuantity.innerHTML = numberOfItems(cart)
    totalPrice.innerHTML = calculTotalPrice(cart)

    })
})


}

//---------------------------total panier-----------------------

let totalQuantity = document.getElementById('totalQuantity')
let totalPrice = document.getElementById('totalPrice')

totalQuantity.innerHTML += numberOfItems(cart)
totalPrice.innerHTML += calculTotalPrice(cart)

function numberOfItems(cart){
    let sum = 0
    cart.forEach(element => {
    console.log(element.quantity)
    sum += Number(element.quantity)
    });
    console.log(sum)
    return sum
}

function calculTotalPrice (cart){
    let total = 0
    cart.forEach(element => {
    console.log(element.price)
    console.log(element.quantity)
    total = total + (element.price * element.quantity)
    });
    console.log(total)
    return total.toLocaleString()
}

//------------------------Vérification des inputs----------------------------------------

function verificationsForm(){

    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let cityInput = document.getElementById('city');
    let adressInput = document.getElementById('address');
    let emailInput = document.getElementById('email')

    const regexName = /^[A-Za-z]\D*$/
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/

    if(!regexName.test(firstNameInput.value)){
        let firstNameValidation = document.querySelector("#firstNameErrorMsg")
        firstNameValidation.innerHTML += "Veuillez entrer un Prénom valide"
        return false
    }else if(!regexName.test(lastNameInput.value)){
        let lastNameValidation = document.querySelector("#lastNameErrorMsg")
        lastNameValidation.innerHTML += "Veuillez entrer un Nom valide"
        return false
    }else if(!regexName.test(cityInput.value)){
        let cityValidation = document.querySelector("#cityErrorMsg")
        cityValidation.innerHTML += "Veuillez entrer une Ville valide"
        return false
    }else if( adressInput.value.length < 5){
       let adressValidation = document.querySelector('#addressErrorMsg')
       adressValidation.innerHTML += "Veuillez entrer une Adresse valide"
        return false
    }else if(!regexEmail.test(emailInput.value)){
        let emailValidation = document.querySelector('#emailErrorMsg')
        emailValidation.innerHTML += "Veuillez entrer un Email valide"
        return false
    }
    return true
}

//--------------------------Envoi des données au serveur------------------------------

   /* const products = []
    cart.forEach(element =>{
   // console.log(element)
    productsId = element['_id']
    products.push(productsId)  
    })*/
const products = cart.map(elt => elt['_id'])

console.log(products)


document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    const isValid = verificationsForm()
    if(isValid){

        const contact = {
            firstName: document.querySelector('#firstName').value,
            lastName: document.querySelector('#lastName').value,
            city: document.querySelector('#city').value,
            address: document.querySelector('#address').value,
            email: document.querySelector('#email').value
            }
        const order = {contact, products}
        console.log(order)
    
        
         fetch("http://localhost:3000/api/products/order",
        {
             method : "POST",
             headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
             body : JSON.stringify(order)
        })
        .then(function(res){
             return res.json();
        })
        .then(function(data){
            console.log(data) 
            //console.log(data.orderId)

        // on traite la commande => etape 11
        window.location.href=`confirmation.html?orderId=${data.orderId}`
        
        //alert(JSON.stringify(data))
        })

    }else{
        alert('Pas bien !')
    }
})

