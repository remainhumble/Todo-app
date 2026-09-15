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
const item = document.querySelector(".item");
const itemText = document.querySelector(".item-text");
const filters = document.querySelector(".filters");
const filtersDesktop = document.querySelector(".filters-desktop");
const taskData = [];

const enableDarkMode = () => {
  if (toggleMode.querySelector("img").src.includes("icon-moon.svg")) {
    toggleMode.querySelector("img").src = "./images/icon-sun.svg";
    body.classList.add("dark-mode");
    inputField.classList.add("dark-mode");
    enterItem.classList.add("dark-mode");
    itemsLeftContainer.classList.add("dark-mode");
    itemsLeftContainerDesktop.classList.add("dark-mode");
    item.classList.add("dark-mode");
    itemText.classList.add("dark-mode");
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
    item.classList.remove("dark-mode");
    itemText.classList.remove("dark-mode");
    filters.classList.remove("dark-mode");
    filtersDesktop.classList.remove("dark-mode");
    body.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";
  }
};

toggleMode.addEventListener("click", () => {
  enableDarkMode();
});

const validateInput = (input) => {
  input = input.trim();

  if (!input) {
    return;
  }

  input = input.charAt(0).toUpperCase() + input.slice(1);
  console.log(input);
};

addTodo.addEventListener("click", () => {
  validateInput(enterItem.value);
});
