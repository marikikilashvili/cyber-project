document.addEventListener("DOMContentLoaded", function () {
  fetch("index.json")
    .then((response) => response.json())
    .then((categories) => {
      const container = document.querySelector(".cards1");
      container.innerHTML = "";

      categories.forEach((category) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${category.img || "./images/default.svg"}" alt="${
          category.name
        }" />
            <p>${category.name}</p>
          `;

        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
});
// second
fetch("cards2.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector(".cards2");

    container.innerHTML = "";

    data.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card2");

      card.innerHTML = `
        <img class="phone3" src="${product.img}" alt="${product.name}" />
        <p class="apple">${product.name}</p>
        <p class="dollar">${product.price}</p>
        <button class="buy-now">Buy Now</button>
        <img class="heart" src="./images/Like.svg" alt="Like" />
      `;

      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading products:", error));

fetch("cards3.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector(".cards3");

    container.innerHTML = "";

    data.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card2");

      card.innerHTML = `
        <img class="phone3" src="${product.img}" alt="${product.name}" />
        <p class="apple">${product.name}</p>
        <p class="dollar">${product.price}</p>
        <button class="buy-now">Buy Now</button>
        <img class="heart" src="./images/Like.svg" alt="Like" />
      `;

      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading products:", error));

fetch("shopping-cart.json")
  .then((res) => res.json())
  .then((items) => {
    const container = document.querySelector(".shop-cards");
    container.innerHTML = '<h2 class="shopping">Shopping Cart</h2>';

    items.forEach((item) => {
      container.innerHTML += `
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
  })
  .catch((err) => console.error("Error loading cart:", err));

// start +-


// Fetch all the necessary elements
const cartItems = document.querySelectorAll('.shop-card');

// Loop through each item in the cart
cartItems.forEach((item) => {
  const minusButton = item.querySelector('.minus');
  const plusButton = item.querySelector('.plus');
  const quantityDisplay = item.querySelector('.erti');
  const closeButton = item.querySelector('.close img');

  // Decrease quantity
  minusButton.addEventListener('click', () => {
    let quantity = parseInt(quantityDisplay.textContent);
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  // Increase quantity
  plusButton.addEventListener('click', () => {
    let quantity = parseInt(quantityDisplay.textContent);
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  // Remove item from cart
  closeButton.addEventListener('click', () => {
    item.remove(); // Removes the entire shop card
  });
});
console.log('hello')