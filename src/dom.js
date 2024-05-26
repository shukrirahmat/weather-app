import getWeather from "./getWeather";
import { format } from "date-fns";

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

  const location = document.createElement("div");
  location.classList.add("location");
  location.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;

  const currentHeader = document.createElement("div");
  currentHeader.classList.add("head");
  currentHeader.textContent = "Now";

  const currentContent = document.createElement("div");
  currentContent.classList.add("currentContent");
  loadCurrentResult(data, currentContent);

  const hourlyHeader = document.createElement("div");
  hourlyHeader.classList.add("head");
  hourlyHeader.textContent = "Today's hourly forecast";

  const hourlyContent = document.createElement("div");
  hourlyContent.classList.add("hourlyContent");
  loadHourlyResult(data, hourlyContent);

  const upcomingHeader = document.createElement("div");
  upcomingHeader.classList.add("head");
  upcomingHeader.textContent = "Upcoming days forecast";

  const upcomingContent = document.createElement("div");
  upcomingContent.classList.add("upcomingContent");
  loadUpcomingResult(data, upcomingContent);

  result.appendChild(currentHeader);
  result.appendChild(currentContent);
  result.appendChild(hourlyHeader);
  result.appendChild(hourlyContent);
  result.appendChild(upcomingHeader);
  result.appendChild(upcomingContent);
  resultBox.appendChild(location);
  resultBox.appendChild(result);
};

const loadCurrentResult = function loadCurrentResult(data, div) {
  const date = document.createElement("div");
  date.textContent = format(data.location.localtime, "PPPP p");

  const image = document.createElement("img");
  image.src = "https:" + data.current.condition.icon;

  const condition = document.createElement("div");
  condition.textContent = data.current.condition.text;

  const temperature_c = document.createElement("div");
  temperature_c.classList.add("temperature");
  temperature_c.textContent = data.current.temp_c + " °C";
  const temperature_f = document.createElement("div");
  temperature_f.classList.add("temperature");
  temperature_f.textContent = data.current.temp_f + " °F";
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
};

const loadHourlyResult = function loadHourlyResult(data, container) {
  const hourObjects = data.forecast.forecastday[0].hour;

  hourObjects.forEach((obj) => {
    const div = document.createElement("div");
    div.classList.add("hdata");

    const time = document.createElement("div");
    time.textContent = format(obj.time, "p");
    const image = document.createElement("img");
    image.src = "https:" + obj.condition.icon;
    const condition = document.createElement("p");
    condition.textContent = obj.condition.text;

    const temperature_c = document.createElement("div");
    temperature_c.classList.add("temperature");
    temperature_c.textContent = obj.temp_c + " °C";
    const temperature_f = document.createElement("div");
    temperature_f.classList.add("temperature");
    temperature_f.textContent = obj.temp_f + " °F";
    if (togglebtn[0].classList.contains("currentUnit")) {
      temperature_c.classList.add("show");
    } else {
      temperature_f.classList.add("show");
    }

    const rain = document.createElement("div");
    rain.textContent = `${obj.chance_of_rain}% to rain`;

    div.appendChild(time);
    div.appendChild(image);
    div.appendChild(condition);
    div.appendChild(temperature_c);
    div.appendChild(temperature_f);
    div.appendChild(rain);
    container.appendChild(div);
  });
};

const loadUpcomingResult = function loadUpcomingResult(data, container) {
  const fdays = data.forecast.forecastday;
  [fdays[1], fdays[2]].forEach((fday) => {
    const div = document.createElement("div");

    const date = document.createElement("div");
    date.textContent = format(fday.date, "PPPP");

    const image = document.createElement("img");
    image.src = "https:" + fday.day.condition.icon;

    const condition = document.createElement("div");
    condition.textContent = fday.day.condition.text;

    const temperature_c = document.createElement("div");
    temperature_c.classList.add("temperature");
    temperature_c.textContent = `${fday.day.mintemp_c} °C ~ ${fday.day.maxtemp_c} °C`;
    const temperature_f = document.createElement("div");
    temperature_f.classList.add("temperature");
    temperature_f.textContent = `${fday.day.mintemp_f} °F ~ ${fday.day.maxtemp_f} °F`;
    if (togglebtn[0].classList.contains("currentUnit")) {
      temperature_c.classList.add("show");
    } else {
      temperature_f.classList.add("show");
    }

    const rain = document.createElement("div");
    rain.textContent =`Daily chance to rain: ${fday.day.daily_chance_of_rain}%`;

    div.appendChild(date);
    div.appendChild(image);
    div.appendChild(condition);
    div.appendChild(temperature_c);
    div.appendChild(temperature_f);
    div.appendChild(rain);
    container.appendChild(div);
  });
};

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
