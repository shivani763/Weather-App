const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
  // Check if SpeechRecognition API is available
const micButton = document.getElementById("mic-btn");
const searchBox = document.querySelector(".search-box");

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Set recognition settings
  recognition.continuous = false;  // Stop listening after first result
  recognition.lang = "en-US";      // Set language to English

  // Start recognition when mic button is clicked
  micButton.addEventListener("click", () => {
    recognition.start();
    micButton.style.backgroundColor = "#ff5555"; // Indicate recording
  });

  // Capture speech result
  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    searchBox.value = spokenText; // Set input value to spoken text
    getResults(spokenText); // Fetch weather for the spoken city
  };

  // Handle errors or when user stops speaking
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    alert("Sorry, could not recognize your voice. Please try again.");
  };

  recognition.onend = () => {
    micButton.style.backgroundColor = ""; // Reset button color
  };
} else {
  alert("Speech recognition is not supported in this browser. Try using Google Chrome.");
}

}
