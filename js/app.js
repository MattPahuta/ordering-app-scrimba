import { menuArray } from './data.js'


let ordersArray = []

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
  }
  

})

// get/update cart total, display total
function getTotal(items) { // take in array of items ordered
  let total = 0;
  items.forEach(item => total += item.price) // loop through array, add prices
  document.getElementById('total-amount').textContent = `$${total}`;
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
    document.getElementById('cart').style.display = 'none';
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

