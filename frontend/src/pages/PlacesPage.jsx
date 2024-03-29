import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlacesContext } from "../context/PlacesContext";
import PlacesCard from "../components/PlacesCard";
import { NavLink, useNavigate } from "react-router-dom";
import HeadingText from "../components/ui/HeadingText";
import { shuffleArray } from "../lib/utils";
import { staggeredFadeUp } from "../animations/variants";
import MainWrapper from "../layout/MainWrapper";
import PlacesMap from "../components/PlacesMap";

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
  const navigate = useNavigate();
  const { places, locationCoords, fetchCoordinates } =
    useContext(PlacesContext);
  const [placesArray, setPlacesArray] = useState([]);
  const [shuffledArray, setShuffledArray] = useState([]);
  const { drink, food, activity } = extractArrays(places);
  const [mapInView, setMapInView] = useState(false);

  useEffect(() => {
    if (!places || places.length === 0) {
      return navigate("/recommendations");
    }

    const shuffledArray = shuffleArray([...drink, ...food, ...activity]);

    fetchCoordinates();

    setPlacesArray(getNextAmount(shuffledArray, 0, 8));
    setShuffledArray(shuffledArray);
  }, [drink, food, activity, places]);

  return (
    <MainWrapper>
      <div className="container">
        <HeadingText
          text="Places Near You"
          subtext="Explore these locations based on your date recommendation."
        />
        <div className="d-flex justify-content-around mb-2 gap-2 position-relative">
          <NavLink className="btn btn-light" to="/recommendations">
            <i className="fa-solid fa-arrow-left"></i> Back
          </NavLink>
          {locationCoords ? (
            <button
              className="btn btn-light"
              onClick={() => setMapInView((prev) => !prev)}
            >
              <i className="fa-solid fa-map"></i> {mapInView ? "Hide" : "View"}
              Map
            </button>
          ) : (
            <button onClick={fetchCoordinates} className="btn btn-light">
              <i className="fa-solid fa-location-crosshairs me-1"></i>
              Enable Location
            </button>
          )}
        </div>
        {mapInView ? (
          <PlacesMap
            setMapInView={setMapInView}
            placesArray={placesArray}
            locationCoords={locationCoords}
          />
        ) : (
          <>
            {placesArray.length > 0 && (
              <div className="row row-cols-2">
                {placesArray.map((place, i) => {
                  const index = i + 8 - placesArray.length;
                  return (
                    <motion.div
                      key={`${place.id} ${i}`}
                      variants={staggeredFadeUp}
                      className="col-md-3 p-1"
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
          </>
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
    </MainWrapper>
  );
};

export default PlacesPage;
