import { menuArray } from './data.js'

// array to hold current orders
let ordersArray = [];

document.addEventListener('click', (e) => {
  
  if (e.target.dataset.add) { // if add button clicked
    console.log(typeof e.target.dataset.add) // debug
    document.getElementById('cart').style.display = 'block'; // show the shopping cart
    handleAddMenuItem(e.target.dataset.add) // call handleAddMenuItem
    getTotal(ordersArray) // call getTotal to update total
  } else if (e.target.dataset.remove) {
    console.log(e.target.dataset.remove) // debug
    ordersArray.splice(e.target.dataset.remove, 1); // remove item from cart
    document.getElementById('order-list').innerHTML = renderCartHtml(ordersArray) // re-render cart
    getTotal(ordersArray)
    console.log(ordersArray) // debug
  } else if (e.target.id === 'submit-order') {
    console.log('Getting the payment modal...')
    document.getElementById('payment-modal').style.display = 'block';
  } else if (e.target.id === 'modal-close-btn') {
    document.getElementById('payment-modal').style.display = 'none';
  } 

})

const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('payment submitted');
  document.getElementById('payment-modal').style.display = 'none'; // hide payment modal
  document.getElementById('cart').style.display = 'none';
  const paymentFormData = new FormData(paymentForm)
  const firstName = paymentFormData.get('firstName');

  const orderConfirmed =  document.getElementById('order-confirm');
  orderConfirmed.style.display = 'block'
  orderConfirmed.innerHTML = `
  <p>Thanks, ${firstName}! Your order is on the way!</p>
  `

  console.log(`Thanks, ${firstName}! Your order is on the way.`)
  // hide the cart
  // clear the ordersArray
  // update the total




})

// consentForm.addEventListener('submit', function(e){
//   e.preventDefault()
  
//   const consentFormData = new FormData(consentForm)
//   const fullName = consentFormData.get('fullName')
  
//   modalText.innerHTML = `
//   <div class="modal-inner-loading">
//       <img src="images/loading.svg" class="loading">
//       <p id="upload-text">Uploading your data to the dark web...</p>
//   </div>` 
  
//   setTimeout(function(){
//       document.getElementById('upload-text').innerText = `
//       Making the sale...`
//   }, 1500)
  
  
//   setTimeout(function(){
//       document.getElementById('modal-inner').innerHTML = `
//       <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
//       <p>We just sold the rights to your eternal soul.</p>
//       <div class="idiot-gif">
//           <img src="images/pirate.gif">
//       </div>
//   `
//   modalCloseBtn.disabled = false
//   }, 3000)

// }) 



document.getElementById('pay-btn')

// get/update cart total, display total
function getTotal(items) { // take in array of items ordered
  let total = 0;
  items.forEach(item => total += item.price) // loop through array, add prices
  document.getElementById('total-amount').textContent = `$${total}`;
}

// 
function handlePayment(e) {
  e.prevent
}


// Handle add item to order button
function handleAddMenuItem(menuId) { // pass in data-add value
  const selectedItem = Number(menuId) // convert menuId to number

  console.log('Item ID passed in: ', menuId); // debug

  for (let item of menuArray) {
    if (item.id === selectedItem) {
      ordersArray.push(item)
    }
  }

  console.log('Current order array: ', ordersArray) // debug
  // render the current cart:
  document.getElementById('order-list').innerHTML = renderCartHtml(ordersArray)
}



// Render the ordered items onto the page
function renderCartHtml(ordersArray) { 
  if (!ordersArray.length) { // check if the orders array is empty
    document.getElementById('cart').style.display = 'none'; // hide if there's no orders
  }

  let orderHtml = ``;

  ordersArray.forEach((item, index) => {
    orderHtml += `
      <li class="flex">
        <div><span class="item">${item.name}</span><span><a href="javascript:;" class="remove-item" data-remove="${index}">remove</a></span></div>
        <span class="price">$${item.price}</span>
      </li>
      `
  })
  return orderHtml;
}

// Build menu item Html
function getMenuHtml() {
  let menuHtml = ``;

  menuArray.forEach(item => {
    menuHtml += `
      <li class="flex">
        <div class="menu-item flex" id="menu-item-${item.id}">
          <div class="item-img" id="item-img">${item.emoji}</div>
          <div class="item-details" id="item-details">
            <h3 class="item-title" id="item-title">${item.name}</h3>
            <p class="item-description" id="item-description">${item.ingredients.join(', ')}</p>
            <p class="item-price" id="item-price">$${item.price}</p>
          </div>
        </div>
        <a id="add-item-${item.id}" data-add="${item.id}"href="javascript:;" class="add-btn"></a>
      </li>
      `
  })

  return menuHtml;

}

// Render menu
function renderMenu() {
  document.getElementById('menu-list').innerHTML = getMenuHtml();
}

renderMenu();

