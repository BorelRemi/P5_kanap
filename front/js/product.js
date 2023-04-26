import { getProduct } from "./api.js"
import { setItem, getItem } from "./localstorage.js"
//fonction pour obtenir l'id du produit
const getId = new URL (document.location).searchParams
const id = getId.get("id")

// création visuel du produit séléctionné
async function fillProduct(){
    const canape = await getProduct(id)
    const itemImg = document.querySelector(".item__img")
    const img = document.createElement("img")
    img.src = canape.imageUrl
    img.alt = canape.altTxt
    itemImg.appendChild(img)
    
    const title = document.querySelector("#title")
    title.innerHTML = canape.name

    const price = document.querySelector("#price")
    price.innerHTML = canape.price

    const description = document.querySelector("#description")
    description.innerHTML = canape.description

    const selectColor = document.getElementById ('colors')
    for (const color of canape.colors){
        const option = document.createElement('option')
        option.value = color
        option.innerHTML = color
     selectColor.appendChild(option)
    }
}

document.querySelector("#addToCart").addEventListener("click", () =>{

        const quantity = parseInt( document.getElementById ("quantity").value)
        const colorChoice = document.getElementById ("colors").value
        if(quantity == '0' || colorChoice == '' || quantity < 1 || quantity > 100){
            alert("vous devez saisir au moins une couleur et une quantité")
        }else{
            let cart = getItem()
            if( id in cart ){
                if(colorChoice in cart[id]){
                    cart[id][colorChoice] += quantity
                }else{
                    cart[id][colorChoice] = quantity
                }
            }
            else{
                cart[id]= {[colorChoice]: quantity} 
            }

            setItem(cart)
            alert('produit ajouté')
        }
})
fillProduct()
export{ fillProduct, getItem, setItem}