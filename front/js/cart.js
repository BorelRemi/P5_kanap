//récupérer des données du local storage
import { getProduct , sendForm } from "./api.js"
import { getItem, setItem, deleteItem } from "./localstorage.js"
 
//on recupere le panier
 async function fillCart(){
     let cart =  getItem()
    const cartItem = document.querySelector("#cart__items")

    // creation panier vide
    let titre = document.querySelector("h1")
    if (cart.length == 0 || cart == null){
        titre.innerHTML = "Votre panier est vide"
        console.log(titre)
        console.log(cart)
     }else{
     titre.innerHTML = "Votre panier"
        }
    for (const id in cart){
        let canape = await getProduct(id)
        console.log(canape)
        for (const color in cart[id]){
            const quantity = cart[id][color]

            //création du html
            const article = document.createElement("article")
            article.classList.add("cart__item")
            article.dataset.id = id
            article.dataset.color = color
            cartItem.appendChild(article)
            console.log(article)
           
            const divImg = document.createElement("div")
            divImg.classList.add("cart__item__img")
            article.appendChild(divImg)

            const img = document.createElement("img")
            img.src = canape.imageUrl
            img.alt = canape.altTxt
            divImg.appendChild(img)

            const divContent = document.createElement("div")
            divContent.classList.add("cart__item__content")
            article.appendChild(divContent)

            const divContentDescription = document.createElement("div")
            divContentDescription.classList.add("cart__item__content__description")
            divContent.appendChild(divContentDescription)

            const titleProduct = document.createElement("h2")
            titleProduct.innerHTML = canape.name
            divContentDescription.appendChild(titleProduct)

            const colorDescription = document.createElement("p")
            colorDescription.innerHTML = color
            divContentDescription.appendChild(colorDescription)
            console.log(colorDescription)

            const priceDescription = document.createElement("p")
            priceDescription.innerHTML = canape.price + " €"
            divContentDescription.appendChild(priceDescription)

            const divSettings = document.createElement("div")
            divSettings.classList.add("cart__item__settings")
            divContent.appendChild(divSettings)

            const divSettingsQuantity = document.createElement("div")
            divSettingsQuantity.classList.add("cart__item__content__settings__quantity")
            divSettings.appendChild(divSettingsQuantity)

            const itemQuantity = document.createElement("p")
            itemQuantity.innerHTML ='Qté: '+ quantity
            divSettings.appendChild(itemQuantity)
            console.log(quantity)

            const input = document.createElement("input")
            input.classList.add("itemQuantity")
            input.setAttribute("name", "itemQuantity")
            input.setAttribute("type", "number")
            input.setAttribute("min", 1)
            input.setAttribute("max", 100)
            input.value = quantity
            divSettings.appendChild(input)

// changement de la quantité
            input.addEventListener("change", function(e){
                let cart = getItem()
                console.log(e.target.value)
                let newQuantity = e.target.value
                if(newQuantity < 1 ) newQuantity = 1
                if(newQuantity > 100 ) newQuantity = 100
                input.value= newQuantity
            
                input.previousSibling.innerHTML = "Qté: "+ newQuantity
                const artcile = input.closest("article")
                const id = article.dataset.id
                const color = article.dataset.color

                cart[id][color]= parseInt(newQuantity)

                setItem(cart)
                totalPrice()
            })

            const cartItemDelete = document.createElement("div")
            cartItemDelete.classList.add("cart__item__content__settings__delete")
            divSettings.appendChild(cartItemDelete)

            const itemDelete = document.createElement("p")
            itemDelete.classList.add("deleteItem")
            itemDelete.innerHTML = "Supprimer"
            cartItemDelete.appendChild(itemDelete)

// suppression de l'article lors du click
            itemDelete.addEventListener("click",function(e){
                let cart = getItem()
                const article = itemDelete.closest("article")
                article.remove()
                const id = article.dataset.id
                const color = article.dataset.color
                
                delete cart[id][color]

                if(Object.keys(cart[id]).length === 0)
                    delete cart[id]
                   
                    if( Object.keys(cart) === 0){
                        setEmptyMessage()
                    }
                setItem(cart)
                alert("article supprimé")
                totalPrice()
            })
        } 
    }
    totalPrice()
}

fillCart()
//fonction pour creer le total du panier
async function totalPrice(){
    const cart =  getItem()
    let totalPrice  = 0
    let totalQuantity = 0
    for (const id in cart){
        let canape = await getProduct(id)
        const price = canape.price
        let subQuantity = 0
        for (const color in cart[id]){
            subQuantity += cart[id][color]
            totalQuantity += subQuantity
        }
        totalPrice += (subQuantity * price)
    }
    document.querySelector("#totalQuantity").innerHTML = totalQuantity
    document.querySelector("#totalPrice").innerHTML = totalPrice
}

//-----------------------------------------------------------------------------------
// 4) Formulaire avant validation de la commande
//-----------------------------------------------------------------------------------

// Form Validation Regex / Expression régulière de validation de formulaire
const form = document.querySelector('.cart__order__form');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const cityInput = document.querySelector('#city');
const addressInput = document.querySelector('#address');
const emailInput = document.querySelector('#email');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const city = cityInput.value;
    const address = addressInput.value;
    const email = emailInput.value;
    
    const cart = await getItem();
    
    if (validFirstName(firstName) && validLastName(lastName) && validAddress(address) && validCity(city) && validEmail(email)) {
        // Collecter les données du formulaire et commander
        const data = {
            contact: {
                firstName,
                lastName,
                address,
                city,
                email,
            },
            products: Object.keys(cart),
        };
        
        // Envoi de donnée dans l'API
        const result = await sendForm(data);
        
        //Rediriger vers la page de confirmation avec l'ID de commande
        if (result.orderId) {
            // Vider le panier
            deleteItem();
            window.location.href = `/front/html/confirmation.html?confirmation=${result.orderId}`;
        } else {
            alert('Une erreur est survenue lors de la soumission de votre commande !');
        }
    }
});

//Expression regulières
const regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const regExFirstNameLastNameCity = /^[a-zA-Z ,.'-]+$/;
const regExAddress = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;

//validation du prénom
const validFirstName = function() {
    const inputFirstName = document.querySelector("#firstName")
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    let result = true;
    
    if (regExFirstNameLastNameCity.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
        result = false
    }
    return result
};

//validation du nom
const validLastName = function() {
    const inputLastName = document.querySelector("#lastName")
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    let result = true;
    
    if (regExFirstNameLastNameCity.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
        result = false
    }
    return result
};

//validation de l'adresse
const validAddress = function() {
    const inputAddress = document.querySelector("#address")
    let addressErrorMsg = inputAddress.nextElementSibling;
    let result = true;
    
    if (regExAddress.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
        result =  false
    }
    return result
};

//validation de la ville
const validCity = function() {
    const inputCity =  document.querySelector("#city")
    let cityErrorMsg = inputCity.nextElementSibling;
    let result = true;
    
    if (regExFirstNameLastNameCity.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
        result =  false
    }
    return result
};

//validation de l'email
const validEmail = function() {
    const inputEmail = document.querySelector("#email")
    let emailErrorMsg = inputEmail.nextElementSibling;
    let result = true;
    
    if (regExEmail.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre adresse email.';
        result =  false
    }
    return result
};