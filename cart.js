const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage
const productsContainer = document.getElementById("products");
const Total = document.getElementById("cart-total");

// Select HTML elements
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotalElement = document.querySelector("#cart-total");
const emptyCartMessage = document.querySelector("#empty-cart-message");
const checkoutButton = document.querySelector("#checkout-button");
let total = 0;

fetch("cart.json")
  .then((response) => response.json())
  .then((products) => {
    allProducts = products; // Store the fetched products for search
    products.forEach((p) => {
      total = total + p.price;
    });
    Total.innerHTML = `Total: ₹${total}`;
    displayProducts(allProducts); // Display all products initially
  });
function displayProducts(products) {
  productsContainer.innerHTML = ""; // Clear the product container
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.setAttribute("data-name", product.name);
    productElement.setAttribute("data-price", product.price);

    productElement.innerHTML = `
          <div id="products" class="space-y-4">
        <div class="cart-item flex items-center p-4 bg-gray-100 rounded-lg">
          <img
            src="${product.image}"
            alt="Product"
            class="w-20 h-20 rounded-lg object-cover"
          />
          <div class="info flex-1 ml-4">
            <h3 class="text-lg font-medium">${product.name}</h3>
            <p class="text-gray-600">$${product.price}</p>
          </div>
          <button
            class="remove-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Remove
          </button>
    `;

    productsContainer.appendChild(productElement);

    // Add event listener to the "Add to Cart" button
    productElement
      .querySelector(".remove-btn")
      .addEventListener("click", () => {
        location.reload();
        console.log("q---");
        fetch(
          `http://127.0.0.1:3000/remove-product?${encodeURIComponent(
            product.id
          )}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              console.log("ki");
            } else {
              console.log("op");
            }

            console.log(response);
          })
          .catch((error) => console.error("Error:", error));
      });
  });
}

function handleCheckout() {
  if (total > 0) {
    alert("Thank you for your purchase!");
    location.reload(); // Reload the page
  } else {
    alert("Your cart is empty!");
  }
}

// Add event listener for checkout button
checkoutButton.addEventListener("click", handleCheckout);
