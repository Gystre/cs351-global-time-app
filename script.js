const timezoneOffsets = {
    'UTC': 0,
    'NewYork': -5,
    'London': 0,
    'Sydney': 11,
    'Tokyo': 9
    // Add more cities and their UTC offsets as needed
}

function getCityTime(city) {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Convert local time to UTC time in milliseconds
    const cityOffset = timezoneOffsets[city] * 60 * 60000; // Convert city UTC offset to milliseconds
    return new Date(utcTime + cityOffset);
}

function addCityTime() {
    const city = document.getElementById("city-selector").value;
    const cityTime = getCityTime(city);

    const clockDiv = document.createElement("div");
    clockDiv.className = "city-clock";

    const cityNameDiv = document.createElement("div");
    cityNameDiv.textContent = city;

    const timeDisplayDiv = document.createElement("div");
    timeDisplayDiv.className = "time-display";
    timeDisplayDiv.textContent = cityTime.toISOString().slice(11, 19); // Display only the HH:MM:SS portion

    clockDiv.appendChild(cityNameDiv);
    clockDiv.appendChild(timeDisplayDiv);
    
    document.getElementById("clocks").appendChild(clockDiv);
}
