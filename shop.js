import { createDescriptionPart, createImgContainer, createLikeBtn, createLoadScreen } from "./components.js"
export const main = document.querySelector('.main')

export async function fetchData(url) {
   let data = await fetch(url)
   data = await data.json()
   return data
}

export async function drawItem() {
   main.append(createLoadScreen())

   const data = await fetchData('data.json')
   await sleep(1000) 
   main.childNodes[0].remove()

   data.forEach(el => {
   const container = document.createElement('div')
   container.classList.add('productContainer')

   container.append(createImgContainer(el.src,data)
                   ,createDescriptionPart({name:el.brandName,price:el.price, model: el.model})
                   ,createLikeBtn())

   main.append(container)
})
}  



export function sleep(ms) {
   return new Promise(res => {
     setTimeout(res,ms)
})}