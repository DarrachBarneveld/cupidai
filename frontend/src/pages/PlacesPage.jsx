import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlacesContext } from "../context/PlacesContext";
import PlacesCard from "../components/PlacesCard";
import { NavLink } from "react-router-dom";
import HeadingText from "../components/ui/HeadingText";
import { shuffleArray } from "../lib/utils";
import { staggeredFadeUp } from "../animations/variants";

export function extractArrays(arrayOfObjects) {
  const result = {};
  arrayOfObjects.forEach((obj) => {
    const [key, array] = Object.entries(obj)[0];
    result[key] = array;
  });
  return result;
}

export function getNextAmount(array, index = 0, step = 4) {
  const result = [];
  for (let i = 0; i < index + step && i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
}

const PlacesPage = () => {
  const { places } = useContext(PlacesContext);
  const [placesArray, setPlacesArray] = useState([]);
  const [shuffledArray, setShuffledArray] = useState([]);
  const { drink, food, activity } = extractArrays(places);

  useEffect(() => {
    const shuffledArray = shuffleArray([...drink, ...food, ...activity]);
    setPlacesArray(getNextAmount(shuffledArray, 0, 8));
    setShuffledArray(shuffledArray);
  }, [drink, food, activity]);

  return (
    <main className="py-5 bg-pink-gradient px-1">
      <div className="container">
        <HeadingText text="Places Near You" />
        <p className="lead text-center bg-dark-gradient text-white rounded-3 p-2">
          Explore these locations based on your date recommendation.
        </p>
        <NavLink className="btn btn-light" to="/recommendations">
          <i className="fa-solid fa-arrow-left"></i> Back
        </NavLink>

        {placesArray.length > 0 && (
          <div className="row row-cols-2">
            {placesArray.map((place, i) => {
              const index = i + 8 - placesArray.length;
              return (
                <motion.div
                  key={place.id}
                  variants={staggeredFadeUp}
                  className="col-md-3 p-2"
                  initial="initial"
                  animate="animate"
                  custom={index}
                >
                  <PlacesCard {...place} category={place.category} />
                </motion.div>
              );
            })}
          </div>
        )}

        <button
          onClick={() =>
            setPlacesArray(getNextAmount(shuffledArray, placesArray.length, 4))
          }
          className="btn btn-light mx-auto my-4"
        >
          Load More Activities
        </button>
      </div>
    </main>
  );
};

export default PlacesPage;
