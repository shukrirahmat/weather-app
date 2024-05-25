import getWeather from "./getWeather";

const locationInput = document.querySelector("#location");
const searchButton = document.querySelector(".searchbar button");
const resultBox = document.querySelector(".result");
const togglebtn = document.querySelectorAll(".togglebtn");

const addEvents = function addEvents() {
  searchButton.addEventListener("click", (event) => {
    getWeather(locationInput.value);
    event.preventDefault();
  });

  togglebtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("currentUnit")) {
        switchUnit();
      }
    })
  })
};

const switchUnit = function switchUnit() {
  togglebtn.forEach((btn) => {
    btn.classList.toggle("currentUnit");
  })
}

const displayWeatherResult = function displayWeatherResult(weather) {
  while (resultBox.firstChild) {
    resultBox.firstChild.remove();
  }

  const resultLocation = document.createElement("div");
  resultLocation.classList.add("resultlocation");
  resultLocation.textContent = `Location: ${weather.locationName}, ${weather.country}`;

  const temperature = document.createElement("div");
  temperature.classList.add("temperature");
  const temperatureText = document.createElement("p");
  temperatureText.textContent = `Temperature: ${weather.temp_c} °C`;
  const temperatureToggle = document.createElement("button");
  temperatureToggle.textContent = "CHANGE UNIT";
  temperatureToggle.addEventListener("click", () => {
    temperatureText.classList.toggle("in_f");
    if (temperatureText.classList.contains("in_f")) {
      temperatureText.textContent = `Temperature: ${weather.temp_f} °F`;
    } else {
      temperatureText.textContent = `Temperature: ${weather.temp_c} °C`;
    }
  });
  temperature.appendChild(temperatureText);
  temperature.appendChild(temperatureToggle);

  const condition = document.createElement("div");
  condition.classList.add("condition");
  const conditionText = document.createElement("p");
  conditionText.textContent = `Condition: ${weather.condition}`;
  const conditionImage = document.createElement("img");
  conditionImage.src = "";
  condition.appendChild(conditionText);
  condition.appendChild(conditionImage);

  resultBox.appendChild(resultLocation);
  resultBox.appendChild(temperature);
  resultBox.appendChild(condition);
};

const displayError = function displayError() {
  while (resultBox.firstChild) {
    resultBox.firstChild.remove();
  }
  const errorText = document.createElement('p');
  errorText.textContent = "Could not find the location";
  resultBox.appendChild(errorText);
};

const domLoad = function domLoad() {
  addEvents();
};

export { domLoad, displayWeatherResult, displayError};
