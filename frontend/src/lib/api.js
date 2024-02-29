const API_URL = import.meta.env.VITE_BASE_API_URL;

export async function fetchAIRecommendations(prompt) {
  try {
    const response = await fetch(`${API_URL}api/ask-gpt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    });

    const data = await response.json();

    const objectArray = JSON.parse(data.message);

    return objectArray;
  } catch (error) {
    throw new Error(`Error: ${error.message}`, error);
  }
}

export async function fetchGooglePlaces(location, drink, food, activity) {
  try {
    const response = await fetch(`${API_URL}api/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: location.lat,
        lng: location.lng,
        drink,
        food,
        activity,
      }),
    });

    const data = await response.json();

    if (!data) {
      alert("No places found");
      return;
    }

    if (data) {
      if (data.length === 0) {
        alert("No places found");
        return;
      }
    }

    return data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`, error);
  }
}
