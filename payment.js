const params = new URLSearchParams(window.location.search);
    // Get the product details from localStorage
    //const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    let selectedProduct =0;
    const selectedProductid = params.get("id");

    fetch("products.json")
  .then((response) => response.json())
  .then((products) => {
    selectedProduct = products.find((p) => p.id == selectedProductid);

    if (selectedProduct) {
      // Display the product details
      const productDetailsContainer = document.getElementById("product-details");
      productDetailsContainer.innerHTML = `
  </div>
        <h2>${selectedProduct.name}</h2>
        <img src="${selectedProduct.image}" alt="${selectedProduct.name}" />
        <p class="price">$${selectedProduct.price.toFixed(2)}</p>
        <div class="size-options">
            <h3>Select Size:</h3>
            <div class="sizes">
              <button class="size-btn">S</button>
              <button class="size-btn">M</button>
              <button class="size-btn">L</button>
              <button class="size-btn">XL</button>
            </div>
          </div>

          <!-- Proceed to Payment -->
          <button id="proceed-to-payment">Proceed to Payment</button>
        </div>
                <div class="background-wrapper"></div>
  <div class="background-overlay"></div>
    <!-- Payment Page Content -->
  <div class="payment-page-container">
    <!-- Product Image -->
    


    <!-- Payment Options -->
    <div class="payment-options">
    <h3>Select a Payment Option</h3>
      <button id="pay-with-paytm">Pay with Paytm</button>
      <button id="pay-with-gpay">Pay with Google Pay</button>
      <button id="pay-with-card">Pay with Credit Card</button>
    </div>
      `;
      // Optional: Change the overlay gradient color based on product type or category
      const backgroundOverlay = document.querySelector(".background-overlay");
      if (selectedProduct.category === "electronics") {
        backgroundOverlay.style.background = "linear-gradient(135deg, rgba(0, 140, 255, 0.7), rgba(0, 105, 180, 0.7))";
      } else if (selectedProduct.category === "fashion") {
        backgroundOverlay.style.background = "linear-gradient(135deg, rgba(255, 140, 0, 0.7), rgba(255, 105, 180, 0.7))";
      }
  
      // Set the background image to the product image
      const backgroundWrapper = document.querySelector(".background-wrapper");
      backgroundWrapper.style.backgroundImage = `url('${selectedProduct.image}')`;
  
      // Add event listener for the "Proceed to Payment" button
      document.getElementById("proceed-to-payment").addEventListener("click", () => {
        alert("Proceeding to payment...");
        // Here you would handle payment processing (e.g., through an API)
      });
    } else {
      alert("No product selected.");
    }
  });

