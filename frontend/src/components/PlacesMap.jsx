import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { motion } from "framer-motion";

export const redMarker = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const greenMarker = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const blueMarker = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PlacesMap = ({ placesArray, locationCoords, setMapInView }) => {
  function PlacesMarker() {
    const map = useMap();

    return placesArray.map((place, index) => {
      const coords = [place.location.latitude, place.location.longitude];
      let icon = "";
      let color = "";

      if (place.category === "food") {
        icon = greenMarker;
        color = "text-success";
      } else if (place.category === "drink") {
        icon = redMarker;
        color = "text-danger";
      } else {
        icon = blueMarker;
        color = "text-primary";
      }

      return (
        <Marker
          key={index}
          icon={icon}
          position={coords}
          eventHandlers={{
            click: () => {
              map.flyTo(coords, 15);
            },
          }}
        >
          <Popup>
            <p
              className={`text-capitalize m-0 p-0 border-bottom mb-1 ${color}`}
            >
              {place.category}
            </p>
            <strong> {place.displayName?.text}</strong>
          </Popup>
        </Marker>
      );
    });
  }

  const displayMap = useMemo(
    () => (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeInOut" }}
      >
        <div onClick={() => setMapInView(false)} className="overlay"></div>
        <MapContainer
          className="map-container"
          center={locationCoords}
          zoom={13}
        >
          <div className="position-relative lose-icon-container">
            <button onClick={() => setMapInView(false)}>
              <i class="fa-solid fa-xmark close-icon"></i>
            </button>
          </div>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PlacesMarker />
        </MapContainer>
      </motion.div>
    ),
    []
  );

  return <div>{displayMap}</div>;
};

export default PlacesMap;
