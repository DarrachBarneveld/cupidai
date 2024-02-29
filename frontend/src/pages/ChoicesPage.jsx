import ChoiceButton from "../components/ui/ChoiceButton";
import { useContext, useEffect, useState } from "react";
import ActionButton from "../components/ui/ActionButton";

import ROOT_DATA from "../assets/data/preferences.json";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ChoiceContext } from "../context/ChoiceContext";
import { useNavigate } from "react-router-dom";
import HeadingText from "../components/ui/HeadingText";

import drinksImage from "../../public/images/drinks.png";
import foodImage from "../../public/images/foods.png";
import activityImage from "../../public/images/activity.png";
import { getRandomElements } from "../lib/utils";
import ErrorMessage from "../components/ui/ErrorMessage";

const ChoicesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { choices, handleSelectedChoice, getAIRecommendations } =
    useContext(ChoiceContext);
  const [choiceCategory, setChoiceCategory] = useState(3);
  const [randomChoices, setRandomChoices] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const categoryMapping = {
    3: {
      category: "drinks",
      image: drinksImage,
      headline: "Choose Your Drinks",
    },
    2: {
      category: "food",
      image: foodImage,
      headline: "Choose Your Foods",
    },
    1: {
      category: "activity",
      image: activityImage,
      headline: "Choose Your Activities",
    },
  };

  function setRandomOptions() {
    const randomSelections = getRandomElements(
      ROOT_DATA.filter((element) => {
        return element.categoryId === choiceCategory;
      }),
      6
    );

    setRandomChoices(randomSelections);
  }

  useEffect(() => {
    setRandomOptions();
  }, [choiceCategory]);

  async function getRecommendations() {
    try {
      setLoading(true);
      const result = await getAIRecommendations();

      if (result) {
        navigate(
          `/recommendations/${choices.drinks.join(" ")}/${choices.food.join(
            " "
          )}/${choices.activity.join(" ")}`
        );
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }

    setLoading(false);
  }

  return (
    <main className="py-5 bg-pink-gradient px-1">
      <div className="container">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <div className="icon-container glassmorphism text-center mt-5">
              <img
                src={categoryMapping[choiceCategory].image}
                alt="Image icon"
              />
            </div>
            <HeadingText text={categoryMapping[choiceCategory].headline} />
            <p className="lead text-center bg-dark-gradient text-white rounded-3 p-2">
              Choose a few options if you wish
            </p>
            <div id="choiceContainer" className="row row-cols-2 gy-4">
              {randomChoices.map((choice) => (
                <ChoiceButton
                  key={choice.id}
                  text={choice.name}
                  onClick={() =>
                    handleSelectedChoice(choice.name + ",", choiceCategory)
                  }
                />
              ))}
            </div>
            <div className="d-flex my-4 gap-3 justify-content-center align-items-center">
              <ActionButton
                text="REFRESH"
                onClick={setRandomOptions}
                icon={<i className="fa-solid fa-arrows-rotate"></i>}
              />
              {choiceCategory > 1 ? (
                <ActionButton
                  text="NEXT"
                  onClick={() => setChoiceCategory((prev) => prev - 1)}
                  disabled={
                    choices[categoryMapping[choiceCategory].category]?.length ==
                    0
                  }
                  icon={<i className="fa-solid fa-forward"></i>}
                />
              ) : (
                <ActionButton
                  text="PLAN!"
                  onClick={getRecommendations}
                  disabled={
                    choices[categoryMapping[choiceCategory].category]?.length ==
                    0
                  }
                  icon={<i className="fa-solid fa-heart"></i>}
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ChoicesPage;
