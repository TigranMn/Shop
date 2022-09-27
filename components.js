import { drawItem, main, sleep } from "./shop.js"

export  function createImgContainer(src,mainData) { 
   const imgContainer = document.createElement('div')
   imgContainer.classList.add('imgContainer')

   const image = document.createElement('img')
   image.classList.add('productImage')
   image.setAttribute('src',src)
   imgContainer.append(image)

   imgContainer.addEventListener('mouseover', (e) => {
      if(e.target.classList.contains('productImage')) {
         e.target.src = mainData.find(el =>   el.src === e.target.src).altSrc
      }
   })
   imgContainer.addEventListener('mouseout', (e) => {
      if(e.target.classList.contains('productImage')) {
         e.target.src = mainData.find(el =>   el.altSrc === e.target.src).src
      }
})

   return imgContainer
}
export function createDescriptionPart({name,price,model}) {
   const container = document.createElement('div')
   container.classList.add('lower')

   const productDescription = document.createElement('div')
   productDescription.classList.add('productDescription')

   const productName = document.createElement('p')
   productName.classList.add('productName')
   productName.innerText = name

   const modelName = document.createElement('p')
   modelName.classList.add('productName')
   modelName.innerText = model
   
   const productPrice = document.createElement('span')
   productPrice.classList.add('productPrice')
   productPrice.innerText = price
   productDescription.append(productName,modelName,productPrice)

   const cartContainer = document.createElement('div')
   cartContainer.classList.add('cart')

   const cartBtn = document.createElement('button')
   cartBtn.setAttribute('id','cart')

   let cartIcon = document.createElement('i')
   cartIcon.classList.add('fa')
   cartIcon.classList.add('fa-cart-plus')
   cartIcon.setAttribute('aria-hidden','true')

   cartBtn.append(cartIcon)
   cartContainer.append(cartBtn)

   container.append(productDescription,cartContainer)
   return container
}

export  function createLikeBtn() {
   const likeContainer = document.createElement('div')
   likeContainer.classList.add('like')

   const likeBtn = document.createElement('button')
   likeBtn.setAttribute('id','like')

   let likeIcon = document.createElement('i')
   likeIcon.classList.add('fa-regular')
   likeIcon.classList.add('fa-heart')

   likeBtn.append(likeIcon)
   likeContainer.append(likeBtn)
   likeBtn.addEventListener('click',async () => {
      likeBtn.firstChild.classList.toggle('fa-regular')
      likeBtn.firstChild.classList.toggle('fa-solid')
      likeBtn.classList.add('fa')
      await sleep(500)
      likeBtn.classList.remove('fa')
      likeBtn.classList.add('cartAnim2')
   })
   return likeContainer
}

export function createLoadScreen() {
   const loadContainer = document.createElement('div')
   loadContainer.classList.add('load')

   const load = document.createElement('img')
   load.setAttribute('src','https://icons8.com/preloaders/preloaders/1487/%E2%80%8B%E2%80%8BIphone-spinner-1.gif')
   loadContainer.append(load)
   return loadContainer

}

/////// EVENT HANDLERS

const fetchBtn = document.querySelector('.fetchBtn')
const cartDropdown = document.querySelector('.fa-cart-arrow-down')
const cart = document.querySelector('.dropdownCart')
const searchInput = document.querySelector('#search')


searchInput.addEventListener('focus',(e) => {
   e.target.parentElement.setAttribute('style','outline:2px dashed #AE4343;')
})

searchInput.addEventListener('focusout',(e) => {
   e.target.parentElement.removeAttribute('style')
})



fetchBtn.addEventListener('click',() => {
   if(!main.childNodes.length) {
   drawItem()
   }
})


cartDropdown.addEventListener('click',async (e) =>  {
   e.target.classList.add('cartAnim')
   await sleep(500)
   cart.style.display = 'flex'
})

window.addEventListener('keydown',(e) => {
   if(e.key === 'Escape') {
   cartDropdown.classList.remove('cartAnim')
   cartDropdown.classList.add('cartAnim2')
   cart.style.display = 'none'
   }
})