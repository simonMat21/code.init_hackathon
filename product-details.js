const params = new URLSearchParams(window.location.search);
const productid = params.get("id");
console.log(productid);
fetch("products.json")
  .then((response) => response.json())
  .then((products) => {
    const product = products.find((p) => p.id == productid);

    if (product) {
      document.getElementById(
        "product-details"
      ).innerHTML = `<!-- Product Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Image Section -->
        <div>
          <img
            src="${product.image}"
            alt="Product"
            class="w-full rounded-lg"
          />
        </div>

        <!-- Details Section -->
        <div>
          <h1 class="text-2xl font-bold">${product.name}</h1>
          <h1 id="product-type" class="text-2xl font-bold">₹${product.price}</h1>
          <p class="text-green-600 font-bold text-lg mt-2">Special Price</p>
          <p class="text-2xl font-bold text-gray-800">
            <span class="line-through text-gray-500 text-lg">₹1,999</span>
            <span class="text-green-600 text-sm font-bold">88% off</span>
          </p>
          <p class="text-yellow-500 text-sm mt-1">
            4.1 ★ | 113,819 ratings & 8,576 reviews
          </p>

          <!-- Size Options -->
          <div class="mt-4">
            <h2 class="text-lg font-semibold">Size</h2>
            <div class="flex space-x-4 mt-2">
              <button class="px-4 py-2 border rounded-lg hover:bg-gray-100">
                S
              </button>
              <button class="px-4 py-2 border rounded-lg hover:bg-gray-100">
                M
              </button>
              <button class="px-4 py-2 border rounded-lg hover:bg-gray-100">
                L
              </button>
              <button class="px-4 py-2 border rounded-lg hover:bg-gray-100">
                XL
              </button>
              <button class="px-4 py-2 border rounded-lg hover:bg-gray-100">
                XXL
              </button>
            </div>
          </div>

          <!-- Offers -->
          <div class="mt-4">
            <h2 class="text-lg font-semibold">product details</h2>
            <ul class="list-disc ml-6 text-sm mt-2">
              <li>
                ${product.fit}
              </li>
              <li>
                ${product.type}
              </li>
              <li>
                ${product.fabric}
              </li>
              <li>
                ${product.sleeve}
              </li>
            </ul>
          </div>`;
    } else {
      document.getElementById("product-details").innerHTML =
        "<p>Product not found</p>";
    }
  });
