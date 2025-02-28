document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.querySelector(".cart-icon"); // Select the cart icon

  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      window.location.href = "shopping.html"; // Navigate to shopping.html
    });
  }

  // Fetch all the JSON files at once using Promise.all
  Promise.all([
    fetch("index.json").then((res) => res.json()), // Categories
    fetch("cards2.json").then((res) => res.json()), // Cards 2
    fetch("cards3.json").then((res) => res.json()), // Cards 3
    fetch("shopping-cart.json").then((res) => res.json()), // Shopping Cart
  ])
    .then(([categories, cards2, cards3, shoppingCart]) => {
      // Handling categories
      const container1 = document.querySelector(".cards1");
      if (container1) {
        container1.innerHTML = "";
        categories.forEach((category) => {
          const card = document.createElement("div");
          card.classList.add("card");

          card.innerHTML = `
                  <img src="${category.img || "./images/default.svg"}" alt="${
            category.name
          }" />
                  <p>${category.name}</p>
                `;

          container1.appendChild(card);
        });
      }

      // Handling cards 2
      const container2 = document.querySelector(".cards2");
      if (container2) {
        container2.innerHTML = "";
        cards2.forEach((product) => {
          const card = document.createElement("div");
          card.classList.add("card2");

          card.innerHTML = `
                  <img class="phone3" src="${product.img}" alt="${product.name}" />
                  <p class="apple">${product.name}</p>
                  <p class="dollar">${product.price}</p>
                  <button class="buy-now">Buy Now</button>
                  <img class="heart" src="./images/Like.svg" alt="Like" />
                `;

          container2.appendChild(card);
        });
      }

      // Handling cards 3
      const container3 = document.querySelector(".cards3");
      if (container3) {
        container3.innerHTML = "";
        cards3.forEach((product) => {
          const card = document.createElement("div");
          card.classList.add("card2");

          card.innerHTML = `
                  <img class="phone3" src="${product.img}" alt="${product.name}" />
                  <p class="apple">${product.name}</p>
                  <p class="dollar">${product.price}</p>
                  <button class="buy-now">Buy Now</button>
                  <img class="heart" src="./images/Like.svg" alt="Like" />
                `;

          container3.appendChild(card);
        });
      }

      // Handling shopping cart
      const container4 = document.querySelector(".shop-cards");
      if (container4) {
        container4.innerHTML = '<h2 class="shopping">Shopping Cart</h2>';
        shoppingCart.forEach((item) => {
          container4.innerHTML += `
                  <div class="shop-card">
                    <div class="qvesh1">
                      <div class="shop1">
                        <img class="shop-phone" src="${item.img}" alt="${item.name}" />
                      </div>
                      <div class="shop-h2-p">
                        <h2>${item.name}</h2>
                        <p>${item.code}</p>
                      </div>
                    </div>
                    <div class="qvesh">
                      <div class="select">
                        <img class="minus" src="./images/No Edit.svg" alt="-" />
                        <p class="erti">1</p>
                        <img class="plus" src="./images/Edit.svg" alt="+" />
                      </div>
                      <div class="shop-dollar"><p>${item.price}</p></div>
                      <div class="close"><img src="./images/Close.svg" alt="X" /></div>
                    </div>
                  </div>
                  <hr />
                `;
        });

        // Now that the cart items are added, we can safely attach event listeners
        const cartItems = container4.querySelectorAll(".shop-card");
        console.log(`Found .shop-card elements: ${cartItems.length}`);

        cartItems.forEach((item, index) => {
          const minusButton = item.querySelector(".minus");
          const plusButton = item.querySelector(".plus");
          const quantityDisplay = item.querySelector(".erti");
          const closeButton = item.querySelector(".close img");

          if (!minusButton || !plusButton || !quantityDisplay || !closeButton) {
            console.error(
              `Missing elements inside .shop-card ${index + 1}:`,
              item
            );
            return;
          }

          console.log(`Item ${index + 1}:`, {
            minusButton,
            plusButton,
            quantityDisplay,
            closeButton,
          });

          // Decrease quantity or remove card
          minusButton.addEventListener("click", () => {
            let quantity = parseInt(quantityDisplay.textContent);
            if (quantity > 1) {
              quantity--;
              quantityDisplay.textContent = quantity;
            } else {
              // If quantity is 1, remove the card from DOM
              item.remove();
            }
          });

          // Increase quantity
          plusButton.addEventListener("click", () => {
            let quantity = parseInt(quantityDisplay.textContent);
            quantity++;
            quantityDisplay.textContent = quantity;
          });

          // Close button - remove card
          closeButton.addEventListener("click", () => {
            item.remove();
          });
        });

        console.log("Cart functionality initialized");
      }
    })
    .catch((error) => console.error("Error loading data:", error));
});
document.addEventListener("DOMContentLoaded", function () {
  // Example product data (You can get this data dynamically)
  const selectedProducts = [
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 200 },
    { name: "Product 3", price: 300 },
  ];

  // Function to calculate the order summary
  function updateOrderSummary() {
    // Calculate Subtotal (sum of selected products' prices)
    const subtotal = selectedProducts.reduce(
      (total, product) => total + product.price,
      0
    );
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;

    // Calculate Estimated Tax (20% of Subtotal)
    const estimatedTax = subtotal * 0.2;
    document.getElementById("tax").textContent = `$${estimatedTax.toFixed(2)}`;

    // Calculate Estimated Shipping & Handling (10% of Subtotal)
    const estimatedShipping = subtotal * 0.1;
    document.getElementById(
      "shipping"
    ).textContent = `$${estimatedShipping.toFixed(2)}`;

    // Calculate Total (Subtotal + Estimated Tax + Estimated Shipping)
    const total = subtotal + estimatedTax + estimatedShipping;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }

  // Call the function to update order summary on page load
  updateOrderSummary();

  // Optionally, update the summary when an "Apply" button is clicked or other interactions happen
  document.querySelector(".apply-btn").addEventListener("click", function () {
    // Here you can add logic to handle discount code or bonus card if necessary
    updateOrderSummary();
  });
});
