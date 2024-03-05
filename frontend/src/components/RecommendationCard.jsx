import { useNavigate } from "react-router-dom";
import { PlacesContext } from "../context/PlacesContext";
import { fetchGooglePlaces } from "../lib/api";
import { useContext, useState } from "react";
import { GooglePlacesApiResponse } from "../classes/GoogleApiResponse";

const RecommendationCard = ({
  recommendation,
  food,
  drink,
  activity,
  disabled,
  fetchLocation,
  location,
  setErrorMessage,
  index,
}) => {
  const navigate = useNavigate();
  const { setPlaces } = useContext(PlacesContext);
  const [loading, setLoading] = useState(false);

  async function getGooglePlacesResults() {
    try {
      setLoading(true);
      const places = await fetchGooglePlaces(location, drink, food, activity);

      if (places.length === 0) {
        alert("No places found. Please try again.");
        setLoading(false);
        return;
      }

      if (places) {
        setPlaces(places);

        setLoading(false);
        navigate("/places");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <li className="col-md-6 mt-4">
      <div className="shadow rounded-3 pt-4 p-3 position-relative fade-in-bounce bg-light mt-2">
        <blockquote className="blockquote bg-white blockquote-custom">
          <div className="blockquote-custom-icon bg-info shadow-sm">
            <i className="fa fa-quote-left text-white"></i>
            <span className="text-white ms-1">{index + 1}</span>
          </div>
          <p className="mb-0 mt-2 font-italic bg-light">{recommendation}</p>
        </blockquote>
        <div className="pt-2 mt-2 border-top">
          <div className="d-flex gap-1 my-1 flex-wrap">
            <span className="badge rounded-pill bg-dark text-capitalize">
              {food?.replace(/,/g, " -")}
            </span>
            <span className="badge rounded-pill bg-dark text-capitalize">
              {drink?.replace(/,/g, " -")}
            </span>
            <span className="badge rounded-pill bg-dark text-capitalize">
              {activity?.replace(/,/g, " -")}
            </span>
          </div>
          {disabled ? (
            <button
              onClick={getGooglePlacesResults}
              className="mx-auto btn btn-danger mt-2"
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <i className="fa-solid fa-map-location-dot"></i>
                  <small> Find places! </small>
                </>
              )}
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
