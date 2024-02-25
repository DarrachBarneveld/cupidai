import { useContext, useEffect, useState } from "react";
import { ChoiceContext } from "../context/ChoiceContext";
import RecommendationCard from "../components/RecommendationCard";
import { getCurrentLocationLatLng } from "../lib/geolocation";

const RecommendationsPage = () => {
  const [location, setLocation] = useState(null);
  const { recommendations, choices } = useContext(ChoiceContext);

  const fetchCoordinates = async () => {
    const currentLocation = await getCurrentLocationLatLng();
    setLocation(currentLocation);
  };
  useEffect(() => {
    fetchCoordinates();
  }, []);

  return (
    <div className="text-center">
      <h1 className="display-4">Recommendations</h1>
      <button id="refreshBtn" className="btn btn-light w-fit">
        <i className="fa-solid fa-arrows-rotate"></i> Refresh Options
      </button>
      <ul id="resultsContainer" className="row gx-2 gy-2 mt-2 text-start">
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
    </div>
  );
};

export default RecommendationsPage;
