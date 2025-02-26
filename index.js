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

fetch("cards3.json") // Make sure the path to your JSON file is correct
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector(".cards3");

    // ✅ Clear existing content before adding new items
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
