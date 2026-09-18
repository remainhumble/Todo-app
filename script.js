const toggleMode = document.getElementById("toggleBtn");
const body = document.body;
const inputField = document.getElementById("input-field");
const enterItem = document.getElementById("enter-item");
const addTodo = document.getElementById("add-todo");
const itemsLeftContainer = document.getElementById("items-left-container");
const itemsLeftContainerDesktop = document.getElementById(
  "items-left-container-desktop",
);
const items = document.getElementById("items");
const filters = document.querySelector(".filters");
const filtersDesktop = document.querySelector(".filters-desktop");
const taskData = [];

// Switch between light and dark.
const enableDarkMode = () => {
  if (toggleMode.querySelector("img").src.includes("icon-moon.svg")) {
    toggleMode.querySelector("img").src = "./images/icon-sun.svg";
    body.classList.add("dark-mode");
    inputField.classList.add("dark-mode");
    enterItem.classList.add("dark-mode");
    itemsLeftContainer.classList.add("dark-mode");
    itemsLeftContainerDesktop.classList.add("dark-mode");
    filters.classList.add("dark-mode");
    filtersDesktop.classList.add("dark-mode");
    body.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";
  } else {
    toggleMode.querySelector("img").src = "./images/icon-moon.svg";
    body.classList.remove("dark-mode");
    inputField.classList.remove("dark-mode");
    enterItem.classList.remove("dark-mode");
    itemsLeftContainer.classList.remove("dark-mode");
    itemsLeftContainerDesktop.classList.remove("dark-mode");
    filters.classList.remove("dark-mode");
    filtersDesktop.classList.remove("dark-mode");
    body.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";
  }
};

toggleMode.addEventListener("click", () => {
  enableDarkMode();
});

// Making sure the item entered and added is in a clean and proper format.
const validateInput = (input) => {
  // Remove whitespace
  input = input.trim();

  if (!input) {
    return;
  }

  // Capitalize first letter
  input = input.charAt(0).toUpperCase() + input.slice(1);
  console.log(`<div class="item">
        <div class="item-content">
          <div class="check-icon" tabindex="0">
            <img src="./images/icon-check.svg" alt="check-item" />
          </div>
          <span class="item-text">${input}</span>
        </div>
        <img tabindex="0"
          class="remove-icon"
          src="./images/icon-cross.svg"
          alt="remove-item"
        />
      </div>`);
  items.innerHTML += `<div class="item">
        <div class="item-content">
          <div class="check-icon" tabindex="0">
            <img src="./images/icon-check.svg" alt="check-item" />
          </div>
          <span class="item-text">${input}</span>
        </div>
        <img tabindex="0"
          class="remove-icon"
          src="./images/icon-cross.svg"
          alt="remove-item"
        />
      </div>`;
};

addTodo.addEventListener("click", () => {
  validateInput(enterItem.value);
});

items.addEventListener("click", (event) => {
  const checkItem = event.target.closest(".check-icon");

  if (checkItem) {
    checkItem.closest(".item").classList.toggle("completed");
  }
});
