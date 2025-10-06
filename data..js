var cart = []

var cartItem = []
// function display product

const Displayproducts = (product = cart) => {
  let show = ``
  product.forEach((item) => {
    show += ` <div class="col-12 col-sm-6 col-lg-3">
      <div class="card h-100">
        <img src="${item.pic}" class="card-img-top  item object-fit-cover" alt="Gaming Case">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.label}</p>
          <p class="card-text text-success fw-medium fs-5">${item.price}$</p>
           <button onclick="AddtoCart(${item.id})" type="button" class="btn btn-primary w-100">Add To Cart</button>
       
        </div>
      </div>
    </div>
`
  })
  document.getElementById('show-product').innerHTML = show;
}

fetch("https://lanhphalla03.github.io/Iphone_APi/card.json")
  .then(res => res.json())
  .then(data => {
    cart = data
    console.log(data)
    Displayproducts(cart)
  })
  .catch(err => alert(err))

// Search

document.getElementById("search-product").addEventListener("input", (event) => {
  const searchItem = event.target.value.toLowerCase();
  const finds = cart.filter(pro => {
    return pro.name.toLowerCase().includes(searchItem)
  })
  if (finds.length > 0) {
    Displayproducts(finds);
  } else {
    document.getElementById("show-product").innerHTML = `
    <div class="text-center p-3">
      <h5 class="text-danger">Search is not found</h5>
      <p class="text-muted">Please try another keyword...</p>
    </div>
  `;
  }

})

// add to cart

const AddtoCart = (productId) => {
  const product = cart.find(p => p.id === productId)
  const addtoitem = cartItem.find(item => item.id === productId)
  if (addtoitem) {
    addtoitem.quantity += 1;
  } else {
    cartItem.push({...product, quantity : 1})
  }
  alert(`${product.name} Added to Cart`)
  UpdatecardItem()

}

// update cart item 

const UpdatecardItem = () => {
  const cartcount = document.getElementById("cartCount")
  let displaycart = document.getElementById("cartItem")

  const totalItem = cartItem.reduce((sum, item) => sum + item.quantity, 0)
  cartcount.innerHTML = totalItem
  let show=``
  let totalprice=0
  if (cartItem.length === 0) {
    show+= `fghjkl`
  }else{
    
    cartItem.forEach(item=>{
      const subtotal = item.price * item.quantity
      totalprice+=subtotal
      show+=` <div class="d-flex align-items-center mb-3 border-bottom pb-2">
      <img src="${item.pic}" width="60" height="60" class="rounded me-3 object-fit-cover" alt="Gaming Case">
      <div class="flex-grow-1">
        <h6 class="mb-1">${item.name}</h6>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${item.price}$</small>
          <div class="input-group input-group-sm" style="width:100px;">
            <button class="btn btn-outline-secondary">-</button>
            <input type="text" class="form-control text-center" value="1">
            <button class="btn btn-outline-secondary">+</button>
          </div>
        </div>
      </div>
      <button class="btn btn-sm btn-danger ms-2"><i class="bi bi-trash"></i></button>
    </div>
    
    
    `
    

    
    })
    show+=`<div class="mt-auto">
      <div class="d-flex justify-content-between fw-bold fs-5 border-top pt-3">
        <span>Total:</span>
        <span class=" text-success">${totalprice}$</span>
      </div>
      <button class="btn btn-warning w-100 mt-3">Checkout</button>
    </div>`
  }
  displaycart.innerHTML=show
}
