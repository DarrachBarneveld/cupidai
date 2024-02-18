// Converts location into lat.lng
export async function getCurrentLocationLatLng() {
  try {
    const position = await getCurrentLocation();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    return { lat, lng };
  } catch (error) {
    alert("Unable to find location - default to Dublin");
    return { lat: 53.34, lng: -6.26 };
  }
}

async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    } else {
      reject(new Error("Geolocation is not supported by the browser."));
    }
  });
}
