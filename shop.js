const fetchBtn = document.querySelector('.fetchBtn')
const main = document.querySelector('.main')
const cartDropdown = document.querySelector('.fa-cart-arrow-down')
const cart = document.querySelector('.dropdownCart')

fetchBtn.addEventListener('click',() => {
   if(!main.childNodes.length) {
   drawItem()
   }
})


cartDropdown.addEventListener('click',() =>  {
      cart.style.display = 'flex'
})

async function fetchData(url) {
   let data = await fetch(url)
   return data.json()
}

async function drawItem() {
   const loadContainer = document.createElement('div')
   loadContainer.classList.add('load')

   const load = document.createElement('img')
   load.setAttribute('src','https://icons8.com/preloaders/preloaders/1487/%E2%80%8B%E2%80%8BIphone-spinner-1.gif')
   loadContainer.append(load)
   main.append(loadContainer)

   const data = await fetchData('data.json')
   await sleep(1000)
   main.childNodes[0].remove()
   data.forEach(el => {
   const container = document.createElement('div')
   container.classList.add('productContainer')

   container.append(createImgContainer(el.src)
                   ,createDescriptionPart({name:el.brandName,price:el.price, model: el.model})
                   ,createLikeBtn())

   main.append(container)
})
}  

function createImgContainer(src) {
   const imgContainer = document.createElement('div')
   imgContainer.classList.add('imgContainer')

   const image = document.createElement('img')
   image.classList.add('productImage')
   image.setAttribute('src',src)
   imgContainer.append(image)
   return imgContainer
}
function createDescriptionPart({name,price,model}) {
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

   cartIcon = document.createElement('i')
   cartIcon.classList.add('fa')
   cartIcon.classList.add('fa-cart-plus')
   cartIcon.setAttribute('aria-hidden','true')

   cartBtn.append(cartIcon)
   cartContainer.append(cartBtn)

   container.append(productDescription,cartContainer)
   return container
}

function createLikeBtn() {
   const likeContainer = document.createElement('div')
   likeContainer.classList.add('like')

   const likeBtn = document.createElement('button')
   likeBtn.setAttribute('id','like')

   likeIcon = document.createElement('i')
   likeIcon.classList.add('fa-regular')
   likeIcon.classList.add('fa-heart')

   likeBtn.append(likeIcon)
   likeContainer.append(likeBtn)
   likeBtn.addEventListener('click', () => {
      likeBtn.firstChild.classList.toggle('fa-regular')
      likeBtn.firstChild.classList.toggle('fa-solid')
      console.log(likeIcon.class)
   })
   return likeContainer
}

function sleep(ms) {
   return new Promise(res => {
     setTimeout(res,ms)
})}