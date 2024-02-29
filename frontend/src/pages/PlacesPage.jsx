import { useContext } from "react";
import { PlacesContext } from "../context/PlacesContext";
import PlacesCard from "../components/PlacesCard";
import { NavLink } from "react-router-dom";
import HeadingText from "../components/ui/HeadingText";

const PlacesPage = () => {
  const { places } = useContext(PlacesContext);

  console.log(places);

  return (
    <main className="container mb-5 text-center">
      <HeadingText text="Places Near You" />
      <p className="lead text-center bg-dark-gradient text-white rounded-3 p-2">
        Explore these locations based on your date recommendation.
      </p>
      <NavLink className="btn btn-light" to="/recommendations">
        <i className="fa-solid fa-arrow-left"></i> Back
      </NavLink>

      <div className="row row-cols-2">
        {places.map((placeObject) => {
          const keys = Object.keys(placeObject);
          const randomKeyName = keys[0];
          const placesArray = placeObject[randomKeyName];

          return placesArray.map((place) => (
            <PlacesCard key={place.id} {...place} category={randomKeyName} />
          ));
        })}
      </div>
    </main>
  );
};

export default PlacesPage;
