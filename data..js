var cart = []

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

          <a href="#" class="btn btn-primary w-100">Add To Cart</a>
        </div>
      </div>
    </div>
`
    })
    document.getElementById('show-product').innerHTML=show;
}

fetch("https://lanhphalla03.github.io/Iphone_APi/card.json")
.then(res=>res.json())
.then(data=>{
    cart=data
    Displayproducts(cart)
})
.catch(err=>alert(err))