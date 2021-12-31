const urlSearch = window.location.search

const urlParams = new URLSearchParams (urlSearch)

const orderId = urlParams.get('orderId')

console.log(orderId)


let orderIdValue = document.getElementById('orderId')
orderIdValue.innerHTML += orderId
        
