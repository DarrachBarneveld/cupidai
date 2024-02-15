const OpenAI = require("openai");

const drinkForm = document.getElementById("drinkForm");
const foodForm = document.getElementById("foodForm");
const activityForm = document.getElementById("activityForm");
const promptBtn = document.getElementById("promptBtn");

const aiPrompt = document.getElementById("aiPrompt");

const APIKEY1 = "sk-xpy0IWg";
const APIKEY2 = "P8oWW2pPKz2hJT3BlbkF";
const APIKEY3 = "JPBP6CdnUnrAjPNqoxTCb";
const APIKEYTOTAL = APIKEY1 + APIKEY2 + APIKEY3;

let openai;

async function init() {
  openai = new OpenAI({
    apiKey: APIKEYTOTAL,
    dangerouslyAllowBrowser: true,
  });
}
init();

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

  const prompt = `I like all of the following: ${drinkString}, ${foodString}, and ${activityString}, create a fun random activity for me and my partner with this information in 125 words or less.`;

  askgpt(prompt);
}

drinkForm.addEventListener("submit", setSelectedDrinks);

foodForm.addEventListener("submit", setSelectedFood);

activityForm.addEventListener("submit", setSelectedActivity);

promptBtn.addEventListener("click", generateRandomPrompt);

async function askgpt(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIKEYTOTAL}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 200,
        temperature: 0.2,
      }),
    });

    const data = await response.json();

    console.log(data);

    const assistantReply = data.choices[0].message.content;

    aiPrompt.textContent = assistantReply;
  } catch (error) {
    console.error(error);
  }
}
