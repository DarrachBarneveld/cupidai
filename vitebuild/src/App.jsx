import Navbar from "./components/Navbar";
import "./App.css";
import ChoiceButton from "./components/ui/ChoiceButton";
import { useEffect, useState } from "react";
import ActionButton from "./components/ui/ActionButton";

import ROOT_DATA from "./assets/data/preferences.json";

function getRandomElements(array, numberOfElements) {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, numberOfElements);
}

function App() {
  const [choiceCategory, setChoiceCategory] = useState(3);
  const [randomChoices, setRandomChoices] = useState([]);
  const [choices, setChoices] = useState({
    drinks: [],
    food: [],
    activity: [],
  });

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

  function handleSelectedChoice(choice) {
    if (choiceCategory === 3) {
      choices.drinks.includes(choice)
        ? setChoices((prev) => ({
            ...prev,
            drinks: prev.drinks.filter((item) => item !== choice),
          }))
        : setChoices((prev) => ({
            ...prev,
            drinks: [...prev.drinks, choice],
          }));
    }
    if (choiceCategory === 2) {
      choices.food.includes(choice)
        ? setChoices((prev) => ({
            ...prev,
            food: prev.food.filter((item) => item !== choice),
          }))
        : setChoices((prev) => ({
            ...prev,
            food: [...prev.food, choice],
          }));
    }
    if (choiceCategory === 1) {
      choices.activity.includes(choice)
        ? setChoices((prev) => ({
            ...prev,
            activity: prev.activity.filter((item) => item !== choice),
          }))
        : setChoices((prev) => ({
            ...prev,
            activity: [...prev.activity, choice],
          }));
    }
  }

  return (
    <div className="wrapper">
      <header>
        <Navbar />
      </header>

      <main>
        <div className="container px-lg-5 mt-5">
          <div id="choiceContainer" className="row row-cols-2 gy-4">
            {randomChoices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                text={choice.name}
                onClick={() => handleSelectedChoice(choice.name)}
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
          <ActionButton
            text="NEXT"
            onClick={() => setChoiceCategory((prev) => prev - 1)}
            disabled={choices[categoryMapping[choiceCategory]]?.length == 0}
            icon={<i className="fa-solid fa-forward"></i>}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
