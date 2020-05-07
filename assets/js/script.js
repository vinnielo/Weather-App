$(document).ready(function () {
  //initialize array
  let citiesArr;
  if (localStorage.cityRecord) {
    citiesArr = JSON.parse(localStorage.cityRecord);
  } else {
    citiesArr = [];
  }
  //create current weather div
  const singleDayData = (inputVal) => {
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=44a753813c9ae4adb9510813a1fbdff9&units=imperial`;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
      success: function(res){
    
      console.log(res);
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
        $("#today").html(cityDiv);
        
    var latitude = res.coord.lat;
    var longitude = res.coord.lon;
    const queryUVIndex = `http://api.openweathermap.org/data/2.5/uvi?appid=44a753813c9ae4adb9510813a1fbdff9&lat=${latitude}&lon=${longitude}`
    //Second Ajax to get UV Index
    $.ajax({
      url: queryUVIndex,
      method: "GET",
      dataType: "json",
      success: function (res) {
        const uvIndex = res.value;
        console.log(res)
        $("#today").append(`<div class="card-text"><h4>UV Index: + ${uvIndex}</h4></div><br>`)
        
      }
      
})
    
    },
    error: function() {
      //clear search input container
      $('#search-value').val('');
      return;
  }
  });
}

  //create five day forecast
  const fiveDayData = (inputVal) => {
    const queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=44a753813c9ae4adb9510813a1fbdff9&units=imperial`;

    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json"
    }).then(function(res){
        console.log(res)
        const fiveDiv = $("<div>");
        fiveDiv.attr("class", "city-five-container");
        const cityFiveDay = `
        <div class="row">
            <div class="card col-md-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${res.list[0].dt_txt.replace("00:00:00","")}</h5>
                        <img src="http://openweathermap.org/img/w/${res.list[0].weather[0].icon}.png"></img>
                        <p class="card-text">Temp: ${res.list[0].main.temp_max} &#8457;</p>
                        <p class="card-text">Humidity: ${res.list[0].main.humidity} %</p>
                </div>
            </div>
            <div class="card col-md-2" style="width: 18rem;">
            <div class="card-body">
                    <h5 class="card-title">${res.list[8].dt_txt.replace("00:00:00","")}</h5>
                    <img src="http://openweathermap.org/img/w/${res.list[8].weather[0].icon}.png"></img>
                    <p class="card-text">Temp: ${res.list[8].main.temp} &#8457;</p>
                    <p class="card-text">Humidity: ${res.list[8].main.humidity} %</p>                 
                </div>
        </div>
        <div class="card col-md-2" style="width: 18rem;">
            <div class="card-body">
                    <h5 class="card-title">${res.list[16].dt_txt.replace("00:00:00","")}</h5>
                    <img src="http://openweathermap.org/img/w/${res.list[16].weather[0].icon}.png"></img>
                    <p class="card-text">Temp: ${res.list[16].main.temp} &#8457;</p>
                    <p class="card-text">Humidity: ${res.list[16].main.humidity} %</p>                 
                </div>
        </div>
        <div class="card col-md-2" style="width: 18rem;">
            <div class="card-body">
                    <h5 class="card-title">${res.list[24].dt_txt.replace("00:00:00","")}</h5>
                    <img src="http://openweathermap.org/img/w/${res.list[24].weather[0].icon}.png"></img>
                    <p class="card-text">Temp: ${res.list[24].main.temp} &#8457;</p>
                    <p class="card-text">Humidity: ${res.list[24].main.humidity} %</p>                 
                </div>
        </div>
        <div class="card col-md-2" style="width: 18rem;">
            <div class="card-body">
                    <h5 class="card-title">${res.list[32].dt_txt.replace("00:00:00","")}</h5>
                    <img src="http://openweathermap.org/img/w/${res.list[32].weather[0].icon}.png"></img>
                    <p class="card-text">Temp: ${res.list[32].main.temp} &#8457;</p>
                    <p class="card-text">Humidity: ${res.list[32].main.humidity} %</p>                 
                </div>
        </div>
        </div>
        `;
        fiveDiv.html(cityFiveDay);
        $("#forecast").html(fiveDiv);
     
    
    
    });
  };

              

  //click event for search
  $("#search-button").on("click", () => {
    //get the input value
    const inputVal = $("#search-value").val();

    //make API call
    singleDayData(inputVal);
    fiveDayData(inputVal);
    // uvIndex(inputVal);

   
    const cityButton = $("<button>");
    cityButton.attr("class", "city-button");
    cityButton.attr("data", inputVal);
    cityButton.text(inputVal);
    $(".history").prepend(cityButton);

    //local storage to save city on the page
    citiesArr.push({ cityName: inputVal });
    localStorage.cityRecord = JSON.stringify(citiesArr);
  
    //empty input container
    $("#search-value").val("");
  });

  //on click on city button show data ui
  $(".history").on("click", ".city-button", () => {
    const buttonData = $(event.target).attr("data");
    singleDayData(buttonData);
    fiveDayData(buttonData);
  });

  //parseData local data and show it
  const restoreLocalData = () => {
    if (localStorage.cityRecord) {
      const localCityData = JSON.parse(localStorage.cityRecord);
      //show the first index
      const firstDataIndex = localCityData[0].cityName;
      singleDayData(firstDataIndex);
      fiveDayData(firstDataIndex);
      //create buttons
      for (let i = 0; i < localCityData.length; i++) {
        if(citiesArr.indexOf(localCityData[i]) === -1){
        
        const cityButtonEl = $("<button>");
        cityButtonEl.attr("class", "city-button");
        cityButtonEl.attr("data", localCityData[i].cityName);
        cityButtonEl.text(localCityData[i].cityName);
        $(".history").prepend(cityButtonEl);
        }        
      }
      return citiesArr
    }
  };

  //invoke restore function
  restoreLocalData();
});
