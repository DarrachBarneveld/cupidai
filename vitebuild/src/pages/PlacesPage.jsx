import { useContext } from "react";
import { PlacesContext } from "../context/PlacesContext";
import PlacesCard from "../components/PlacesCard";
import { useNavigate } from "react-router-dom";

const PlacesPage = () => {
  const navigate = useNavigate();
  const { places } = useContext(PlacesContext);

  console.log(places);
  return (
    <div>
      <button onClick={() => navigate("/recommendations")}>Return</button>
      <div id="choiceContainer" className="row row-cols-2 gy-4">
        {places.map((place) => (
          <PlacesCard key={place.id} {...place} />
        ))}
      </div>
    </div>
  );
};

export default PlacesPage;
