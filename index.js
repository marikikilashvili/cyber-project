document.addEventListener("DOMContentLoaded", function () {
  console.log("JS Loaded");

  // Add event listener to the "Home" link
  const homeLink = document.querySelector('a[href="#home"]');
  if (homeLink) {
    homeLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      window.location.href = "index.html"; // Navigate to index.html
    });
  }
  // Add event listener to the cart icon
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      // Navigate to shopping.html
      window.location.href = "shopping.html";
    });
  }

  // Function to add product to cart in localStorage
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if product already exists
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  }

  // Fetch JSON data
  Promise.all([
    fetch("index.json").then((res) => res.json()), // Categories
    fetch("cards2.json").then((res) => res.json()), // Products in cards2
    fetch("cards3.json").then((res) => res.json()), // Products in cards3
  ])
    .then(([categories, cards2, cards3]) => {
      // Handle categories (if needed)
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

      // Handle cards2 (products)
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

          // Add to cart on "Buy Now" click
          card.querySelector(".buy-now").addEventListener("click", () => {
            addToCart({
              name: product.name,
              price: parseFloat(product.price.replace("$", "")), // Ensure price is a number
              img: product.img,
              code: product.code, // From JSON data
            });
          });
        });
      }

      // Handle cards3 (products)
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

          // Add to cart on "Buy Now" click
          card.querySelector(".buy-now").addEventListener("click", () => {
            addToCart({
              name: product.name,
              price: parseFloat(product.price.replace("$", "")),
              img: product.img,
              code: product.code,
            });
          });
        });
      }
    })
    .catch((error) => console.error("Error loading data:", error));
});
