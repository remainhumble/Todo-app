const toggleMode = document.getElementById("toggleBtn");
const body = document.body;
const inputField = document.getElementById("input-field");
const enterItem = document.getElementById("enter-item");
const addTodo = document.getElementById("add-todo");
const itemsLeft = document.querySelectorAll(".items-left");
const itemsLeftContainer = document.getElementById("items-left-container");
const itemsLeftContainerDesktop = document.getElementById(
  "items-left-container-desktop",
);
const todos = document.getElementById("todos");
const filters = document.querySelector(".filters");
const filtersDesktop = document.querySelector(".filters-desktop");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompleted = document.querySelectorAll(".clear-completed");

// Toggle light and dark mode
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

  // Todo format
  const todo = document.createElement("li");
  todo.className = "todo";
  todo.draggable = true;

  const content = document.createElement("div");
  content.className = "content";

  const checkIcon = document.createElement("div");
  checkIcon.className = "check-icon";
  checkIcon.tabIndex = 0;

  const checkImage = document.createElement("img");
  checkImage.src = "./images/icon-check.svg";
  checkImage.alt = "check-todo";

  checkIcon.appendChild(checkImage);

  const itemText = document.createElement("span");
  itemText.className = "item-text";
  itemText.textContent = input;

  content.appendChild(checkIcon);
  content.appendChild(itemText);

  const removeIcon = document.createElement("img");
  removeIcon.className = "remove-icon";
  removeIcon.tabIndex = 0;
  removeIcon.src = "./images/icon-cross.svg";
  removeIcon.alt = "remove-todo";

  todo.appendChild(content);
  todo.appendChild(removeIcon);

  todos.appendChild(todo);

  updateItemsLeft();
};

// Add new todos to the list by clicking.
addTodo.addEventListener("click", () => {
  validateInput(enterItem.value);
  enterItem.value = "";
});

// Add new todos to the list by pressing Enter.
enterItem.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Action to perform when Enter is pressed
    validateInput(enterItem.value);
    enterItem.value = "";
  }
});

todos.addEventListener("click", (event) => {
  const checkItem = event.target.closest(".check-icon");
  const removeItem = event.target.closest(".remove-icon");

  // Mark todos as complete
  if (checkItem) {
    checkItem.closest(".todo").classList.toggle("completed");
    updateItemsLeft();
  }

  // Delete todos from the list
  if (removeItem) {
    removeItem.closest(".todo").remove();
    updateItemsLeft();
  }
});

todos.addEventListener("keydown", (event) => {
  const checkItem = event.target.closest(".check-icon");
  const removeItem = event.target.closest(".remove-icon");
  if (event.key === "Enter") {
    // Mark todos as complete
    if (checkItem) {
      checkItem.closest(".todo").classList.toggle("completed");
      updateItemsLeft();
    }

    // Delete todos from the list
    if (removeItem) {
      removeItem.closest(".todo").remove();
      updateItemsLeft();
    }
  }
});

// Count number of todos
const updateItemsLeft = () => {
  const activeItems = document.querySelectorAll(".todo:not(.completed)").length;
  const itemsLeftText = `${activeItems} item${activeItems === 1 ? "" : "s"} left`;

  itemsLeft.forEach((counter) => {
    counter.textContent = itemsLeftText;
  });
};

// Clear all completed todos
clearCompleted.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".todo").forEach((todo) => {
      if (todo.classList.contains("completed")) {
        todo.remove();
      }
    });
  });
});

// Filter by all/active/complete todos
filterBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // Mark todos as complete
    document.querySelectorAll(".todo").forEach((todo) => {
      const isCompleted = todo.classList.contains("completed");

      const shouldShow =
        filter === "all" ||
        (filter === "active" && !isCompleted) ||
        (filter === "completed" && isCompleted);

      todo.style.display = shouldShow ? "flex" : "none";
    });

    filterBtns.forEach((filterButton) => {
      filterButton.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// Drag and drop functionality
let draggedTodo = null;

todos.addEventListener("dragstart", (event) => {
  draggedTodo = event.target.closest(".todo");

  if (!draggedTodo) return;

  draggedTodo.classList.add("dragging");
});

todos.addEventListener("dragend", () => {
  if (draggedTodo) {
    draggedTodo.classList.remove("dragging");
  }

  draggedTodo = null;
});

todos.addEventListener("dragover", (event) => {
  event.preventDefault();

  const targetTodo = event.target.closest(".todo");

  if (!targetTodo || targetTodo === draggedTodo) return;

  const rect = targetTodo.getBoundingClientRect();
  const middle = rect.top + rect.height / 2;

  if (event.clientY < middle) {
    todos.insertBefore(draggedTodo, targetTodo);
  } else {
    todos.insertBefore(draggedTodo, targetTodo.nextSibling);
  }
});
