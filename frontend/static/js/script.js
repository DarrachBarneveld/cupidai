const drinkForm = document.getElementById("drinkForm");
const foodForm = document.getElementById("foodForm");
const activityForm = document.getElementById("activityForm");
const promptBtn = document.getElementById("promptBtn");

const selectedDrinks = [];
const selectedFood = [];
const selectedActivity = [];

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

  var url = "results.html?prompt=" + encodeURIComponent(interests);
  window.location.href = url;
}

promptBtn.addEventListener("click", generateRandomPrompt);

drinkForm.addEventListener("submit", setSelectedDrinks);

foodForm.addEventListener("submit", setSelectedFood);

activityForm.addEventListener("submit", setSelectedActivity);
