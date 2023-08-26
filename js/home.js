"use strict";
// SEARCH VARIABLES
let searchInput = document.getElementById("searchInput");
let findBtn = document.getElementById("findBtn");

// TODAY VARIABLES
let todayName = document.getElementById("todayName");
let todayNumber = document.getElementById("todayDateNum");
let todayMonth = document.getElementById("todayDateMonth");

let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");

let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");

// NEXT DAY VARIABLES
let nextDayName = document.querySelectorAll(".next-day-name");
let nextMaxTemp = document.querySelectorAll(".next-max-temp");
let nextMinTemp = document.querySelectorAll(".next-min-temp");
let nextConditionImg = document.querySelectorAll(".next-condition-img");
let nextConditionText = document.querySelectorAll(".next-condition-text");

let date = new Date();
// ***************************************************************************************************
// FUNCTION GETDATA FROM fetch API DATA
async function getData(cityName) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f67be5c7923a45e7ab0142947231108&q=${cityName}&days=3`
  );
  if (res.status == 200) {
    let finalRes = await res.json();
    return finalRes;
  }
}

// ********************************************************************************************************
// FUNCTION DISPLAY TODAY WEATHER
function displayToday(data) {
  let todayDate = new Date();

  todayName.innerHTML = todayDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-us", {
    month: "long",
  });

  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayConditionImg.setAttribute("src", data.current.condition.icon);
  todayConditionText.innerHTML = data.current.condition.text;

  humidity.innerHTML = data.current.humidity + " %";
  wind.innerHTML = data.current.wind_kph + " Km/h";
  windDirection.innerHTML = data.current.wind_dir;
}

// FUNCTION DISPLAY NEXT DAYS
function displayNextDays(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-us", {
      weekday: "long",
    });

    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    nextConditionImg[i].setAttribute(
      "src",
      forecastData[i + 1].day.condition.icon
    );
    nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
  }
}

// START APP FUNCTION
async function startApp(cityName="Leonberg") {
  let getWeatherData = await getData(cityName);

  if(!getWeatherData.error){
    displayToday(getWeatherData);
    displayNextDays(getWeatherData);
  }

}
startApp();

//  ADD EVENT LISTENERS
searchInput.addEventListener("input", (e) => {
  startApp(e.target.value)
});
