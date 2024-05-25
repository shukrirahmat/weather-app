import getWeather from "./getWeather";

const locationInput = document.querySelector("#location");
const searchButton = document.querySelector(".searchbar button");

const addEvents = function addEvents() {

    searchButton.addEventListener('click', (event) => {
        getWeather(locationInput.value)
        event.preventDefault();
    })
}

const domLoad = function domLoad() {
    addEvents();
}

export default domLoad;