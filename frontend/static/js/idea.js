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

// Variables to store the user's choices
let activityChoice, foodChoice, drinkChoice;

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

window.addEventListener("load", function () {});

// function to filter categories for elements
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

// Function to create a list of button from random 6 elements
function createButtonList(array) {
  const randomElements = getRandomElements(array, 6);
  const buttonList = randomElements.map((element) => {
    return `<button class="btn-selection" type="button">${element.name}</button>`;
  });

  return buttonList.join("");
}

function createButtonHTML(panelID) {
  let buttonHTML = "";
  switch (panelID) {
    case 1:
      cleanAndReplaceButtons(panelID, activity);
      break;
    case 2:
      cleanAndReplaceButtons(panelID, food);
      break;
    case 3:
      cleanAndReplaceButtons(panelID, drinks);
      break;
    default:
      buttonHTML = "";
  }
  return buttonHTML;
}

function cleanAndReplaceButtons(panelID, elementsList) {
  const buttonHTML = createButtonList(elementsList);
  const choices = choicesPanelsArray[panelID].querySelector(".choices");
  choices.innerHTML = "";
  choices.innerHTML = buttonHTML;

  const buttons = choices.querySelectorAll(".btn-selection");
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
}

function handleButtonClick(event) {
  const selectedButton = event.target;
  const selectedChoice = selectedButton.textContent;

  // Highlight the selected button
  highlightButton(selectedButton);

  // Update the corresponding choice variable based on the visible panel
  switch (vissiblePanel) {
    case 1:
      activityChoice = selectedChoice;
      break;
    case 2:
      foodChoice = selectedChoice;
      break;
    case 3:
      drinkChoice = selectedChoice;
      break;
  }
  console.log(activityChoice, foodChoice, drinkChoice);
}

function highlightButton(button) {
  const buttons = button.parentElement.querySelectorAll(".btn-selection");
  buttons.forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");
}

// function to show one element and hide others
function showOnlyOne(showID) {
  // Make the specified element visible
  choicesPanelsArray[showID].style.display = "block";

  vissiblePanel = showID;

  // Hide the other elements
  choicesPanelsArray.forEach((element) => {
    if (element !== choicesPanelsArray[showID]) {
      element.style.display = "none";
    }
  });
}

// function to show next element
function showNextPannel() {
  vissiblePanel++;
  if (vissiblePanel > choicesPanelsArray.length - 1) {
    vissiblePanel = 0;
  }
  showOnlyOne(vissiblePanel);
}

acceptModalButton.addEventListener("click", () => {
  console.log("acceptModalFunction called!");
  showNextPannel();
  createButtonHTML(vissiblePanel);
});
