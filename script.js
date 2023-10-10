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

// America/New_York -> New York, America
function getReadableTimezoneName(timezone) {
  let split = timezone.split("/");
  let country = split[0];
  let city = split[1];

  return city + ", " + country;
}

function getReadableTime(timezone) {
  let date = new Date();
  return date.toLocaleTimeString("en-US", { timeZone: `${timezone}` });
}

// creats a div with the city name and the time in #clocks
function addClockDiv(timeZone) {
  // clone the template
  const template = document.getElementById("clock-template").cloneNode(true);
  template.style.display = "flex";
  template.setAttribute("value", timeZone);

  // find the timezone class
  let timezone = template.querySelector(".timezone");
  timezone.textContent = getReadableTimezoneName(timeZone);

  // fill in the time
  let time = template.querySelector(".time");
  time.textContent = getReadableTime(timeZone);

  document.getElementById("clocks").appendChild(template);
}

// called when the user clicks the button "Add City"
function addCityTime() {
  const timeZone = document.getElementById("city-selector").value;
  addClockDiv(timeZone);
}

$(document).ready(function () {
  // initialize select2
  $(".js-example-basic-single").select2();

  // add every timezone possible
  let timezones = Intl.supportedValuesOf("timeZone");

  for (let i = 0; i < timezones.length; i++) {
    let name = getReadableTimezoneName(timezones[i]);

    $("#city-selector").append(
      $("<option></option>").attr("value", timezones[i]).text(name)
    );
  }

  // update clocks
  function updateClocks() {
    let clocks = document.getElementsByClassName("city-clock");

    for (let i = 0; i < clocks.length; i++) {
      if (clocks[i].style.display == "none") continue;

      let timeZone = clocks[i].getAttribute("value");
      let timeDiv = clocks[i].querySelector(".time");

      timeDiv.innerHTML = getReadableTime(timeZone);
    }
  }
  setInterval(updateClocks, 1000);
});

// add an exmaple clock
addClockDiv("America/New_York");
