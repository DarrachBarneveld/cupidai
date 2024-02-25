export async function fetchAIRecommendations(prompt) {
  try {
    const response = await fetch(
      "https://cupiai-api-936b1019c6d5.herokuapp.com/api/ask-gpt",
      // "http://127.0.0.1:8000/api/ask-gpt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      }
    );

    const data = await response.json();

    const objectArray = JSON.parse(data.message);

    return objectArray;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchGooglePlaces(location, drink, food, activity) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/places", {
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
    console.error("Error fetching data:", error);
  }
}
