import { createContext } from "react";
import useLocationStorage from "../hooks/useLocationStorage";

export const PlacesContext = createContext({
  places: [],
  setPlaces: () => {},
});

export default function PlacesContextProvider({ children }) {
  const [places, setPlaces] = useLocationStorage("places");

  const value = {
    setPlaces,
    places,
  };

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
}
