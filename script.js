/* script.js */
const products = [
  {id:1, name:"Shoes", price:1000, discount:10},
  {id:2, name:"Shirt", price:500, discount:5},
  {id:3, name:"Watch", price:2000, discount:20}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const list = document.getElementById("product-list");
const searchInput = document.getElementById("search");

function displayProducts(items){
  if(!list) return;
  list.innerHTML = "";
  items.forEach(p=>{
    list.innerHTML += `
      <div class="product" onclick="viewProduct(${p.id})">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p>${p.discount}% OFF</p>
      </div>`;
  });
}

function viewProduct(id){
  localStorage.setItem("product", id);
  window.location.href = "product.html";
}

function loadHome(){
  displayProducts(products);
  if(searchInput){
    searchInput.addEventListener("input", ()=>{
      const val = searchInput.value.toLowerCase();
      const filtered = products.filter(p=>p.name.toLowerCase().includes(val));
      displayProducts(filtered);
    });
  }
}

function loadProduct(){
  const id = localStorage.getItem("product");
  const p = products.find(x=>x.id == id);
  const div = document.getElementById("product-detail");
  if(div && p){
    div.innerHTML = `
      <h1>${p.name}</h1>
      <p>Price: ₹${p.price}</p>
      <p>Discount: ${p.discount}%</p>
      <input type="number" id="qty" value="1" min="1">
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
  }
}

function addToCart(id){
  const qty = document.getElementById("qty").value;
  cart.push({id, qty});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart(){
  const div = document.getElementById("cart-items");
  if(!div) return;
  let total = 0;
  div.innerHTML = "";

  cart.forEach(item=>{
    const p = products.find(x=>x.id == item.id);
    const price = p.price * item.qty;
    total += price;
    div.innerHTML += `<p>${p.name} x ${item.qty} = ₹${price}</p>`;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function updateCartCount(){
  const count = document.getElementById("cart-count");
  if(count) count.innerText = cart.length;
}

loadHome();
loadProduct();
loadCart();
updateCartCount();
