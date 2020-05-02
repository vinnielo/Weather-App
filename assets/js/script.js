const cities = []

// cityParse = JSON.parse(localStorage.getItem(inputVal))  

$(document).ready(function () {
  //click event for search
  $("#search-button").on("click", () => {
    //get the input value
    const inputVal = $("#search-value").val();
    //make API call
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=44a753813c9ae4adb9510813a1fbdff9&units=imperial`;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
    }).then((res) => {
      //create div with all html
      const cityDiv = $("<div>");
      cityDiv.attr("class", "city-weather-container");
      const date = new Date().toLocaleDateString();
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const cityHTML = `
        <div class="city-component-1">
           <h1><span class="city-name">${res.name} (${date})</span><img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png"></img> </h1>          
        </div>
        <div class="city-component-2 city-temp"><h4>Temperature: ${res.main.temp} &#8457;</h4></div>
        <div class="city-component-3 city-hum"><h4>Humidity: ${res.main.humidity}%</h4></div>
        <div class="city-component-3 city-hum"><h4>Wind Speed: ${res.wind.speed} MPH</h4></div>
        
        `;
      cityDiv.html(cityHTML);
      $("#today").append(cityDiv);
      //add icon
      //look at doc to create forcast
    });
    const queryURL1 = `http://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=44a753813c9ae4adb9510813a1fbdff9&units=imperial`;

    $.ajax({
      type: "GET",
      url: queryURL1,
      dataType: "json",
    }).then((res) => {
      console.log(res);
      const fiveDiv = $("<div>");
      fiveDiv.attr("class", "city-five-container");
      const cityFiveDay = `
        <div class="row">
            <div class="card col-md-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${res.list[0].dt_txt}</h5>
                        <img src="http://openweathermap.org/img/w/${res.list[4].weather[0].icon}.png"></img>
                        <p class="card-text">Temp: ${res.list[4].main.temp} &#8457;</p>
                        <p class="card-text">Humidity: ${res.list[4].main.humidity} %</p>
                </div>
            </div>
            <div class="card col-md-2" style="width: 18rem;">
            <div class="card-body">
                    <h5 class="card-title">${res.list[11].dt_txt}</h5>
                    <img src="http://openweathermap.org/img/w/${res.list[12].weather[0].icon}.png"></img>
                    <p class="card-text">Temp: ${res.list[12].main.temp} &#8457;</p>
                    <p class="card-text">Humidity: ${res.list[12].main.humidity} %</p>                 
                </div>
        </div>
        <div class="card col-md-2" style="width: 18rem;">
            <div class="card-body">
                    <h5 class="card-title">${res.list[20].dt_txt}</h5>
                    <img src="http://openweathermap.org/img/w/${res.list[20].weather[0].icon}.png"></img>
                    <p class="card-text">Temp: ${res.list[20].main.temp} &#8457;</p>
                    <p class="card-text">Humidity: ${res.list[20].main.humidity} %</p>                 
                </div>
        </div>
        <div class="card col-md-2" style="width: 18rem;">
            <div class="card-body">
                    <h5 class="card-title">${res.list[28].dt_txt}</h5>
                    <img src="http://openweathermap.org/img/w/${res.list[28].weather[0].icon}.png"></img>
                    <p class="card-text">Temp: ${res.list[28].main.temp} &#8457;</p>
                    <p class="card-text">Humidity: ${res.list[28].main.humidity} %</p>                 
                </div>
        </div>
        <div class="card col-md-2" style="width: 18rem;">
            <div class="card-body">
                    <h5 class="card-title">${res.list[36].dt_txt}</h5>
                    <img src="http://openweathermap.org/img/w/${res.list[36].weather[0].icon}.png"></img>
                    <p class="card-text">Temp: ${res.list[36].main.temp} &#8457;</p>
                    <p class="card-text">Humidity: ${res.list[36].main.humidity} %</p>                 
                </div>
        </div>
        

        </div>
        `;
      fiveDiv.html(cityFiveDay);
      $("#forecast").append(fiveDiv);
      console.log(`${res.list[1].main.temp}`);
    });

    //create input value button - wrap in if statement to make sure that button is created when city matches

    // if(inputVal ===  ){
    const cityButton = $("<button>");
    cityButton.attr("class", "city-button");
    cityButton.attr("data", inputVal);
    cityButton.text(inputVal);
    $(".history").prepend(cityButton);
    //display target data of city
    //build query url
    //get the data
    //build icon
    //show the data

    // }
// local storage to save city on the page

    
function storedCities(){

localStorage.setItem("city", JSON.stringify(inputVal))}
cities.push(inputVal)

storedCities()
  });

});
