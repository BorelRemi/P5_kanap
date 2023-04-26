//récupérer les données du local storage
import { getProduct } from "./api.js"
import { getItem, setItem } from "./localstorage.js"
 
//on recupere le panier
 async function fillCart(){
     let cart =  getItem()
    const carItem = document.querySelector("#cart__items")
    for (const id in cart){
        let canape = await getProduct(id)
        console.table(canape)
        for (const color in cart[id]){
            console.log(color)
            const quantity = cart[id][color]
            console.log(quantity)

            //création du html)
            const cartItem = document.querySelector(".cart")
            const article = document.createElement("article")
            article.classList.add(".cart__item")
            cartItem.appendChild(article)
            console.log(article)
           

            const cartItemImg = document.querySelector(".cart__item__img")
            const divImg = document.createElement("div")
            divImg.classList.add(".cart__item_img")

            const img = document.createElement("img")
            img.src = canape.imageUrl
            img.alt = canape.altText
            cartItemImg.appendChild(img)
            console.log(img)
            /*const itemImg = document.querySelector(".item__img")
           
            const img = document.createElement("img")
            img.src = canape.imageUrl
            img.alt = canape.altTxt
            itemImg.appendChild(img)
            
            const title = document.querySelector("#title")
            title.innerHTML = canape.name
        
            const price = document.querySelector("#price")
            price.innerHTML = canape.price*/
        }
    }
}

//on boucle sur le panier
 // récupeer les infos de l'artcile via l'api
  // on va creer une ligne dans le panier
    //ajout d'un listener>sur le bouton de modification dupanier
     //ajout d"'un listener du suppresion d'un article du panier 

//on va creer une fonction qui va calculer le total du panier 

fillCart()
