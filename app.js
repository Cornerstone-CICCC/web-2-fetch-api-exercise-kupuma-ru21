document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1"
    );
    const json = await response.json();
    const temperature = json.current.temperature_2m;
    const temperatureUnit = json.current_units.temperature_2m;
    const windSpeed = json.current.wind_speed_10m;
    const windSpeedUnit = json.current_units.wind_speed_10m;
    const timezone = json.timezone;
    const timeUpdated = new Date(json.current.time).toLocaleString(
      json.timezone_abbreviation,
      {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
    document.querySelector(
      ".temperature"
    ).textContent = `${temperature} ${temperatureUnit}`;
    document.querySelector(
      ".windSpeed"
    ).textContent = `${windSpeed} ${windSpeedUnit}`;
    document.querySelector(".timezone").textContent = timezone;
    const timeUpdatedDocument = document.querySelector(".timeUpdated");
    timeUpdatedDocument.textContent = timeUpdated;
    timeUpdatedDocument.attributes[1].textContent = json.current.time;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});
