const wrapper = document.querySelector(".wrapper"), 
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    icon = wrapper.querySelector(".weather-part img");

const inputField = document.getElementById("input");
const locationButton = document.getElementById("currentLocation");

let api;

inputField.addEventListener('keyup', e => {
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationButton.addEventListener("click", () => {
    if(navigator.geolocation) { //if browser supports geolocation api
        navigator.geolocation.getCurrentPosition(success, error);
    } else{
        alert("Your browser doesn't support geolocation api");
    }
});

function success(location){
    const {latitude, longitude} = location.coords; //getting the coordinates of the user
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=69d455ec939d65d892bb538eae6bf382`;
    
    fetchData();
}

function error(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=69d455ec939d65d892bb538eae6bf382`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Loading...";
    infoTxt.classList.add("pending");

    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
    infoTxt.classList.replace("pending", "error");
    if(info.cod === "404"){
        infoTxt.innerText = "Invalid city!";
    } else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;
        
        if(id === 800){
            icon.src = "/WeatherIcons/clear.svg";  
        }else if(id >= 200 && id <= 232) {
            icon.src = "/WeatherIcons/storm.svg";
        }else if(id >= 600 && id <= 622) {
            icon.src = "/WeatherIcons/snow.svg";
        }else if(id >= 701 && id <= 781) {
            icon.src = "/WeatherIcons/haze.svg";
        }else if(id >= 801 && id <= 804) {
            icon.src = "/WeatherIcons/cloud.svg";
        }else if(id >= 300 && id <= 321) {
            icon.src = "/WeatherIcons/rain.svg";
        }
        
        console.log(id);
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".details .temp .numb2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity .numb").innerText = humidity + `%`;
        
        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
}