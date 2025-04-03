// Function to show the Drinks section
function showDrinks() {
    document.getElementById('food-section').style.display = 'none'; // Hide the Food section
    document.getElementById('drinks-section').style.display = 'block'; // Show the Drinks section
}

// Function to show the Food section
function showFood() {
    document.getElementById('drinks-section').style.display = 'none'; // Hide the Drinks section
    document.getElementById('food-section').style.display = 'block'; // Show the Food section
}

// Cart functionality
let cart = [];

function addToCart(itemName, price) {
    cart.push({ itemName, price });
    updateCartDisplay();
    document.getElementById('cartPopup').style.display = 'block'; // Show cart popup after adding an item
}

function updateCartDisplay() {
    const cartList = document.getElementById('cartList');
    const totalElement = document.getElementById('total');
    cartList.innerHTML = ''; // Clear the current cart list

    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.itemName} - $${item.price}`;
        
        // Create a minus button (styled as a "Remove" button)
        const removeButton = document.createElement('button');
        removeButton.textContent = '-'; // Set the text to minus (-)
        removeButton.classList.add('remove-button'); // Add a class for styling
        removeButton.onclick = function() {
            removeItem(index); // Remove item by index when clicked
        };

        listItem.appendChild(removeButton); // Add the remove button next to the item
        cartList.appendChild(listItem);
        total += item.price;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // If total is 0, hide the cart popup after 2 seconds
    if (total === 0) {
        setTimeout(function() {
            document.getElementById('cartPopup').style.display = 'none';
        }, 2000);
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    updateCartDisplay(); // Update the cart display

    // If the cart is empty (total is 0), hide the cart after 2 seconds
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    if (total === 0) {
        setTimeout(function() {
            document.getElementById('cartPopup').style.display = 'none';
        }, 2000);
    }
}

function confirmPurchase() {
    if (cart.length === 0) {
        alert("No items in the cart! Please add some items first.");
    } else {
        // Proceed with the purchase logic (for now just a success message)
        document.getElementById('receiptPopup').style.display = 'block';

        // Hide the cart list after purchase
        setTimeout(function() {
            document.getElementById('cartPopup').style.display = 'none'; // Hide cart popup
            cart = []; // Clear the cart
            updateCartDisplay(); // Update the display
        }, 1000); // Delay of 1 second to let the receipt message show
    }
}

function cancelCart() {
    cart = [];
    updateCartDisplay();
    document.getElementById('cartPopup').style.display = 'none'; // Hide cart popup
}

function closeReceipt() {
    document.getElementById('receiptPopup').style.display = 'none'; // Hide the receipt popup
}

