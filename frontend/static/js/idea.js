"use strict";

import ROOT_DATA from "/static/data/preferences.json" assert { type: "json" };

const choicesPanel1 = document.getElementById("choicesPanel1");
const choicesPanel2 = document.getElementById("choicesPanel2");
const choicesPanel3 = document.getElementById("choicesPanel3");
const choicesPanel4 = document.getElementById("choicesPanel4");

const acceptModalButton = document.getElementById("acceptModalButton");

const choicesPanelsArray = [choicesPanel1, choicesPanel2, choicesPanel3, choicesPanel4];

let vissiblePanel = 0;


let activity, food, drinks;

ROOT_DATA.forEach((element) => {
  activity = filterByCategoryId(ROOT_DATA, 1);
  food = filterByCategoryId(ROOT_DATA, 2);
  drinks = filterByCategoryId(ROOT_DATA, 3);
});

// // takes jason data
// fetch("/static/data/preferences.json")
//   .then((response) => response.json())
//   .then((json) => {
//     activity = filterByCategoryId(json, 1);
//     food = filterByCategoryId(json, 2);
//     drinks = filterByCategoryId(json, 3);
//   });


document.addEventListener("DOMContentLoaded", function () {
  displayChoices(drinks);
});

function displayChoices(choicesArray) {
  if (CURRENT_OPTION == 4) {
    generateRandomPrompt();
    return;
  }
  choiceContainer.innerHTML = "";
  console.log(selectedDrinks);
  console.log(selectedFood);
  console.log(selectedActivity);

  const randomItems = getRandomElements(choicesArray, 6);

  randomItems.forEach((item) => {
    renderChoiceBtnHTML(item);
  });
}

function renderChoiceBtnHTML(choice) {
  const containerElement = document.createElement("div");
  containerElement.classList.add(
    "col",
    "px-1",
    "d-flex",
    "justify-content-center",
    "fade-in-bounce"
  );

  const buttonElement = document.createElement("button");
  buttonElement.classList.add("choice-btn");
  buttonElement.textContent = choice.name;

  buttonElement.addEventListener("click", () => {
    buttonElement.classList.toggle("active");

    const { name } = choice;
    switch (CURRENT_OPTION) {
      case 1:
        if (selectedDrinks.includes(name)) {
          const index = selectedDrinks.indexOf(name);
          selectedDrinks.splice(index, 1);
        } else {
          selectedDrinks.push(name);
        }
        break;
      case 2:
        if (selectedFood.includes(name)) {
          const index = selectedFood.indexOf(name);
          selectedFood.splice(index, 1);
        } else {
          selectedFood.push(name);
        }
        break;
      case 3:
        if (selectedActivity.includes(name)) {
          const index = selectedActivity.indexOf(name);
          selectedActivity.splice(index, 1);
        } else {
          selectedActivity.push(name);
        }
        break;
      default:
        if (selectedDrinks.includes(name)) {
          const index = selectedDrinks.indexOf(name);
          selectedDrinks.splice(index, 1);
        } else {
          selectedDrinks.push(name);
        }
        break;
    }
  });

  containerElement.appendChild(buttonElement);
  choiceContainer.appendChild(containerElement);
}

function filterByCategoryId(array, categoryId) {
  return array.filter((element) => element.categoryId === categoryId);
}

// function to select random elements from array
function getRandomElements(array, numberOfElements) {
  // Make a copy of the original array to avoid modifying it
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // Return the first 'numberOfElements' elements
  return shuffledArray.slice(0, numberOfElements);
}

function refreshCurrentOptions() {
  choiceContainer.innerHTML = "";

  switch (CURRENT_OPTION) {
    case 1:
      selectedDrinks.splice(0, selectedDrinks.length);
      displayChoices(drinks);
      break;
    case 2:
      selectedFood.splice(0, selectedFood.length);

      displayChoices(food);
      break;
    case 3:
      selectedActivity.splice(0, selectedActivity.length);

      displayChoices(activity);
      break;
    default:
      CURRENT_OPTION = 1;
      displayChoices(drinks);
      break;
  }
}

function generateRandomPrompt() {
  const drinkString = selectedDrinks.join(" ");
  const foodString = selectedFood.join(" ");
  const activityString = selectedActivity.join(" ");

  const interests = drinkString + " " + foodString + " " + activityString;

  console.log(interests);

  const url = "results.html?prompt=" + encodeURIComponent(interests);
  window.location.href = url;
}

function showNextOptions() {
  CURRENT_OPTION++;
  if (CURRENT_OPTION == 2) {
    displayChoices(food);
  } else {
    displayChoices(activity);
  }
}

refreshBtn.addEventListener("click", refreshCurrentOptions);
nextBtn.addEventListener("click", showNextOptions);
