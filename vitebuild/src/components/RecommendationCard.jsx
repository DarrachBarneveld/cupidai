import { useNavigate } from "react-router-dom";
import { PlacesContext } from "../context/PlacesContext";
import { fetchGooglePlaces } from "../lib/api";
import { useContext } from "react";

const RecommendationCard = ({
  recommendation,
  food,
  drink,
  activity,
  disabled,
  fetchLocation,
  location,
}) => {
  const navigate = useNavigate();
  const { setPlaces } = useContext(PlacesContext);

  async function getGooglePlacesResults() {
    const places = await fetchGooglePlaces(location, drink, food, activity);

    if (places) {
      setPlaces(places);
      navigate("/places");
    }
  }
  return (
    <li class="col-md-6 mt-4">
      <div class="shadow  pt-4 p-3 position-relative fade-in-bounce bg-light mt-2">
        <blockquote class="blockquote bg-white blockquote-custom">
          <div class="blockquote-custom-icon bg-info shadow-sm">
            <i class="fa fa-quote-left text-white"></i>
          </div>
          <p class="mb-0 mt-2 font-italic bg-light">{recommendation}</p>
        </blockquote>
        <div class="pt-2 mt-2 border-top">
          <div class="d-flex gap-1 my-1 flex-wrap">
            <span class="badge rounded-pill bg-dark text-capitalize">
              {food}
            </span>
            <span class="badge rounded-pill bg-dark text-capitalize">
              {drink}
            </span>
            <span class="badge rounded-pill bg-dark text-capitalize">
              {activity}
            </span>
          </div>
          {disabled ? (
            <button
              onClick={getGooglePlacesResults}
              class="mx-auto btn btn-danger mt-2"
            >
              <i class="fa-solid fa-map-location-dot"></i>
              <small> Find places! </small>
            </button>
          ) : (
            <button onClick={fetchLocation} class="mx-auto btn btn-danger mt-2">
              <i class="fa-solid fa-location-crosshairs"></i>
              <small> Enable Location! </small>
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default RecommendationCard;
