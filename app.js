let filteredProducts = [...products];

const productContainer = document.querySelector(".products-container");
const displayProducts = () => {
  // if statement
  if (filteredProducts.length < 1) {
    productContainer.innerHTML = `<h6>Sorry, there's no matched product.</h6>`;
    return;
  }
  productContainer.innerHTML = filteredProducts
    .map(({ id, title, image, price }) => {
      return `        <article class="product" data-id="${id}">
          <img
            src="${image}"
            alt="${title}"
            class="product-img img"
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>`;
    })
    .join("");
};
displayProducts();

// text filter
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");
form.addEventListener("keyup", () => {
  const inputValue = searchInput.value.toLowerCase();
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

// filter btns
const companiesDOM = document.querySelector(".companies");
const displayButtons = () => {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];
  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `<button class="company-btn" data-id="${company}">${company}</button>`;
    })
    .join("");
};
displayButtons();

// btns filter
companiesDOM.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("company-btn")) {
    if (el.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    // 把text filter清空
    searchInput.value = "";
    displayProducts();
  }
});
