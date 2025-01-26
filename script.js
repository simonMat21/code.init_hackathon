const cart = [];
const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const lg_btn = document.getElementById("login_btn");

fetch("main.json")
  .then((response) => response.json())
  .then((p) => {
    if (p.loggedin == 1) {
      lg_btn.innerHTML = "logout";
    } else {
      lg_btn.innerHTML = "login";
    }
    lg = p.loggedin;
  });
lg_btn.addEventListener("click", () => {
  if (lg == 1) {
    location.reload();
    fetch(`http://127.0.0.1:3000/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error));
  } else {
    window.location.href = "/login.html";
  }
});

function updateCart() {
  const cartList = document.querySelector("#cart ul");
  const totalDisplay = document.querySelector("#cart p");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

let allProducts = []; // Store all products for filtering

// Fetch product data from JSON
fetch("products.json")
  .then((response) => response.json())
  .then((products) => {
    allProducts = products; // Store the fetched products for search
    displayProducts(allProducts); // Display all products initially
  });

// Function to display products dynamically
function displayProducts(products) {
  productsContainer.innerHTML = ""; // Clear the product container
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.setAttribute("data-name", product.name);
    productElement.setAttribute("data-price", product.price);

    productElement.innerHTML = `
      <a href="product.html?id=${encodeURIComponent(product.id)}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <h3>${product.name}</h3>
      <p>₹${product.price.toFixed(2)}</p>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    productsContainer.appendChild(productElement);

    // Add event listener to the "Add to Cart" button
    productElement
      .querySelector(".add-to-cart-btn")
      .addEventListener("click", () => {
        console.log("q---");
        fetch(
          `http://127.0.0.1:3000/add-product?${encodeURIComponent(product.id)}`,
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

    // Add event listener to the "Buy now" button
    // productElement.querySelector(".buy-now-btn").addEventListener("click", () => {
    //   // Store the product information in localStorage or pass via URL
    //   localStorage.setItem("selectedProduct", JSON.stringify(product)); // Store product data
    //   window.location.href = `payment.html?id=  ${encodeURIComponent(product.id)}`; // Redirect to the payment page
    // });
  });
}

// // Search functionality (triggered by input and button)
function searchProducts() {
  const searchTerm = searchInput.value.toLowerCase(); // Get the search term
  const filteredProducts = allProducts.filter(
    (product) => product.name.toLowerCase().includes(searchTerm) // Filter products based on name
  );
  displayProducts(filteredProducts); // Update the displayed products
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  searchProducts(); // Call the search function when the button is clicked
});

// Real-time search functionality (triggered while typing)
searchInput.addEventListener("input", () => {
  searchProducts(); // Call the search function on every input change
});

// Optional: Trigger search on Enter keypress in the search bar
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission
    searchProducts(); // Call the search function
  }
  document.addEventListener("DOMContentLoaded", () => {
    const shopButton = document.querySelector('a[href="#products"]'); // Target the "Shop" button
    const productsSection = document.getElementById("products"); // Target the "Products" section

    shopButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      productsSection.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    });
  });
});
