function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#defined-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#dayTime");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#temperature-emoji");

  // console.log(response.data);
  // console.log(date);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="temperature icon" class="temperature-emoji"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "baadfadbb44to892ae4f716502e93fc0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "baadfadbb44to892ae4f716502e93fc0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);

  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="row">
            <div class="col-2">
              <div class="weather-forecast-day">
                <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-icon">
                  <img
                    src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png"
                    alt="weather-forecast-icon"
                    width="60px"
                  />
                </div>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"><strong>18°</strong> </span
                  ><span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>
            </div>
          </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Chamonix");
