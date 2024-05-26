import { displayWeatherResult, displayError } from "./dom";

const API_KEY = "4008195c51d44444ac4134527242005";

const getWeather = async function getWeather(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=no`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();

    console.log(data);
    displayWeatherResult(data);

  } catch (error) {
    
    console.log(error);
    displayError();
  }
};

export default getWeather;
