import { createContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

export const PlacesContext = createContext({
  places: [],
  setPlaces: () => {},
});

export default function PlacesContextProvider({ children }) {
  const [places, setPlaces] = useSessionStorage("places");

  const value = {
    setPlaces,
    places,
  };

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
}
