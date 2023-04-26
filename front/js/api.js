const url = `http://localhost:3000/api/products/`


//fonction pour obtenir l'article choisit
export async function getProduct (id){
    const product = await fetch (url + id)
    .then (reponse2 => reponse2.json())
    return product 
}

export async function getCanapes(){
    const canapes = await fetch(url)
    .then(reponse => reponse.json())
    return canapes
};