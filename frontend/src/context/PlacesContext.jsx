import { createContext, useState } from "react";
import useLocationStorage from "../hooks/useLocationStorage";
import { getCurrentLocationLatLng } from "../lib/geolocation";

export const PlacesContext = createContext({
  places: [],
  locationCoords: [],
  setPlaces: () => {},
  setLocationCoords: () => {},
  fetchCoordinates: async () => {},
});

export default function PlacesContextProvider({ children }) {
  const [places, setPlaces] = useLocationStorage("places");
  const [locationCoords, setLocationCoords] = useState();

  const fetchCoordinates = async () => {
    const currentLocation = await getCurrentLocationLatLng();
    setLocationCoords(currentLocation);
  };

  const value = {
    locationCoords,
    setLocationCoords,
    setPlaces,
    places,
    fetchCoordinates,
  };

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
}
