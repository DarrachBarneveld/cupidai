import ChoiceButton from "../components/ui/ChoiceButton";
import { useContext, useEffect, useState } from "react";
import ActionButton from "../components/ui/ActionButton";

import ROOT_DATA from "../assets/data/preferences.json";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ChoiceContext } from "../context/ChoiceContext";
import { useNavigate } from "react-router-dom";

function getRandomElements(array, numberOfElements) {
  if (numberOfElements <= 0 || numberOfElements > array.length) {
    throw new Error("Invalid number of elements");
  }
  const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, numberOfElements);
}

const ChoicesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { choices, handleSelectedChoice, getAIRecommendations } =
    useContext(ChoiceContext);
  const [choiceCategory, setChoiceCategory] = useState(3);
  const [randomChoices, setRandomChoices] = useState([]);

  const categoryMapping = {
    3: "drinks",
    2: "food",
    1: "activity",
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

  console.log(choices);

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
      throw new Error("Error", error);
    }

    setLoading(false);
  }

  return (
    <>
      {" "}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {" "}
          <div className="container px-lg-5 mt-5">
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
                disabled={choices[categoryMapping[choiceCategory]]?.length == 0}
                icon={<i className="fa-solid fa-forward"></i>}
              />
            ) : (
              <ActionButton
                text="PLAN!"
                onClick={getRecommendations}
                disabled={choices[categoryMapping[choiceCategory]]?.length == 0}
                icon={<i className="fa-solid fa-heart"></i>}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ChoicesPage;
