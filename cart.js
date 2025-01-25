const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage

// Select HTML elements
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotalElement = document.querySelector("#cart-total");
const emptyCartMessage = document.querySelector("#empty-cart-message");
const checkoutButton = document.querySelector("#checkout-button");

function displayCartItems() {
  cartItemsContainer.innerHTML = ""; // Clear previous items
  let total = 0;

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block"; // Show empty cart message
    cartItemsContainer.style.display = "none";
    checkoutButton.style.display = "none";
    cartTotalElement.style.display = "none";
    return;
  } else {
    emptyCartMessage.style.display = "none";
    cartItemsContainer.style.display = "block";
    checkoutButton.style.display = "block";
    cartTotalElement.style.display = "block";
  }

  // Loop through cart items
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(li);
    total += item.price;
  });

  // Update total
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-item").forEach((button) =>
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1); // Remove item from cart
      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      displayCartItems(); // Re-render cart
    })
  );
}

function handleCheckout() {
  if (cart.length > 0) {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart"); // Clear the cart
    location.reload(); // Reload the page
  } else {
    alert("Your cart is empty!");
  }
}

// Display cart items on page load
displayCartItems();

// Add event listener for checkout button
checkoutButton.addEventListener("click", handleCheckout);
