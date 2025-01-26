const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 3000;

// Function to handle file serving
const serveFile = (filePath, contentType, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("404 Not Found");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      res.end(data);
    }
  });
};

// Server setup
const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    serveFile("index.html", "text/html", res);
  } else if (req.url.endsWith(".css")) {
    serveFile(path.join(__dirname, req.url), "text/css", res);
  } else if (req.url.endsWith(".js")) {
    serveFile(path.join(__dirname, req.url), "text/javascript", res);
  } else if (req.url.endsWith(".json")) {
    serveFile(path.join(__dirname, req.url), "application/json", res);
  } else if (req.url.startsWith("/product.html")) {
    serveFile("product.html", "text/html", res);
  } else if (req.url.startsWith("/add-product")) {
    addToCart(req.url.slice(-1));
  } else if (req.url.startsWith("/remove-product")) {
    removeFromCart(req.url.slice(-1));
  } else if (req.url.startsWith("/cart.html")) {
    serveFile("cart.html", "text/html", res);
  } else if (req.url.startsWith("/signup.html")) {
    serveFile("signup.html", "text/html", res);
  } else if (req.url.startsWith("/login.html")) {
    serveFile("login.html", "text/html", res);
  } else if (req.url.startsWith("/login")) {
    loggingIn(req.url);
  } else if (req.url.startsWith("/signup")) {
    addToLogin(req.url, req, res);
    main.loggedin = 1;
    saveMain();
  } else if (req.url.startsWith("/logout")) {
    main.loggedin = 0;
    saveMain();
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Not Found");
    console.log("didn't get anything");
  }

  if (req.url.startsWith("/login") && req.method === "POST") {
    let body = "";

    // Collect the incoming request data
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const loginData = JSON.parse(body); // Parse the JSON body
      const { email, password } = loginData; // Extract email and password

      // Example validation logic
      if (email === "sijobabym@gmail.com" && password === "123") {
        // Send a success response
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Login successful!" }));
      } else {
        // Send an error response
        res.statusCode = 401; // Unauthorized
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Invalid credentials." }));
      }
    });

    req.on("error", (err) => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Server error", error: err.message }));
    });
  } else if (req.url.startsWith("/signup") && req.method === "POST") {
    // let body = "";
    // // Collect the incoming request data
    // req.on("data", (chunk) => {
    //   body += chunk;
    // });
    // req.on("end", () => {
    //   res.statusCode = addToLogin(req.url);
    //   res.setHeader("Content-Type", "application/json");
    //   res.end(JSON.stringify({ message: "Login successful!" }));
    // });
    // req.on("error", (err) => {
    //   res.statusCode = 500;
    //   res.setHeader("Content-Type", "application/json");
    //   res.end(JSON.stringify({ message: "Server error", error: err.message }));
    // });
  }
});

//-----------------------------
const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));
const main = JSON.parse(fs.readFileSync("main.json", "utf-8"));
const login = JSON.parse(fs.readFileSync("login.json", "utf-8"));

// Load or initialize cart data
let cart = JSON.parse(fs.readFileSync("cart.json", "utf-8") || "[]");

// Function to add an item to the cart
function addToCart(productId) {
  // Find product by ID in p.json
  console.log(productId);
  const product = products.find((item) => item.id == productId);

  if (product) {
    // Check if item is already in the cart
    const exists = cart.some((item) => item.id == productId);
    if (!exists) {
      cart.push(product); // Add product details to the cart
      console.log(`Added: ${product.name}`);
    } else {
      console.log("Item already in cart.");
    }
  } else {
    console.log("Product not found.");
  }

  saveCart(); // Save the updated cart
}

function addToLogin(query, req, res) {
  // Find product by ID in p.json
  const queryString = query.split("?")[1];

  if (queryString) {
    let body = "";

    // Collect the incoming request data
    req.on("data", (chunk) => {
      body += chunk;
    });
    // Split the string by the '+' delimiter
    const parts = queryString.split("+");

    console.log(`\nEmail: ${parts[1]}, Password: ${parts[2]}\n`);
    const l_data = { email: parts[1], password: parts[2] };
    const exists = login.some((item) => item.email == parts[1]);
    if (!exists) {
      login.push(l_data); // Add product details to the cart
      console.log(`Added: ${parts[1]}`);
      req.on("end", () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Login successful!" }));
      });
    } else {
      console.log("Item already in login.");
      req.on("end", () => {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Login successful!" }));
      });
    }
  }
  req.on("error", (err) => {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Server error", error: err.message }));
  });
  saveLogin(); // Save the updated cart
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  // Filter out the product by ID
  console.log("Before removal:", cart);
  cart = cart.filter((item) => item.id != productId);
  console.log("After removal:", cart);
  console.log(`Removed product with ID: ${productId}`);
  saveCart(); // Save the updated cart
}

// Save the cart to cart.json
function saveCart() {
  fs.writeFileSync("cart.json", JSON.stringify(cart, null, 2), "utf-8");
}

function saveMain() {
  fs.writeFileSync("main.json", JSON.stringify(main, null, 2), "utf-8");
}

function saveLogin() {
  fs.writeFileSync("login.json", JSON.stringify(login, null, 2), "utf-8");
}
// Example Usage
// addToCart(4); // Adds the "goat" product to the cart
// addToCart(1); // Adds the "bike 2" product to the cart
// removeFromCart(3); // Removes the "goat" product from the cart

//-------------------------------

let login_details = JSON.parse(fs.readFileSync("login.json", "utf-8") || "[]");

function loggingIn(query) {
  const queryString = query.split("?")[1];

  if (queryString) {
    // Split the string by the '+' delimiter
    const parts = queryString.split("+");

    console.log(`\nEmail: ${parts[1]}, Password: ${parts[2]}\n`);
    const l_data = login_details.find((a) => a.email == parts[1]);
    if (l_data) {
      if (l_data.password == parts[2]) {
        main.loggedin = 1;
        saveMain();
        console.log("proper login");
      } else {
        console.log("incorrent passowrd");
      }
    } else {
      console.log("suche an email haven't signed up");
    }
  }
}

// Start server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
