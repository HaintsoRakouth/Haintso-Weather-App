function formatDate(timestamp) {
  let date = new Date(timestamp);
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}
  function formatHours(timestamp) {
  let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
      return`${hours}:${minutes}`;
}

function displayTemperature(response){
  console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let conditionElement = document.querySelector("#condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

fahrenheitTemperature = response.data.main.temp;

temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
cityElement.innerHTML = response.data.name;
conditionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed / 1.609);
dateElement.innerHTML = formatDate(response.data.dt * 1000 +(response.data.timezone *1000));
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
iconElement.setAttribute("alt", response.data.weather[0].description);
}


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast= null;


  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
forecastElement.innerHTML += `
<div class="col-2">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
            <img
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            alt=""
            />
            <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
            </div>
        </div>
        `;
        } 
  }


function searchCity(city) {
  let apiKey = "3b86af7fc308a37a703e9fe00272cd4f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
  console.log(cityInputElement);
}

function searchLocation(position) {
let apiKey = "3b86af7fc308a37a703e9fe00272cd4f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) *(0.5556);
  // remove the active class from the fahrenheit link
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

//Submit via search bar
let Form = document.querySelector("#search-form");
Form.addEventListener("submit", handleSubmit);

//Displaying Celsius and Fahrenheit
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//Display Current Location and Default Location Palaiseau
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Palaiseau");
