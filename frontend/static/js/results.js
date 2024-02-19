import DUMMY_AI_RESPONSE from "../data/dummyAIResponse.json";
import { getCurrentLocationLatLng } from "./geolocation";
import { quotes } from "../data/quotes.json";
import { getRandomElements } from "./utils";

const resultsContainerElement = document.getElementById("resultsContainer");
const refreshBtn = document.getElementById("refreshBtn");
const carouselInner = document.querySelector(".carousel-inner");

let LOCATION;

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const interests = urlParams.get("prompt");

  const randomQuotes = getRandomElements(quotes, 3);

  randomQuotes.forEach((quote, i) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (i === 0) {
      carouselItem.classList.add("active");
    }

    carouselItem.innerHTML = `
    <p>
  ${quote}
    </p>
    `;
    carouselInner.appendChild(carouselItem);
  });

  let promptString = `Based on my interests like ${interests} could you suggest 6 varied activities, drinks, and foods? Please provide recommendations in the format of an array of objects, with each object of this structure {
    "recommendation": recommendation,
    "drink": drink,
    "food": food,
    "activity": activity keywords
  },
  containing a recommendation that is 3 sentences long, along with associated drink keyword, food keyword, and activity keywords.`;

  if (interests) {
    const array = await getAIRecommendations(promptString);
    console.log(array);
    if (array.length === 0 || !array) {
      DUMMY_AI_RESPONSE.forEach((result) => createResultsCard(result));
      loadingModal.style.display = "none";
      refreshBtn.classList.remove("hidden");
      return;
    }

    loadingModal.style.display = "none";
    refreshBtn.classList.remove("hidden");
    array.forEach((result) => createResultsCard(result));

    LOCATION = await getCurrentLocationLatLng();

    return;
  }
  loadingModal.style.display = "none";
  refreshBtn.classList.remove("hidden");

  DUMMY_AI_RESPONSE.forEach((result) => createResultsCard(result));
  LOCATION = await getCurrentLocationLatLng();
});

function createResultsCard(result) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("col-md-6", "mt-4");

  const cardhtml = `
    <div class="shadow  pt-4 p-3 position-relative fade-in-bounce bg-light mt-2">
      <blockquote class="blockquote bg-white blockquote-custom">
        <div class="blockquote-custom-icon bg-info shadow-sm">
          <i class="fa fa-quote-left text-white"></i>
        </div>
        <p class="mb-0 mt-2 font-italic bg-light">
          ${result.recommendation}
        </p>
      </blockquote>
      <div class="pt-2 mt-2 border-top">
        <div class="d-flex gap-1 my-1 flex-wrap">
          <span class="badge rounded-pill bg-dark text-capitalize">${result.food}</span>
          <span class="badge rounded-pill bg-dark text-capitalize">${result.drink}</span>
          <span class="badge rounded-pill bg-dark text-capitalize">${result.activity}</span>
        </div>
        <button id="findPlaces" class="mx-auto btn btn-danger mt-2">
          <i class="fa-solid fa-map-location-dot"></i> <small> Find places! </small>
        </button>
      </div>
    </div>
    `;
  columnElement.innerHTML = cardhtml;

  resultsContainerElement.appendChild(columnElement);

  const cardButton = columnElement.querySelector("#findPlaces");
  cardButton.addEventListener("click", async (e) => {
    e.target.textContent = "Loading...";

    if (!LOCATION) {
      const { lat, lng } = await getCurrentLocationLatLng();
      LOCATION = { lat, lng };
    }

    getGooglePlaces(e, LOCATION, result.drink, result.food, result.activity);
  });
}

function createPlaceCard(place) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("col-md-3");

  const isOpen = place?.regularOpeningHours?.openNow;

  const photo = place?.photos[0];
  const cardHtml = `  <div class="card-sl bg-white fade-in-bounce">
  <div class="card-image">
    <img
      src="https://places.googleapis.com/v1/${
        photo.name
      }/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAQD37gEBZUU9QFrndU9QxukjhQ3t8qRWU"
    />
  </div>

  <div class="card-heading">${place?.displayName?.text}</div>

  <div class="d-flex align-items-center justify-content-center p-0">
    <p class="card-text fw-bold m-0 text-dark">
      <i class="fa-solid fa-star text-warning"></i> ${place?.rating}
    </p>
    <p class="card-text fw-bold m-0 text-dark">
      <i class="fa-solid fa-user text-info"></i> ${place.userRatingCount}
    </p>

    <p class="card-text ${isOpen ? "text-success" : "text-danger"} fw-bold">
      <i class="fa-solid fa-door-open"></i> ${isOpen ? "Open" : "Closed"}
    </p>
  </div>
  <a
    href="${place?.googleMapsUri}"
    target="_blank"
  >
    <address class="card-address">
      ${place?.formattedAddress}
    </address>
  </a>

  <a
    href="${place?.websiteUri}"
    target="_blank"
    class="card-button"
    >Website</a
  >
</div>`;

  columnElement.innerHTML = cardHtml;

  resultsContainerElement.appendChild(columnElement);
}

async function getGooglePlaces(e, location, drink, food, activity) {
  console.log(location);
  const text = `${drink} ${food} ${activity}`;

  try {
    const response = await fetch(
      "https://cupiai-api-936b1019c6d5.herokuapp.com/api/places",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
          text,
        }),
      }
    );

    const { places } = await response.json();

    e.target.textContent = "Find places!";

    if (!places) {
      alert("No places found");
      return;
    }

    if (places) {
      if (places.length === 0) {
        alert("No places found");
        return;
      }
    }

    console.log("Places:", places);

    resultsContainerElement.innerHTML = "";

    places.forEach((place) => createPlaceCard(place));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getAIRecommendations(prompt) {
  try {
    const response = await fetch(
      "https://cupiai-api-936b1019c6d5.herokuapp.com/api/ask-gpt",
      // "http://127.0.0.1:8000/api/ask-gpt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      }
    );

    console.log(response);

    const data = await response.json();

    console.log(data);
    const objectArray = JSON.parse(data.message);

    console.log(objectArray);

    return objectArray;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

refreshBtn.addEventListener("click", () => window.location.reload());
