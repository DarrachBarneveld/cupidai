"use strict";

let preferencesData;
let categoriesData;
// takes jason data
fetch("/static/data/preferences.json")
  .then((response) => response.json())
  .then((json) => {
    preferencesData = json;
    categoriesData = extractCategories();
    displayCategories();
  });

// function to display the preferences
function extractCategories() {
  const uniqueCategories = new Set();

  // Iterate through the preferencesData and add unique categories to the Set
  preferencesData.forEach((item) => {
    if (item.category) {
      uniqueCategories.add(item.category);
    }
  });

  // Convert Set to an array and return it
  return Array.from(uniqueCategories);
}

// function to display categories and toggle buttons
function displayCategories() {
  const container = document.getElementById("categories-container");

  categoriesData.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.innerHTML = `<h2>${category}</h2>`;

    preferencesData
      .filter((item) => item.category === category)
      .forEach((item) => {
        const button = document.createElement("button");
        button.classList.add("toggle-button");
        button.innerText = item.name;
        button.addEventListener("click", () => {
          button.classList.toggle("active");
        });
        categoryDiv.appendChild(button);
      });

    container.appendChild(categoryDiv);
  });
}
