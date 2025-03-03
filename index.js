document.addEventListener("DOMContentLoaded", function () {
  console.log("JS Loaded");

  // Select the cart icon and navigate to shopping page on click
  const cartIcon = document.querySelector(".cart-icon");

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
          const priceDisplay = item.querySelector(".shop-dollar p");
          const closeButton = item.querySelector(".close img");

          if (
            !minusButton ||
            !plusButton ||
            !quantityDisplay ||
            !priceDisplay ||
            !closeButton
          ) {
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
            priceDisplay,
            closeButton,
          });

          // Decrease quantity or remove card
          minusButton.addEventListener("click", () => {
            console.log("Minus button clicked");
            let quantity = parseInt(quantityDisplay.textContent);
            if (quantity > 1) {
              quantity--;
              quantityDisplay.textContent = quantity;
              updatePriceAndOrderSummary(item, quantityDisplay, priceDisplay);
            } else {
              // If quantity is 1, remove the card and update summary
              item.remove();
              updateOrderSummary(); // Call this directly instead of using the item reference
            }
          });

          // Increase quantity
          plusButton.addEventListener("click", () => {
            let quantity = parseInt(quantityDisplay.textContent);
            quantity++;
            quantityDisplay.textContent = quantity;
            updatePriceAndOrderSummary(item, quantityDisplay, priceDisplay);
          });

          // Close button - remove card
          closeButton.addEventListener("click", () => {
            item.remove();
            updateOrderSummary();
          });
        });

        console.log("Cart functionality initialized");
      }

      // Function to update the price in the card and the order summary
      function updatePriceAndOrderSummary(item, quantityDisplay, priceDisplay) {
        const unitPrice =
          parseFloat(priceDisplay.textContent.replace("$", "")) || 0;
        const newQuantity = parseInt(quantityDisplay.textContent) || 1;
        const newPrice = unitPrice * newQuantity;

        // Update the price in the card
        priceDisplay.textContent = `$${newPrice.toFixed(2)}`;

        // Recalculate the order summary
        updateOrderSummary();
      }

      // Function to update the order summary
      function updateOrderSummary() {
        let subtotal = 0;

        // Loop through each item in the cart to calculate the subtotal
        document.querySelectorAll(".shop-card").forEach((card) => {
          const priceEl = card.querySelector(".shop-dollar p");
          const quantityEl = card.querySelector(".erti");

          let price = parseFloat(priceEl.textContent.replace("$", "")) || 0;
          let quantity = parseInt(quantityEl.textContent) || 0;

          // Add the product price * quantity to the subtotal
          subtotal += price * quantity;
        });

        // Calculate the tax (20%) and shipping (10%)
        let tax = subtotal * 0.2; // 20% tax
        let shipping = subtotal * 0.1; // 10% shipping
        let total = subtotal + tax + shipping; // Final total

        // Update the DOM elements with the new values
        document.getElementById("subtotal").textContent = `$${subtotal.toFixed(
          2
        )}`;
        document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
        document.getElementById("shipping").textContent = `$${shipping.toFixed(
          2
        )}`;
        document.getElementById("total").textContent = `$${total.toFixed(2)}`;
      }

      // Initialize the order summary when the page loads
      updateOrderSummary();
    })
    .catch((error) => console.error("Error loading data:", error));
});
