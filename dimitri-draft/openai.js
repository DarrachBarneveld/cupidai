/* Code borrowed from https://medium.com/@nitin_26346/using-chatgpt-api-with-event-streaming-in-javascript-b8d719c58195 */

async function startChat() {
  let message = $("#message").val();

  let messages = sessionStorage.getItem("bot-message");
  if (messages == null) {
    messages = [
      {
        role: "system",
        content: "You are ChatGPT, a large language model trained by OpenAI.",
      },
    ];
  } else {
    messages = JSON.parse(messages);
  }
  messages.push({ role: "user", content: message });

  var res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
    }),
  });

  const data = await res.json();
  json_data = JSON.stringify(data);
  console.log(data);
  document.getElementById("demo").innerHTML = data.choices[0].message.content;
}

async function submitQueries() {
  var age = document.getElementById("age").value;
  var interests = document.getElementById("interests").value;
  var location = document.getElementById("location").value;
  var drinks = document.getElementById("drinks").value;
  var foods = document.getElementById("foods").value;
  console.log(sessionStorage.getItem("bot-message"));

  const number_of_options = 5;

  await submitActivities();
  await submitDrinks();
  await submitFoods();

  async function submitActivities() {
    let message =
      "where can a person of  " +
      age +
      " years of age, with following interests: " +
      interests +
      "  go out in the city? Assume that they live in " +
      location +
      " Give me " +
      number_of_options +
      " options, please. Respond in html ordered list format.";

    // Create a string to store the class name of the slides for activities
    const slideClassName = "activity-slides";
    var res = await callOpenAI(message);

    const data = await res.json();
    json_data = JSON.stringify(data);
    console.log(data);

    var options = getOptionsArray(data.choices[0].message.content);

    let titles = document.getElementsByClassName("activity-title");
    for (let i = 0, k = 0; i < options.length; i += 2, k++) {
      titles[k].innerHTML = options[i];
    }

    let descriptions = document.getElementsByClassName("activity-description");
    for (let i = 1, k = 0; i < options.length; i += 2, k++) {
      descriptions[k].innerHTML = options[i];
    }

    // Show the slides for activities
    currentSlide(slideClassName, 1);
  }

  async function submitDrinks() {
    let message =
      "Which drinks do you recommend? They like " +
      drinks +
      " Give me " +
      number_of_options +
      " options, please. Respond in html ordered list format.";

    // Create a string to store the class name of the slides for drinks
    const slideClassName = "drink-slides";

    var res = await callOpenAI(message);

    const data = await res.json();
    console.log(data);

    json_data = JSON.stringify(data);

    var options = getOptionsArray(data.choices[0].message.content);

    let titles = document.getElementsByClassName("drink-title");
    for (let i = 0, k = 0; i < options.length; i += 2, k++) {
      titles[k].innerHTML = options[i];
    }

    let descriptions = document.getElementsByClassName("drink-description");
    for (let i = 1, k = 0; i < options.length; i += 2, k++) {
      descriptions[k].innerHTML = options[i];
    }

    // Show the slides for drinks
    currentSlide(slideClassName, 1);
  }

  async function submitFoods() {
    let message =
      "Which foods do you recommend? They like " +
      foods +
      " Give me " +
      number_of_options +
      " options. Respond in html ordered list format. ";

    // Create a string to store the class name of the food-slides
    const slideClassName = "food-slides";

    var res = await callOpenAI(message);

    const data = await res.json();
    json_data = JSON.stringify(data);

    console.log(data);

    var options = getOptionsArray(data.choices[0].message.content);

    let titles = document.getElementsByClassName("food-title");
    for (let i = 0, k = 0; i < options.length; i += 2, k++) {
      titles[k].innerHTML = options[i];
    }

    let descriptions = document.getElementsByClassName("food-description");
    for (let i = 1, k = 0; i < options.length; i += 2, k++) {
      descriptions[k].innerHTML = options[i];
    }

    // Show the slides for foods
    currentSlide(slideClassName, 1);
  }

  function getOptionsArray(options) {
    /* Split the string into an array of options 
           Return an array of options with the headings and descriptions separated
           The array will be in the format [heading, description, heading, description, ...]
        */

    // Empty array to store the options
    var optionsArray = [];
    // Split the string by separate list items
    let first_split = options.split("<li>");
    // Loop through the array of list items
    for (let i = 1; i < first_split.length; i++) {
      let second_split = [];
      // IF the string contains a column, split it into two separate strings
      // The part separated by a colon is normally a heading
      if (first_split[i].includes(":") == true) {
        // If there is a heading separated by a colon, split the string into two separate strings
        second_split = first_split[i].split(":");
      } else {
        // Otherwise, create an empty string for the heading and use the entire string as the description
        second_split[0] = "";
        second_split[1] = first_split[i];
      }
      // Since the heading is in an ordered list, remove the number and period from the heading
      let heading = second_split[0].replace(`${i}.`, "");
      // Add the heading to the array
      optionsArray.push(heading);
      // Create an empty variable for the description
      let description = null;
      // If the string contains a list item closing tag, truncate the string at the end of the list item
      if (second_split[1].includes("</li>") == true) {
        let truncate_at = second_split[1].indexOf("</li>");
        description = second_split[1].substring(0, truncate_at);
      } else {
        // Otherwise strip the string of any html tags
        description = second_split[1].replace(/<\/?[^>]+(>|$)/g, "");
      }
      // Add the description to the array
      optionsArray.push(description);
    }

    return optionsArray;
  }
}

async function getLocationData() {
  const extractLocation = (data) => {
    /* Extract the location from the data */
    let location_data = [];
    let location = data;
    // Strip the curly braces from the string
    let location_stripped = location.replace("{", "").replace("}", "").trim();
    // Split the string by the comma to separate the settlement and country
    let location_array = location_stripped.split(",");
    // Split the filedname and the value by the colon
    let settlement = location_array[0].split(":");
    // Remove any quotation marks from the settlement
    settlement[1] = settlement[1].replace(/"/g, "");
    // Split the fieldname and the value by the colon
    let country = location_array[1].split(":");
    // Remove any quotation marks from the country
    country[1] = country[1].replace(/"/g, "");
    // Add the settlement and country to the location data array
    location_data.push(settlement[1]);
    location_data.push(country[1]);
    // Return the location data as an array of strings
    // 0 - settlement
    // 1 - country
    return location_data;
  };
  let { lat, lng } = await getCurrentLocationLatLng();

  let message = `where is it located  lat: ${lat} lng: ${lng}? Respond in JASON format with fields: settlement, country.`;

  // Call the OpenAI API with the message
  var res = await callOpenAI(message);

  // Get the response from the API
  const data = await res.json();
  // Convert the data to a JSON string
  json_data = JSON.stringify(data);
  // Extract the location from the data
  let location_details = extractLocation(data.choices[0].message.content);
  // Set the location field to the settlement and country
  document.getElementById(
    "location"
  ).value = `${location_details[0]}, ${location_details[1]}`;
}

async function callOpenAI(message) {
  /* Call the OpenAI API with the message and return the response */
  let messages = sessionStorage.getItem("bot-message");
  if (messages == null) {
    messages = [
      {
        role: "system",
        content: "You are ChatGPT, a large language model trained by OpenAI.",
      },
    ];
  } else {
    messages = JSON.parse(messages);
  }
  messages.push({ role: "user", content: message });

  console.log(messages);

  var res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      max_tokens: 300,
      temperature: 0.2,
      messages: messages,
    }),
  });

  console.log(res);
  return res;
}
/* Slide shows */
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(className, n) {
  showSlides(className, (slideIndex += n));
}

function currentSlide(className, n) {
  showSlides(className, (slideIndex = n));
}

function showSlides(className, n) {
  var i;
  var slides = document.getElementsByClassName(className);
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

// Geolocation ------------------------------------------------
// Converts location into lat.lng
async function getCurrentLocationLatLng() {
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
