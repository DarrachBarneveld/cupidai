const drinkForm = document.getElementById("drinkForm");
const foodForm = document.getElementById("foodForm");
const activityForm = document.getElementById("activityForm");
const promptBtn = document.getElementById("promptBtn");

const APIKEY1 = "sk-xpy0IWg";
const APIKEY2 = "P8oWW2pPKz2hJT3BlbkF";
const APIKEY3 = "JPBP6CdnUnrAjPNqoxTCb";
const APIKEYTOTAL = APIKEY1 + APIKEY2 + APIKEY3;

const selectedDrinks = [];
const selectedFood = [];
const selectedActivity = [];

//
let location;

function checkIfAllFormsAreFilled() {
  if (
    selectedDrinks.length > 0 &&
    selectedFood.length > 0 &&
    selectedActivity.length > 0
  ) {
    promptBtn.disabled = false;
  }
}

function setSelectedDrinks(event) {
  event.preventDefault(); // Prevent form submission

  const checkboxes = document.querySelectorAll('input[name="drink"]:checked');

  checkboxes.forEach(function (checkbox) {
    selectedDrinks.push(checkbox.value);
  });

  console.log("Selected drinks:", selectedDrinks);
  checkIfAllFormsAreFilled();
}

function setSelectedFood(event) {
  event.preventDefault(); // Prevent form submission

  const checkboxes = document.querySelectorAll('input[name="food"]:checked');

  checkboxes.forEach(function (checkbox) {
    selectedFood.push(checkbox.value);
  });

  console.log("Selected Food:", selectedFood);
  checkIfAllFormsAreFilled();
}

function setSelectedActivity(event) {
  event.preventDefault(); // Prevent form submission

  const checkboxes = document.querySelectorAll(
    'input[name="activity"]:checked'
  );

  checkboxes.forEach(function (checkbox) {
    selectedActivity.push(checkbox.value);
  });

  console.log("Selected Activity:", selectedActivity);
  checkIfAllFormsAreFilled();
}

function generateRandomPrompt() {
  const drinkString = selectedDrinks.join(" ");
  const foodString = selectedFood.join(" ");
  const activityString = selectedActivity.join(" ");

  const interests = drinkString + foodString + activityString;

  let promptString = `Based on my interests like ${interests} could you suggest 10 varied activities, drinks, and foods? Please provide recommendations in the format of an array of objects, with each object containing a text recommendation, along with associated drink, food, and activity keywords.`;

  var url = "results.html?prompt=" + encodeURIComponent(promptString);
  window.location.href = url;
}

promptBtn.addEventListener("click", generateRandomPrompt);

drinkForm.addEventListener("submit", setSelectedDrinks);

foodForm.addEventListener("submit", setSelectedFood);

activityForm.addEventListener("submit", setSelectedActivity);
