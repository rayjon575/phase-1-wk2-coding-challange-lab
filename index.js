// index.js
// JavaScript for Interactive Shopping List

// DOM Elements
const itemNameInput = document.getElementById("itemName");
const priceInput = document.getElementById("price");
const addButton = document.getElementById("addlist");
const shoppingListContainer = document.getElementById("shoppingList");
const clearButton = document.getElementById("clearlist");
const toggleButton = document.getElementById("toggleButton");

let shoppingList = []; // Array to maintain shopping list items
let darkMode = false; // Mode toggle

// Function to render the shopping list
function renderList() {
    shoppingListContainer.innerHTML = "";
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
            <span class="item-name ${item.purchased ? 'purchased' : ''}">${item.name} - $${item.price}</span>
            <button class="mark-purchased" data-index="${index}">Mark Purchased</button>
            <button class="edit-item" data-index="${index}">Edit</button>
        `;

        shoppingListContainer.appendChild(listItem);
    });
}

// Add item to the list
addButton.addEventListener("click", () => {
    const itemName = itemNameInput.value.trim();
    const price = parseFloat(priceInput.value.trim());

    if (itemName && !isNaN(price)) {
        shoppingList.push({ name: itemName, price: price.toFixed(2), purchased: false });
        itemNameInput.value = "";
        priceInput.value = "";
        renderList();
    } else {
        alert("Please enter a valid item name and price.");
    }
});

// Mark an item as purchased or edit
shoppingListContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("mark-purchased")) {
        shoppingList[index].purchased = !shoppingList[index].purchased;
        renderList();
    } else if (e.target.classList.contains("edit-item")) {
        const newName = prompt("Edit item name:", shoppingList[index].name);
        const newPrice = prompt("Edit item price:", shoppingList[index].price);
        if (newName && newPrice && !isNaN(parseFloat(newPrice))) {
            shoppingList[index].name = newName;
            shoppingList[index].price = parseFloat(newPrice).toFixed(2);
            renderList();
        } else {
            alert("Invalid input. Please try again.");
        }
    }
});

// Clear the list
clearButton.addEventListener("click", () => {
    shoppingList = [];
    renderList();
});

// Toggle dark mode
toggleButton.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    toggleButton.textContent = darkMode ? "Light Mode" : "Dark Mode";
});

// Initial render
renderList();
