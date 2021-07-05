new Date();
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHours = now.getHours();
let currentMinutes = now.getMinutes();
let p = document.querySelector("p");
p.innerHTML = `📆 It is ${currentDay}, ${currentHours}:${currentMinutes} `;

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
}
function search(city) {
  let apiKey = "e32e276f7fbc10da2ad0ce3f431a1ad1";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "e32e276f7fbc10da2ad0ce3f431a1ad1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToFahrenheit(events) {
  events.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToCelsius(events) {
  events.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(
    ((celsiusTemperature - 32) * 5) / 9
  );
}
search("Brussels");
let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition);
