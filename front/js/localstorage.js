//création du local storage
export function getItem(){
    return JSON.parse(localStorage.getItem("panier")) || {}
}

 export function setItem(cart){
    window.localStorage.setItem('panier', JSON.stringify(cart))// transformation en chaine de caractère
}

// Supprimer le panier du stockage local
export function deleteItem() {
    try {
        localStorage.removeItem("panier");
    } catch(err) {
        console.error("Erreur lors de la suppression du panier du stockage local:", err);
    }
}