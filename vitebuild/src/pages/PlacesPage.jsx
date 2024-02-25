import { useContext } from "react";
import { PlacesContext } from "../context/PlacesContext";
import PlacesCard from "../components/PlacesCard";

const PlacesPage = () => {
  const { places } = useContext(PlacesContext);

  console.log(places);
  return (
    <div id="choiceContainer" className="row row-cols-2 gy-4">
      {places.map((place) => (
        <PlacesCard key={place.id} {...place} />
      ))}
    </div>
  );
};

export default PlacesPage;
