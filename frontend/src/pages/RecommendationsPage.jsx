import { useContext, useEffect, useState } from "react";
import { ChoiceContext } from "../context/ChoiceContext";
import RecommendationCard from "../components/RecommendationCard";
import { getCurrentLocationLatLng } from "../lib/geolocation";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import HeadingText from "../components/ui/HeadingText";
import ErrorMessage from "../components/ui/ErrorMessage";
import MainWrapper from "../layout/MainWrapper";

import drinksImage from "../../public/images/drinks.png";
import foodImage from "../../public/images/foods.png";
import activityImage from "../../public/images/activity.png";
import { PlacesContext } from "../context/PlacesContext";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { recommendations, choices, getAIRecommendations } =
    useContext(ChoiceContext);
  const { places } = useContext(PlacesContext);
  const fetchCoordinates = async () => {
    const currentLocation = await getCurrentLocationLatLng();
    setLocation(currentLocation);
  };

  useEffect(() => {
    if (!recommendations || recommendations.length === 0) {
      return navigate("/choices");
    }
    fetchCoordinates();
  }, [recommendations, navigate]);

  async function refreshCurrentOptions() {
    setLoading(true);
    await getAIRecommendations();
    setLoading(false);
  }

  return (
    <MainWrapper>
      {recommendations.length > 0 && (
        <div className="container">
          <HeadingText text="Recommendations" subtext="Based on your choices" />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-column">
              <header>
                <ul className="d-flex list-unstyled gap-2 justify-content-center flex-wrap">
                  <li>
                    <div className="d-flex align-items-center gap-1 border border-white w-fit px-2 rounded-3 glassmorphism">
                      <img
                        src={drinksImage}
                        alt="drinks"
                        className="choice-image glassmorphism border border-2"
                      />
                      {choices.drinks.map((choice, index) => (
                        <span
                          key={index + choice}
                          className="badge rounded-pill bg-success text-capitalize"
                        >
                          {choice}
                        </span>
                      ))}
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-1 border border-white w-fit px-2 rounded-3 glassmorphism">
                      <img
                        src={foodImage}
                        alt="food"
                        className="choice-image glassmorphism border border-2"
                      />
                      {choices.food.map((choice, index) => (
                        <span
                          key={index + choice}
                          className="badge rounded-pill bg-danger text-capitalize"
                        >
                          {choice}
                        </span>
                      ))}
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-1 border border-white w-fit px-2 rounded-3 glassmorphism">
                      <img
                        src={activityImage}
                        alt="activity"
                        className="choice-image glassmorphism border border-2"
                      />
                      {choices.activity.map((choice, index) => (
                        <span
                          key={index + choice}
                          className="badge rounded-pill bg-primary text-capitalize"
                        >
                          {choice}
                        </span>
                      ))}
                    </div>
                  </li>
                </ul>
              </header>
              <div className="d-flex justify-content-around gap-2">
                <button
                  onClick={refreshCurrentOptions}
                  className="btn btn-light w-fit mx-auto"
                >
                  <i className="fa-solid fa-arrows-rotate"></i> Refresh Options
                </button>
                {places.length > 0 && (
                  <NavLink className="btn btn-light mb-2" to="/places">
                    <i className="fa-solid fa-map-location-dot"></i> View Places
                  </NavLink>
                )}
              </div>

              {errorMessage && <ErrorMessage message={errorMessage} />}
              <ul
                id="resultsContainer"
                className="row gx-2 gy-2 mt-2 text-start ps-0"
              >
                {recommendations.map((recommendation, index) => {
                  return (
                    <RecommendationCard
                      key={index}
                      index={index}
                      {...recommendation}
                      disabled={location}
                      fetchLocation={fetchCoordinates}
                      location={location}
                      setErrorMessage={setErrorMessage}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </MainWrapper>
  );
};

export default RecommendationsPage;
