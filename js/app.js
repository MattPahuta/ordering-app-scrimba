
const menuData = [
  {
      name: "Pizza",
      ingredients: ["pepperoni", "mushrom", "mozarella"],
      id: 0,
      price: 14,
      emoji: "🍕"
  },
  {
      name: "Hamburger",
      ingredients: ["beef", "cheese", "lettuce"],
      price: 12,
      emoji: "🍔",
      id: 1
  },
      {
      name: "Beer",
      ingredients: ["grain, hops, yeast, water"],
      price: 12,
      emoji: "🍺",
      id: 2
  }
]



/*
*/

document.addEventListener('click', (e) => {
  // clicks on 'add' menu item button
  if (e.target.dataset.add) {
    console.log(e.target.dataset.add)
    handleAddMenuItem(e.target.dataset.add)
  }
  

})

// vars to hold ordered items and order total
// update to add to a dedicated function?
let orderArray = []
let orderTotal = 0;

// Handle add to order 
function handleAddMenuItem(menuId) { // pass in data-add value
  document.getElementById('order').classList.remove('hidden') // unhide the order summary
  const selectedItem = Number(menuId) // convert menuId to number

  console.log('Item ID passed in: ', menuId); // debug

  for (let item of menuData) {
    if (item.id === selectedItem) {
      orderArray.push(item)
      orderTotal += item.price;
    }
  }

  console.log('Current order array: ', orderArray)

  // updateOrder();
  document.getElementById('order-list').innerHTML = renderOrderHtml()
}

function updateOrder() {
  document.getElementById('order-list').innerHTML = renderOrderHtml()

}

// Render the ordered items onto the page
function renderOrderHtml() { 
  document.getElementById('order').classList.remove('hidden'); // unhide the order summary div
  let orderHtml = ``;

  orderArray.forEach(item => {
    orderHtml += `
      <li class="flex">
        <div><span class="item">${item.name}</span><span><a href="javascript:;" class="remove-item" data-remove="0">remove</a></span></div>
        <span class="price">$${item.price}</span>
      </li>
      `
  })
  // update order total html
  document.getElementById('total-amount').textContent = `$${orderTotal}`;
  return orderHtml;
}

// Build menu item Html
function getMenuHtml() {
  let menuHtml = ``;

  menuData.forEach(item => {
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

