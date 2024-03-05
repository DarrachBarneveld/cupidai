import { createContext, useState } from "react";
import { fetchAIRecommendations } from "../lib/api";
import useLocationStorage from "../hooks/useLocationStorage";

export const DEFAULT_CHOICE = {
  activity: [],
  food: [],
  drinks: [],
};

export const ChoiceContext = createContext({
  choices: DEFAULT_CHOICE,
  setChoices: () => {},
  handleSelectedChoice: () => {},
  getAIRecommendations: async () => {},
  recommendations: [],
  setRecommendations: () => {},
});

export default function ChoiceContextProvider({ children }) {
  const [recommendations, setRecommendations] =
    useLocationStorage("recommendations");
  const [localChoices, setLocalChoices] = useLocationStorage("choices");
  const [choices, setChoices] = useLocationStorage("choices");

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

    let promptString = `Based on my interests in drinks such as ${drinkString}, foods such as ${foodString} and activities such as ${activityString} could you suggest 6 varied date ideas? Include things that are similar to my interests options by modelling on my perceived personality type. Please provide recommendations in the format of an array of objects, with each object of this structure {
        "recommendation": recommendation,
        "drink": drink,
        "food": food,
        "activity": activity keywords
      },
      containing a recommendation that is 3 sentences long, along with associated drink keyword, food keyword, and activity keywords.`;

    try {
      const results = await fetchAIRecommendations(promptString);

      setRecommendations(results);
      return results;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const value = {
    choices,
    setChoices,
    handleSelectedChoice,
    getAIRecommendations,
    recommendations,
    localChoices,
    setLocalChoices,
  };

  return (
    <ChoiceContext.Provider value={value}>{children}</ChoiceContext.Provider>
  );
}
