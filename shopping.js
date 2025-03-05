document.addEventListener("DOMContentLoaded", function () {
  console.log("JS Loaded");
  // Add event listeners to all heart icons

  // Function to update the order summary
  function updateOrderSummary() {
    let subtotal = 0;

    // Loop through each item in the cart to calculate the subtotal
    document.querySelectorAll(".shop-card").forEach((card) => {
      const priceEl = card.querySelector(".shop-dollar p");
      const quantityEl = card.querySelector(".erti");

      const unitPrice = parseFloat(priceEl.dataset.unitPrice) || 0;
      const quantity = parseInt(quantityEl.textContent) || 0;

      subtotal += unitPrice * quantity;
    });

    // Calculate tax (20%) and shipping (10%)
    const tax = subtotal * 0.2;
    const shipping = subtotal * 0.1;
    const total = subtotal + tax + shipping;

    // Update the DOM elements with the new values
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }

  // Function to save cart to localStorage
  function saveCartToLocalStorage() {
    const cartItems = [];
    document.querySelectorAll(".shop-card").forEach((card) => {
      const name = card.querySelector(".shop-h2-p h2").textContent;
      const code = card.querySelector(".shop-h2-p p").textContent;
      const priceEl = card.querySelector(".shop-dollar p");
      const unitPrice = parseFloat(priceEl.dataset.unitPrice);
      const quantity = parseInt(card.querySelector(".erti").textContent);
      const img = card.querySelector(".shop-phone").src;

      cartItems.push({ name, code, price: unitPrice, img, quantity });
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  // Load cart from localStorage
  const shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];
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
                <p class="erti">${item.quantity}</p>
                <img class="plus" src="./images/Edit.svg" alt="+" />
              </div>
              <div class="shop-dollar">
                <p data-unit-price="${item.price}">$${(
        item.price * item.quantity
      ).toFixed(2)}</p>
              </div>
              <div class="close"><img src="./images/Close.svg" alt="X" /></div>
            </div>
          </div>
          <hr />
        `;
    });

    // Attach event listeners to cart items
    const cartItems = container4.querySelectorAll(".shop-card");
    cartItems.forEach((item) => {
      const minusButton = item.querySelector(".minus");
      const plusButton = item.querySelector(".plus");
      const quantityDisplay = item.querySelector(".erti");
      const priceDisplay = item.querySelector(".shop-dollar p");
      const closeButton = item.querySelector(".close img");

      // Decrease quantity
      minusButton.addEventListener("click", () => {
        let quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 1) {
          quantity--;
          quantityDisplay.textContent = quantity;
          priceDisplay.textContent = `$${(
            priceDisplay.dataset.unitPrice * quantity
          ).toFixed(2)}`;
          updateOrderSummary();
          saveCartToLocalStorage();
        } else {
          // If quantity is 1, remove the card
          item.remove();
          updateOrderSummary();
          saveCartToLocalStorage();

          // Show "No Items" image if cart becomes empty
          if (document.querySelectorAll(".shop-card").length === 0) {
            noItemsDiv.style.display = "block";
          }
        }
      });

      // Increase quantity
      plusButton.addEventListener("click", () => {
        let quantity = parseInt(quantityDisplay.textContent);
        quantity++;
        quantityDisplay.textContent = quantity;
        priceDisplay.textContent = `$${(
          priceDisplay.dataset.unitPrice * quantity
        ).toFixed(2)}`;
        updateOrderSummary();
        saveCartToLocalStorage();
      });

      // Remove item
      closeButton.addEventListener("click", () => {
        item.remove();
        updateOrderSummary();
        saveCartToLocalStorage();
      });
    });

    if (document.querySelectorAll(".shop-card").length === 0) {
      noItemsDiv.style.display = "block";
    }

    // Initialize order summary
    updateOrderSummary();
  }
});
