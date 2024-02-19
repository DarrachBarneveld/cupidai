import ROOT_DATA from "../data/preferences.json";
import foodPhoto from "../images/foods.png";
import activityPhoto from "../images/activity.png";

const choiceContainer = document.getElementById("choiceContainer");
const refreshBtn = document.getElementById("refreshBtn");
const nextBtn = document.getElementById("nextBtn");

const headingText = document.getElementById("headingText");
const choiceImage = document.getElementById("choiceImage");

let activity, food, drinks;

ROOT_DATA.forEach((element) => {
  activity = filterByCategoryId(ROOT_DATA, 1);
  food = filterByCategoryId(ROOT_DATA, 2);
  drinks = filterByCategoryId(ROOT_DATA, 3);
});

let CURRENT_OPTION = 1;
const selectedDrinks = [];
const selectedFood = [];
const selectedActivity = [];

function checkIfNullArray() {
  switch (CURRENT_OPTION) {
    case 1:
      nextBtn.disabled = selectedDrinks.length === 0;
      break;
    case 2:
      nextBtn.disabled = selectedFood.length === 0;
      break;
    case 3:
      nextBtn.disabled = selectedActivity.length === 0;
      break;
    default:
      nextBtn.disabled = selectedDrinks.length === 0;
      break;
  }
}
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
  buttonElement.classList.add("choice-btn", "text-wrap");
  buttonElement.textContent = choice.name;

  buttonElement.addEventListener("click", () => {
    buttonElement.classList.toggle("activeBtn");

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
    checkIfNullArray();
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
      headingText.textContent = "What Foods You Feeling?";
      choiceImage.src = foodPhoto;
      displayChoices(food);
      break;
    case 3:
      selectedActivity.splice(0, selectedActivity.length);
      headingText.textContent = "What Activities You Feeling?";
      choiceImage.src = activityPhoto;
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
    headingText.textContent = "What Foods You Feeling?";
    choiceImage.src = foodPhoto;
    displayChoices(food);
  } else {
    headingText.textContent = "What Activities You Feeling?";
    choiceImage.src = activityPhoto;
    displayChoices(activity);
  }
}

refreshBtn.addEventListener("click", refreshCurrentOptions);
nextBtn.addEventListener("click", showNextOptions);
