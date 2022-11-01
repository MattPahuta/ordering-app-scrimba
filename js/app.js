
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
  // if (e.target.classList.includes('add-btn')) {
  //   console.log('button clicked!')

  //   handleAddMenuItem(e.target.id)
  //   // console.log('Added item #: ', e.target.dataset.itemid)
  // }
  console.log(e.target)
})

// Handle add to order 
function handleAddMenuItem(menuId) {
  const selectedItem = Number(menuId)
  const orderArray = [];
  console.log('Item ID passed in: ', menuId);

  for (let item of menuData) {
    if (item.id === selectedItem) {
      orderArray.push(item)
    }
  }

  console.log(orderArray)
}

// <i class="fa-solid fa-plus"></i>

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
        <button class="add-btn" id="add-item-${item.id}" data-add="${item.id}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
        </button>


      </li>
      `
  })

  return menuHtml;

}

// Render menu
function render() {
  document.getElementById('menu-list').innerHTML = getMenuHtml();
}

render();

