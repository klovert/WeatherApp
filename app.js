
//select element

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const localElement = document.querySelector(".location p");
const notifiElement = document.querySelector(".notification");

//data
const weather = {};
weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;

//api key
const key = "e9c0ea537660025f92c3fbacc89ebef0";

//check browser
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
    notificationElement.style.display = "block";
    notifiElement.innerHTML = "<p>El navegador no admite Geolocalizacion</p>";
}

//set user's position

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}


//show error

function showError(error){
    notifiElement.style.display = "block";
    notifiElement.innerHTML = '<p> Gelocalizacion denegada </p>';
}

//GET weather from api

function getWeather(latitude, longitude){
    let api =  `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })

        .then(function(){
            displayWeather();
        });
    
}
//display weather to ui

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    localElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//C a F 

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//user click on the tmeperature element
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
})
