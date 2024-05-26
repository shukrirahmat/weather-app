import getWeather from "./getWeather";
import {format} from "date-fns";

const locationInput = document.querySelector("#location");
const searchButton = document.querySelector(".searchbar button");
const resultBox = document.querySelector(".resultbox");
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
    });
  });
};

const switchUnit = function switchUnit() {
  const temperature = document.querySelectorAll(".temperature");

  togglebtn.forEach((btn) => {
    btn.classList.toggle("currentUnit");
  });
  temperature.forEach((node) => {
    node.classList.toggle("show");
  });
};

const clearResultBox = function clearResultBox() {
  while (resultBox.firstChild) {
    resultBox.firstChild.remove();
  }
};

const displayWeatherResult = function displayWeatherResult(data) {
  
  clearResultBox();

  const result = document.createElement("div");
  result.classList.add("result");

  const location = document.createElement('div');
  location.classList.add('location');
  location.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;

  const currentHeader = document.createElement("div");
  currentHeader.classList.add("head");
  currentHeader.textContent = "Now";

  const currentContent = document.createElement("div");
  currentContent.classList.add("currentContent");
  loadCurrentResult(data, currentContent);

  result.appendChild(currentHeader);
  result.appendChild(currentContent);
  resultBox.appendChild(location);
  resultBox.appendChild(result);
};

const loadCurrentResult = function loadCurrentResult(data, div) {

  const date = document.createElement('div');
  date.textContent = format(data.location.localtime, 'PPPP p');

  const image = document.createElement('img');
  image.src = "http:" + data.current.condition.icon;

  const condition = document.createElement("div");
  condition.textContent = data.current.condition.text;

  const temperature_c = document.createElement('div');
  temperature_c.classList.add("temperature");
  temperature_c.textContent = data.current.temp_c + "°C";
  const temperature_f = document.createElement('div');
  temperature_f.classList.add("temperature");
  temperature_f.textContent = data.current.temp_f + "°F";
  if (togglebtn[0].classList.contains("currentUnit")) {
    temperature_c.classList.add("show");
  } else {
    temperature_f.classList.add("show");
  }
  div.appendChild(date);
  div.appendChild(image);
  div.appendChild(condition);
  div.appendChild(temperature_c);
  div.appendChild(temperature_f);
} 

const displayError = function displayError() {
  
  clearResultBox();

  const errorText = document.createElement("p");
  errorText.textContent = "Could not find the location";
  resultBox.appendChild(errorText);
};

const displayWait = function displayWait() {
  
  clearResultBox();

  const waitText = document.createElement("p");
  waitText.textContent = "Please wait...";
  resultBox.appendChild(waitText);
};

const domLoad = function domLoad() {
  addEvents();
};

export { domLoad, displayWeatherResult, displayError, displayWait };
