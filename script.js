const displayWeatherDescription = document.querySelector(".displayWeatherDescription");
const displayWeatherTemperature = document.querySelector(".displayWeatherTemperature");
const clouds = document.querySelector(".clouds");
const clear = document.querySelector(".clear");
const rain = document.querySelector(".rain");
const snow = document.querySelector(".snow");
const search = document.querySelector(".search");
const topSearchButtonIcon = document.querySelector(".topSearchButtonIcon");
const topSearchButtonIconWrapper = document.querySelector(".topSearchButtonIconWrapper");
const bottomCity = document.querySelector(".bottomCity");
const bottomFeelsLike = document.querySelector(".bottomFeelsLike");
const bottomHumidity = document.querySelector(".bottomHumidity");
const unit = document.querySelector(".unit");

let weatherTypes = [clear, clouds, rain, snow];
let showCelsius = true;

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
    getWeatherFeelsLike(data);
    getWeatherHumidity(data);
    updateCity(placeWeather);
  } catch (error) {
    console.log("IST EINE ERROR " + error);
  }
};

getWeather("Wellington");

topSearchButtonIconWrapper.addEventListener("click", (e) => {
  if (search.value === "") {
    return alert("Can't search empty");
  } else {
    getWeather(search.value.toString());
    searchIconAnimations();
  }
});

// If enter is pressed while in the search field, search.
search.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather(search.value);
    searchIconAnimations();
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
  displayWeatherTemperature.textContent = (data.main.temp - 273.15).toFixed(0) + " °C";
  // displayWeatherTemperature.textContent = (1.8 * (data.main.temp - 273) + 32).toFixed(0) + " °F"; fahrenheit
};

const getWeatherFeelsLike = (data) => {
  bottomFeelsLike.textContent = "Feels like " + (data.main.feels_like - 273.15).toFixed(0) + " °C";
};

const getWeatherHumidity = (data) => {
  bottomHumidity.textContent = "Humidity: " + data.main.humidity;
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

// Add classes for search icon animations and remove them after a 1.5 second delay.
const searchIconAnimations = () => {
  topSearchButtonIconWrapper.classList.add("topSearchButtonRotate");
  setTimeout(() => {
    topSearchButtonIconWrapper.classList.add("fade");
    topSearchButtonIconWrapper.classList.remove("topSearchButtonRotate");
  }, 1500);
  topSearchButtonIconWrapper.classList.remove("fade");
};

// Hides all weather icons in order to "reset" all the elements
const hideAllWeatherIcons = () => {
  weatherTypes.forEach((element) => element.classList.add("hidden"));
};

const updateCity = (search) => {
  bottomCity.textContent = search;
};

unit.addEventListener("click", (e) => {
  showCelsius = false;
});
