const wrapper = document.querySelector(".wrapper"), 
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt");


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
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=69d455ec939d65d892bb538eae6bf382`;
    
    fetchData();
}

function error(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=69d455ec939d65d892bb538eae6bf382`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Loading...";
    infoTxt.classList.add("pending");

    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
    infoTxt.classList.replace("pending", "error");
    if(info.cod == "404"){
        infoTxt.innerText = "Invalid city!";
    } else{
        infoTxt.classList.remove("pending", "error");
        console.log(info);
    }
}