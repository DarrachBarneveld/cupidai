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
    <li className="col-md-6 mt-4">
      <div className="shadow  pt-4 p-3 position-relative fade-in-bounce bg-light mt-2">
        <blockquote className="blockquote bg-white blockquote-custom">
          <div className="blockquote-custom-icon bg-info shadow-sm">
            <i className="fa fa-quote-left text-white"></i>
          </div>
          <p className="mb-0 mt-2 font-italic bg-light">{recommendation}</p>
        </blockquote>
        <div className="pt-2 mt-2 border-top">
          <div className="d-flex gap-1 my-1 flex-wrap">
            <span className="badge rounded-pill bg-dark text-capitalize">
              {food}
            </span>
            <span className="badge rounded-pill bg-dark text-capitalize">
              {drink}
            </span>
            <span className="badge rounded-pill bg-dark text-capitalize">
              {activity}
            </span>
          </div>
          {disabled ? (
            <button
              onClick={getGooglePlacesResults}
              className="mx-auto btn btn-danger mt-2"
            >
              <i className="fa-solid fa-map-location-dot"></i>
              <small> Find places! </small>
            </button>
          ) : (
            <button
              onClick={fetchLocation}
              className="mx-auto btn btn-danger mt-2"
            >
              <i className="fa-solid fa-location-crosshairs"></i>
              <small> Enable Location! </small>
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default RecommendationCard;
