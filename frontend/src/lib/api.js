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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();
    return JSON.parse(data.message);
  } catch (error) {
    throw new Error(error.message);
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    const places = await response.json();
    return places;
  } catch (error) {
    throw new Error(error.message);
  }
}
