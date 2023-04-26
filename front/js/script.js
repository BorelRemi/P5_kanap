import { getCanapes } from "./api.js";
async function fillCanape(){
    const canape = await getCanapes()

const sectionItems = document.querySelector("#items")
for (let i = 0; i < canape.length; i++){
    const kanap = canape[i]
    const a = document.createElement("a")
    a.href= "product.html?id=" + kanap["_id"]
    sectionItems.appendChild(a)

    const article = document.createElement("article")
    a.appendChild(article)

    const img = document.createElement("img")
    img.src = kanap.imageUrl
    img.alt = kanap.altTxt
    article.appendChild(img)

    const h3 = document.createElement("h3")
    h3.classList.add("productName")
    h3.innerHTML = kanap.name
    article.appendChild(h3)
    console.log(sectionItems)

    const p = document.createElement ("p")
    p.classList.add("productDescription")
    p.innerHTML = kanap.description
    article.appendChild(p)
   }
};
 fillCanape()
