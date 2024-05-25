import getWeather from "./getWeather";

const locationInput = document.querySelector("#location");
const searchButton = document.querySelector(".searchbar button");
const resultBox = document.querySelector(".result");
const togglebtn = document.querySelectorAll(".togglebtn");

const addEvents = function addEvents() {
  searchButton.addEventListener("click", (event) => {
    displayWait();
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
  const temperature = document.querySelectorAll(".temperature");

  togglebtn.forEach((btn) => {
    btn.classList.toggle("currentUnit");
  })
  temperature.forEach((node) => {
    node.classList.toggle("show");
  })
}

const displayWeatherResult = function displayWeatherResult(weather) {
  while (resultBox.firstChild) {
    resultBox.firstChild.remove();
  }

  const time = document.createElement("div");
  time.textContent = weather.time;

  const resultLocation = document.createElement("div");
  resultLocation.classList.add("resultlocation");
  resultLocation.textContent = `Location: ${weather.locationName}, ${weather.country}`;

  const temperature_c = document.createElement("div");
  temperature_c.classList.add("temperature");
  temperature_c.textContent = `Temperature: ${weather.temp_c} °C`;
  const temperature_f = document.createElement("div");
  temperature_f.classList.add("temperature");
  temperature_f.textContent = `Temperature: ${weather.temp_f} °F`;
  if (togglebtn[0].classList.contains("currentUnit")) {
    temperature_c.classList.add("show");
  } else {
    temperature_f.classList.add("show");
  }

  const condition = document.createElement("div");
  condition.classList.add("condition");
  const conditionText = document.createElement("p");
  conditionText.textContent = `Condition: ${weather.condition}`;
  const conditionImage = document.createElement("img");
  conditionImage.src = weather.imagesrc;
  condition.appendChild(conditionText);
  condition.appendChild(conditionImage);

  resultBox.appendChild(time);
  resultBox.appendChild(resultLocation);
  resultBox.appendChild(temperature_c);
  resultBox.appendChild(temperature_f);
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

const displayWait = function displayWait() {
  while (resultBox.firstChild) {
    resultBox.firstChild.remove();
  }
  const waitText = document.createElement('p');
  waitText.textContent = "Please wait...";
  resultBox.appendChild(waitText);
};

const domLoad = function domLoad() {
  addEvents();
};

export { domLoad, displayWeatherResult, displayError, displayWait};
