import { menuArray } from './data.js' // import menu data

const paymentForm = document.getElementById('payment-form');

// valid promo codes
const currentPromos = ['freePizza', 'happyHour10', 'take15'];
// array to hold current orders
let ordersArray = [];

// general event listener
document.addEventListener('click', (e) => {
  if (e.target.dataset.add) { // if add button clicked
    document.getElementById('cart').style.display = 'block'; // show the shopping cart
    handleAddMenuItem(e.target.dataset.add); // call handleAddMenuItem
    getTotal(ordersArray); // call getTotal to update total
  } else if (e.target.dataset.remove) {
    ordersArray.splice(e.target.dataset.remove, 1); // remove item from cart
    document.getElementById('order-list').innerHTML = renderCartHtml(ordersArray); // re-render cart
    getTotal(ordersArray);
  } else if (e.target.id === 'submit-order') {
    document.getElementById('payment-modal').style.display = 'block';
  } else if (e.target.id === 'modal-close-btn') {
    document.getElementById('payment-modal').style.display = 'none';
  } 
})

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('payment-modal').style.display = 'none'; // hide payment modal
  document.getElementById('cart').style.display = 'none'; // hide shopping cart
  const paymentFormData = new FormData(paymentForm); // use FormData() constructor 
  const firstName = paymentFormData.get('firstName');
  // handle confirmation message:
  const orderConfirmed =  document.getElementById('order-confirm');
  orderConfirmed.style.display = 'block';
  orderConfirmed.innerHTML = `
    <p>Thanks, ${firstName}! Your order is on the way!</p>
    `;
  // wait 3 seconds then reset the cart, hide message
  setTimeout(() => {
    resetCart(); // reset the cart
    orderConfirmed.style.display = 'none';
  }, 3000)
})

// Reset the shopping cart and payment form
function resetCart() {
  paymentForm.reset(); // reset the form fields
  ordersArray.length = 0; // clear the ordersArray
  getTotal(ordersArray); // update the total
  renderCartHtml(ordersArray);
}

// handle promo code
function applyPromoCode() {

}

// get/update cart total, display total
function getTotal(items) { // take in array of items ordered
  let total = 0;
  items.forEach(item => total += item.price); // loop through array, add prices
  document.getElementById('total-amount').textContent = `$${total}`;
}

// Handle add item to order button
function handleAddMenuItem(menuId) { // pass in data-add value
  const selectedItem = Number(menuId); // convert menuId to number
  for (let item of menuArray) {
    if (item.id === selectedItem) {
      ordersArray.push(item);
    }
  }
  // render the current cart:
  document.getElementById('order-list').innerHTML = renderCartHtml(ordersArray);
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
  });
  return orderHtml;
}

// Build menu item HTML
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
      `;
  });
  return menuHtml;
}

// Render menu
function renderMenu() {
  document.getElementById('menu-list').innerHTML = getMenuHtml();
}

renderMenu();

