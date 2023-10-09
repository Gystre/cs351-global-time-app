const timezoneOffsets = {
  UTC: 0,
  NewYork: -5,
  London: 0,
  Sydney: 11,
  Tokyo: 9,
  // Add more cities and their UTC offsets as needed
};

function getCityTime(city) {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Convert local time to UTC time in milliseconds
  const cityOffset = timezoneOffsets[city] * 60 * 60000; // Convert city UTC offset to milliseconds
  return new Date(utcTime + cityOffset);
}

// city = string
function addClockDiv(city) {
  // container div to store the time and the city name
  const container = document.createElement("div");
  container.className = "city-clock";

  // city name
  const cityNameDiv = document.createElement("div");
  cityNameDiv.textContent = city;

  // the time
  const cityTime = getCityTime(city);
  const timeDisplayDiv = document.createElement("div");
  timeDisplayDiv.className = "time-display";
  timeDisplayDiv.textContent = cityTime.toISOString().slice(11, 19); // Display only the HH:MM:SS portion

  container.appendChild(cityNameDiv);
  container.appendChild(timeDisplayDiv);

  document.getElementById("clocks").appendChild(container);
}

function addCityTime() {
  const city = document.getElementById("city-selector").value;
  addClockDiv(city);
}

// switch to a more automated solution instead of hardcoding offsets
// add an example clock
// addClockDiv("San Francisco, USA");
