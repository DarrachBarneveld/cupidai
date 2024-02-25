import { createContext, useEffect, useState } from "react";
import { fetchAIRecommendations } from "../lib/api";
import DUMMY_RECOMMENDATIONS from "../assets/data/dummyAIResponse.json";
import useSessionStorage from "../hooks/useSessionStorage";

export const ChoiceContext = createContext({
  choices: {
    activity: [],
    food: [],
    drinks: [],
  },
  setChoices: () => {},
  handleSelectedChoice: () => {},
  getAIRecommendations: async () => {},
  recommendations: [],
  setRecommendations: () => {},
});

export default function ChoiceContextProvider({ children }) {
  const [recommendations, setRecommendations] =
    useSessionStorage("recommendations");
  const [choices, setChoices] = useState({
    activity: [],
    food: [],
    drinks: [],
  });

  function handleSelectedChoice(choice, choiceCategory) {
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

  async function getAIRecommendations() {
    const drinkString = choices.drinks.join(" ");
    const foodString = choices.food.join(" ");
    const activityString = choices.activity.join(" ");

    let promptString = `Based on my interests in drinks such as ${drinkString}, foods such as ${foodString} and activities such as ${activityString} could you suggest 6 varied activities, drinks, and foods? Please provide recommendations in the format of an array of objects, with each object of this structure {
        "recommendation": recommendation,
        "drink": drink,
        "food": food,
        "activity": activity keywords
      },
      containing a recommendation that is 3 sentences long, along with associated drink keyword, food keyword, and activity keywords.`;

    const results = await fetchAIRecommendations(promptString);
    setRecommendations(results);
    return results;
  }

  const value = {
    choices,
    setChoices,
    handleSelectedChoice,
    getAIRecommendations,
    recommendations,
  };

  return (
    <ChoiceContext.Provider value={value}>{children}</ChoiceContext.Provider>
  );
}
