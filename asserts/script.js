const currentLocationBtn = document.getElementsByClassName("input-currentLocation")[0];
const searchBtn = document.getElementsByClassName("input-search")[0];

const tempDisplay = document.getElementsByClassName("Temp")[0];
const maxTempDisplay = document.getElementsByClassName("maxTemp")[0];
const minTempDisplay = document.getElementsByClassName("minTemp")[0];

const temp = document.getElementById("temp");
const icon = document.getElementById("icon");
const description = document.getElementById("description");
const locationName = document.getElementById("location-name");
const dateName = document.getElementById("date-name");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const wind_speed = document.getElementById("wind_speed");
const visibility = document.getElementById("visibility");
const feels_like = document.getElementById("feels_like");
const clouds = document.getElementById("clouds");


const API_KEY = 'e32ca9b251938fe06afa07c810a65618';

const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]


const fetchData = (URL, dataFunction) => {
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        dataFunction(data);
    });
};

const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    },
    geolocation(location) {
        return `https://api.openweathermap.org/geo/1.0/direct?units=metric&q=${location}&appid=${API_KEY}`
    }
}

const displayCurrentWeather = (lat,lon) => {
    const date = new Date();
    // console.log(date.getDay())
    fetchData(url.currentWeather(lat,lon),(data) => {
        console.log(data);
        temp.innerText=`${Number(data.main.temp).toFixed(1)}°C`;
        icon.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        description.innerText = `${data.weather[0].description}`;
        locationName.innerText=data.name;
        dateName.innerText=`${day[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`
        humidity.innerText = `${Number(data.main.humidity).toPrecision()}`;
        pressure.innerText = `${Number(data.main.pressure).toPrecision()}`;
        wind_speed.innerText = `${Number(data.wind.speed).toPrecision()}`;
        visibility.innerText = `${Number(data.visibility).toPrecision()}`;
        feels_like.innerText = `${Number(data.main.feels_like).toPrecision()}`;
        clouds.innerText = `${Number(data.clouds.all).toPrecision()}`;
    });
}
currentLocationBtn.addEventListener('click', () => {
    window.navigator.geolocation.getCurrentPosition(loc => {
        const lat = loc.coords.latitude;
        const lon = loc.coords.longitude;
        displayCurrentWeather(lat,lon);
    })
})

searchBtn.addEventListener('click', () => {
    const input = document.getElementsByClassName("input-text")[0].value;
    fetchData(url.geolocation(input), (data) => {
        displayCurrentWeather(data[0].lat, data[0].lon);
    })
})
