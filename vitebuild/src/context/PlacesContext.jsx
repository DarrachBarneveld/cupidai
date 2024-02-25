import { createContext, useState } from "react";

export const PlacesContext = createContext({
  places: [],
  setPlaces: () => {},
});

export default function PlacesContextProvider({ children }) {
  const [places, setPlaces] = useState([]);

  const value = {
    setPlaces,
    places,
  };

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
}
