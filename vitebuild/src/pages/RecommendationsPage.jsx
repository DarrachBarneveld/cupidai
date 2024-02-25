import { useContext } from "react";
import { ChoiceContext } from "../context/ChoiceContext";
import RecommendationCard from "../components/RecommendationCard";

const RecommendationsPage = () => {
  const { recommendations } = useContext(ChoiceContext);

  return (
    <div className="text-center">
      <h1 class="display-4">Recommendations</h1>
      <button id="refreshBtn" class="btn btn-light w-fit">
        <i class="fa-solid fa-arrows-rotate"></i> Refresh Options
      </button>
      <ul id="resultsContainer" class="row gx-2 gy-2 mt-2 text-start">
        {recommendations.map((recommendation, index) => {
          return <RecommendationCard key={index} {...recommendation} />;
        })}
      </ul>
    </div>
  );
};

export default RecommendationsPage;
