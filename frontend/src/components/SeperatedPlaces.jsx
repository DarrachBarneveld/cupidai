import { useContext, useEffect, useState } from "react";
import { extractArrays, getNextAmount } from "../pages/PlacesPage";
import { PlacesContext } from "../context/PlacesContext";

const SeperatedPlaces = () => {
  const { places } = useContext(PlacesContext);

  const [drinkArray, setDrinkArray] = useState();
  const [foodArray, setFoodArray] = useState();
  const [activityArray, setActivityArray] = useState();

  const { drink, food, activity } = extractArrays(places);

  useEffect(() => {
    setDrinkArray(getNextAmount(drink));
    setFoodArray(getNextAmount(food));
    setActivityArray(getNextAmount(activity));
  }, [drink, food, activity]);
  return (
    <>
      <div className="row row-cols-2">
        {drinkArray?.map((place) => (
          <PlacesCard
            key={place.id}
            {...place}
            category={"drink"}
            color="bg-danger"
          />
        ))}
        <button
          onClick={() => setDrinkArray(getNextAmount(drink, drinkArray.length))}
          className="btn btn-light mx-auto my-4"
        >
          Load More Drinks
        </button>
      </div>
      <div className="row row-cols-2">
        {foodArray?.map((place) => (
          <PlacesCard
            key={place.id}
            {...place}
            category={"food"}
            color="bg-success"
          />
        ))}
        <button
          onClick={() => setFoodArray(getNextAmount(food, foodArray.length))}
          className="btn btn-light mx-auto my-4"
        >
          Load More Food
        </button>
      </div>
      <div className="row row-cols-2">
        {activityArray?.map((place) => (
          <PlacesCard
            key={place.id}
            {...place}
            category={"activity"}
            color="bg-primary"
          />
        ))}
        <button
          onClick={() =>
            setActivityArray(getNextAmount(activity, activityArray.length))
          }
          className="btn btn-light mx-auto my-4"
        >
          Load More Activities
        </button>
      </div>
    </>
  );
};

export default SeperatedPlaces;
