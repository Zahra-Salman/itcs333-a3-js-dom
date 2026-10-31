document.addEventListener("DOMContentLoaded", function () {
    
  const form = document.querySelector("#todo-form");
  const input = document.querySelector("#todo-input");
  const list = document.querySelector("#todo-list");
  const errorMsg = document.querySelector("#error-msg");
  const counter = document.querySelector("#counter");

  const filterAll = document.querySelector("#filter-all");
  const filterActive = document.querySelector("#filter-active");
  const filterDone = document.querySelector("#filter-done");

  let currentFilter = "all";

  function updateCounter() {
    const activeItems = list.querySelectorAll(
      "li:not(.completed)"
    ).length;

    counter.textContent = `${activeItems} item(s) left`;
  }

  function applyFilter() {
    const items = list.querySelectorAll("li");

    items.forEach(function (item) {
      const completed = item.classList.contains("completed");

      if (currentFilter === "all") {
        item.style.display = "";
      } else if (currentFilter === "active") {
        item.style.display = completed ? "none" : "";
      } else if (currentFilter === "done") {
        item.style.display = completed ? "" : "none";
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = input.value.trim();

    if (task === "") {
      errorMsg.classList.remove("hidden");
      return;
    }

    errorMsg.classList.add("hidden");

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.textContent = task;

    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    input.value = "";

    updateCounter();
    applyFilter();
  });

  list.addEventListener("click", function (event) {
    const item = event.target.closest("li");

    if (!item || !list.contains(item)) {
      return;
    }

    if (event.target.closest(".delete-btn")) {
      item.remove();
    } else {
      item.classList.toggle("completed");
    }

    updateCounter();
    applyFilter();
  });

  filterAll.addEventListener("click", function () {
    currentFilter = "all";
    applyFilter();
  });

  filterActive.addEventListener("click", function () {
    currentFilter = "active";
    applyFilter();
  });

  filterDone.addEventListener("click", function () {
    currentFilter = "done";
    applyFilter();
  });

  updateCounter();
});