import OpenAI from "openai";
import { getCurrentLocationLatLng } from "./geolocation";

const drinkForm = document.getElementById("drinkForm");
const foodForm = document.getElementById("foodForm");
const activityForm = document.getElementById("activityForm");
const promptBtn = document.getElementById("promptBtn");
const geolocationBtn = document.getElementById("geolocationBtn");
const placesBtn = document.getElementById("placesBtn");

const aiPrompt = document.getElementById("aiPrompt");
const locationElement = document.getElementById("location");

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

  let prompt = `I like all of the following: ${drinkString}, ${foodString}, and ${activityString}, create a fun random activity for me and my partner with this information in 125 words or less. Display in a list`;

  console.log("Location:", location);

  if (location) {
    prompt += `I am currently at coordinates: ${location.lat}, ${location.lng}`;
    getGooglePlaces(location);
  }

  askgpt(prompt);
}

async function findMe() {
  const result = await getCurrentLocationLatLng();

  location = result;

  locationElement.innerHTML = `Location: ${result.lat}, ${result.lng}`;

  console.log("Location:", result);
}

drinkForm.addEventListener("submit", setSelectedDrinks);

foodForm.addEventListener("submit", setSelectedFood);

activityForm.addEventListener("submit", setSelectedActivity);

promptBtn.addEventListener("click", generateRandomPrompt);

geolocationBtn.addEventListener("click", findMe);

const openai = new OpenAI({
  apiKey: APIKEYTOTAL,
  dangerouslyAllowBrowser: true,
});

async function askgpt(prompt) {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      stream: true,
      max_tokens: 200,
    });
    let string = "";

    for await (const chunk of stream) {
      string += chunk.choices[0]?.delta?.content || "";
      aiPrompt.textContent = string;
    }
  } catch (error) {
    console.error(error);
  }
}

placesBtn.addEventListener("click", getGooglePlaces);

async function getGooglePlaces(location) {
  try {
    const response = await fetch("http://localhost:8000/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat: 53.3546667, lng: -6.2616667, text: "pub" }),
    });

    const data = await response.json();

    console.log("Places:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
