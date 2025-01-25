const cart = [];
const productsContainer = document.querySelector(".products");

// Fetch product data from JSON
fetch("products.json")
  .then((response) => response.json())
  .then((products) => {
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.setAttribute("data-name", product.name);
      productElement.setAttribute("data-price", product.price);

      productElement.innerHTML = `

                        <a href="product.html?id=${encodeURIComponent(
                          product.id
                        )}">
                        <img src="${product.image}" alt="${product.name}">
                        </a>
                        <p>$${product.price.toFixed(2)}</p>
                        <p>${product.name}</p>
                        <button>Add to Cart</button>
                    `;

      productsContainer.appendChild(productElement);

      // Add event listener to the button
      productElement.querySelector("button").addEventListener("click", () => {
        cart.push({ name: product.name, price: product.price });
        updateCart();
      });
    });
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
