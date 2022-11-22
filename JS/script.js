const wrapper = document.querySelector(".wrapper"), 
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt");


const inputField = document.getElementById("input");

inputField.addEventListener('keyup', e => {
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
})

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=69d455ec939d65d892bb538eae6bf382`;
    
    infoTxt.innerText = "Loading...";
    infoTxt.classList.add("pending");
    
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    console.log(info);
}