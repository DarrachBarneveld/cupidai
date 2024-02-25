import { useContext, useEffect, useState } from "react";
import { ChoiceContext } from "../context/ChoiceContext";
import RecommendationCard from "../components/RecommendationCard";
import { getCurrentLocationLatLng } from "../lib/geolocation";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import HeadingText from "../components/ui/HeadingText";

function isEmptyObject(obj) {
  return Object.entries(obj).length === 0;
}
function hasEmptyArrays(obj) {
  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key].length > 0) {
      return false;
    }
  }
  return true;
}

const RecommendationsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { recommendations, setChoices, choices, getAIRecommendations } =
    useContext(ChoiceContext);

  const isParams = isEmptyObject(params);
  const isChoices = hasEmptyArrays(choices);

  const fetchCoordinates = async () => {
    const currentLocation = await getCurrentLocationLatLng();
    setLocation(currentLocation);
  };

  useEffect(() => {
    fetchCoordinates();
    if (!isParams && isChoices) {
      setChoices({
        drinks: params.drink.split(",").filter((item) => item.trim() !== ""),
        food: params.food.split(",").filter((item) => item.trim() !== ""),
        activity: params.activity
          .split(" ")
          .filter((item) => item.trim() !== ""),
      });
    }
  }, [isParams]);

  async function refreshCurrentOptions() {
    setLoading(true);
    await getAIRecommendations();
    setLoading(false);
  }

  return (
    <>
      <HeadingText text="Recommendations" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {isParams && isChoices ? (
            <button
              onClick={() => navigate("/")}
              className="btn btn-light w-fit"
            >
              <i className="fa-solid fa-arrows-rotate"></i> Reselect Choices
            </button>
          ) : (
            <button
              onClick={refreshCurrentOptions}
              className="btn btn-light w-fit"
            >
              <i className="fa-solid fa-arrows-rotate"></i> Refresh Options
            </button>
          )}
          <ul
            id="resultsContainer"
            className="row gx-2 gy-2 mt-2 text-start ps-0"
          >
            {recommendations.map((recommendation, index) => {
              return (
                <RecommendationCard
                  key={index}
                  {...recommendation}
                  disabled={location}
                  fetchLocation={fetchCoordinates}
                  location={location}
                />
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default RecommendationsPage;
