import { displayWeatherResult, displayError } from "./dom";

const API_KEY = "4008195c51d44444ac4134527242005";

const getWeather = async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();

    //console.log(data);

    const locationName = data.location.name;
    const country = data.location.country;
    const condition = data.current.condition.text;
    const temp_c = data.current.temp_c;
    const temp_f = data.current.temp_f;
    const imagesrc = "https:" + data.current.condition.icon;
    const time = data.location.localtime;

    displayWeatherResult({
      locationName,
      country,
      condition,
      temp_c,
      temp_f,
      imagesrc,
      time,
    });
  } catch (error) {
    console.log(error);
    displayError();
  }
};

export default getWeather;
