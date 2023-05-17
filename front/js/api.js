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

export async function sendForm(data) {
    try {
        //envoyer les données en method POST
        return await fetch(url+"/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(result => result.json())

    } catch (err) {
        console.error("Erreur lors du chargement de l'API pour récupérer la commande:", err);
    }
}