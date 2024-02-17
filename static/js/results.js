import DUMMY_AI_RESPONSE from "../data/dummyAIResponse.json";

const resultsContainerElement = document.getElementById("resultsContainer");

document.addEventListener("DOMContentLoaded", function () {
  DUMMY_AI_RESPONSE.forEach((result) => createResultsCard(result));
});

function createResultsCard(result) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("col-md-6", "mt-4");

  const cardhtml = `
    <div class="shadow rounded pt-4 p-3 position-relative fade-in-bounce bg-light mt-2">
      <blockquote class="blockquote bg-white blockquote-custom">
        <div class="blockquote-custom-icon bg-info shadow-sm">
          <i class="fa fa-quote-left text-white"></i>
        </div>
        <p class="mb-0 mt-2 font-italic bg-light">
          ${result.text}
        </p>
      </blockquote>
      <div class="pt-2 mt-2 border-top">
        <div class="d-flex gap-1 my-1">
          <span class="badge rounded-pill bg-dark text-capitalize">${result.activity}</span>
          <span class="badge rounded-pill bg-dark text-capitalize">${result.drink}</span>
          <span class="badge rounded-pill bg-dark text-capitalize">${result.food}</span>
        </div>
        <p class="mb-1">
          <small class="text-primary">Help Me Plan!</small>
        </p>
        <button id="findPlaces" class="mx-auto btn btn-info">
          <i class="fa-solid fa-map-location-dot"></i> Find places!
        </button>
      </div>
    </div>`;

  columnElement.innerHTML = cardhtml;

  resultsContainerElement.appendChild(columnElement);

  const cardButton = columnElement.querySelector("#findPlaces");
  cardButton.addEventListener("click", () => {
    getGooglePlaces(
      { lat: 53.349805, lng: -6.26031 },
      result.drink,
      result.food,
      result.activity
    );
  });
}

async function getGooglePlaces(location, drink, food, activity) {
  const text = `${drink} ${food} ${activity}`;

  try {
    const response = await fetch("http://localhost:8000/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: location.lat,
        lng: location.lng,
        text,
      }),
    });

    const data = await response.json();

    console.log("Places:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
