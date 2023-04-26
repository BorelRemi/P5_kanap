//création du local storage
export function getItem(){
    return JSON.parse(localStorage.getItem("panier")) || {}
}

 export function setItem(cart){
    window.localStorage.setItem('panier', JSON.stringify(cart))// transformation en chaine de caractère
}