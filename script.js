const displayWeatherDescription = document.querySelector(".displayWeatherDescription");
const displayWeatherTemperature = document.querySelector(".displayWeatherTemperature");
const clouds = document.querySelector(".clouds");
const clear = document.querySelector(".clear");
const rain = document.querySelector(".rain");
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");

let weatherTypes = [clear, clouds, rain];

const getWeather = async (placeWeather) => {
  try {
    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${placeWeather}&appid=b4b7a5b435da2799bfd9d0c41a05cafe`,
      {
        mode: "cors",
      }
    );
    let data = await result.json();
    getWeatherTemperature(data);
    updateWeatherText(data);
  } catch (error) {
    console.log("IST EINE ERROR " + error);
  }
};

getWeather("wellington");

searchButton.addEventListener("click", (e) => {
  if (search.value === "") {
    return alert("Can't search empty");
  } else {
    getWeather(search.value.toString());
  }
});

const updateWeatherText = (data) => {
  let weather = data.weather[0].main;
  displayWeatherDescription.textContent = weather;
  hideAllWeatherIcons();
  displayWeatherIcon(weather);
};

// Sets the temperature (from kelvin to celsius)
const getWeatherTemperature = (data) => {
  displayWeatherTemperature.textContent = (data.main.temp - 273.15).toFixed(0) + " degrees celsius";
};

// Loops over the weatherTypes array and checks if the weather argument matches any of our classes
// If a match is found, that element has its classes switched around to make it active
const displayWeatherIcon = (weather) => {
  weatherTypes.forEach((element) => {
    if (element.classList[1] === weather.toLowerCase()) {
      element.classList.remove("hidden");
      element.classList.add("active");
    }
  });
};

// Hides all weather icons in order to "reset" all the elements
const hideAllWeatherIcons = () => {
  weatherTypes.forEach((element) => element.classList.add("hidden"));
};
