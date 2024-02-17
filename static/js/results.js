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

function createPlaceCard(place) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("col-md-3");

  const isOpen = place?.regularOpeningHours?.openNow;

  const photo = place.photos[0];
  const cardHtml = `  <div class="card-sl bg-white fade-in-bounce">
  <div class="card-image">
    <img
      src="https://places.googleapis.com/v1/${
        photo.name
      }/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAQD37gEBZUU9QFrndU9QxukjhQ3t8qRWU"
    />
  </div>

  <div class="card-heading">${place.displayName.text}</div>

  <div class="d-flex align-items-center justify-content-center p-0">
    <p class="card-text fw-bold m-0 text-dark">
      <i class="fa-solid fa-star text-warning"></i> ${place.rating}
    </p>
    <p class="card-text fw-bold m-0 text-dark">
      <i class="fa-solid fa-user text-info"></i> ${place.userRatingCount}
    </p>

    <p class="card-text ${isOpen ? "text-success" : "text-danger"} fw-bold">
      <i class="fa-solid fa-door-open"></i> ${isOpen ? "Open" : "Closed"}
    </p>
  </div>
  <a
    href="${place.googleMapsUri}"
    target="_blank"
  >
    <address class="card-address">
      ${place.formattedAddress}
    </address>
  </a>

  <a
    href="${place.websiteUri}"
    target="_blank"
    class="card-button"
    >Website</a
  >
</div>`;

  columnElement.innerHTML = cardHtml;

  resultsContainerElement.appendChild(columnElement);
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

    const { places } = await response.json();
    console.log(places);

    if (places.length === 0) {
      console.log("No places found");
      return;
    } else {
      resultsContainerElement.innerHTML = "";

      places.forEach((place) => createPlaceCard(place));
    }

    console.log("Places:", places);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
