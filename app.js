const express = require("express");
const path = require("path");
const app = express();
const weatherApp = new WeatherApp("72fab1f4bd503167d914a95cdf7e4d31");
const port = '3001'

class Weather {

  async fetchWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error("No weather found.");
      }

      this.weatherData = await response.json();
      this.displayWeather();
    } catch (error) {
      console.error("Error fetching weather:", error.message);
    }
  }


  search() {
    const city = this.elements.searchBar.value;
    if (city) {
      this.fetchWeather(city);
    }
  }

}


weatherApp.setupEventListeners();
weatherApp.fetchWeather("Astana");

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});