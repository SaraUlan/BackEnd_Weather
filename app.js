let weather = {
  apiKey: "72fab1f4bd503167d914a95cdf7e4d31",
  fetchWeather: async function (city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      );
      const data = await response.json();
      this.displayWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("No weather found.");
    }
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
   
  },
  search: function () {
    const searchBarValue = document.querySelector(".search-bar").value;
    if (searchBarValue.trim() !== "") {
      this.fetchWeather(searchBarValue);
    } else {
      alert("Please enter a city.");
    }
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });
weather.fetchWeather("Astana    ");
