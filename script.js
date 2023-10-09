// const timezoneOffsets = {
//   UTC: 0,
//   NewYork: -5,
//   London: 0,
//   Sydney: 11,
//   Tokyo: 9,
//   // Add more cities and their UTC offsets as needed
// };

// function getCityTime(city) {
//   const now = new Date();
//   const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Convert local time to UTC time in milliseconds
//   const cityOffset = timezoneOffsets[city] * 60 * 60000; // Convert city UTC offset to milliseconds
//   return new Date(utcTime + cityOffset);
// }

// creats a div with the city name and the time in #clocks
function addClockDiv(timeZone) {
  let date = new Date();
  let strTime = date.toLocaleString("en-US", { timeZone: `${timeZone}` });

  // container div to store the time and the city name
  const container = document.createElement("div");
  container.className = "city-clock";
  container.value = timeZone;

  // city name
  const cityNameDiv = document.createElement("div");
  cityNameDiv.textContent = timeZone;

  // the time
  const timeDisplayDiv = document.createElement("div");
  timeDisplayDiv.className = "time-display";
  timeDisplayDiv.textContent = strTime;

  container.appendChild(cityNameDiv);
  container.appendChild(timeDisplayDiv);

  document.getElementById("clocks").appendChild(container);
}

// called when the user clicks the button "Add City"
function addCityTime() {
  const timeZone = document.getElementById("city-selector").value;
  addClockDiv(timeZone);
}

addClockDiv("America/New_York");

$(document).ready(function () {
  // initialize select2
  $(".js-example-basic-single").select2();

  // add every timezone possible
  let timezones = Intl.supportedValuesOf("timeZone");

  for (let i = 0; i < timezones.length; i++) {
    // country/city
    let split = timezones[i].split("/");
    let country = split[0];
    let city = split[1];

    let name = city + ", " + country;

    $("#city-selector").append(
      $("<option></option>").attr("value", timezones[i]).text(name)
    );
  }

  // update clocks
  function updateClocks() {
    let clocks = document.getElementsByClassName("city-clock");

    for (let i = 0; i < clocks.length; i++) {
      let timeZone = clocks[i].value;
      let date = new Date();
      let strTime = date.toLocaleString("en-US", { timeZone: `${timeZone}` });

      clocks[i].children[1].textContent = strTime;
    }
  }
  setInterval(updateClocks, 1000);
});
