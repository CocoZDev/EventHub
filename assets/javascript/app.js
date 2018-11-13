// ====== BackGround Change Using day light saving
function dayAndNight(){

  var current = new Date();
  var day_night = current.getHours();
  // console.log(current);
  // console.log(day_night);

    if (day_night > 0 && day_night < 17){
      //Day
      document.body.style.backgroundImage = "url('assets/images/sunrise_org.jpg')";
    }
    else{
      //Night
      document.body.style.backgroundImage = "url('assets/images/night_org.jpg')";
    }
}
dayAndNight();//======background change end code

//WEATHER API ADDED
var APIKey = "5e68d3fec5ccfb64ad77db9dcbc833c7";
var search = "";
var callBackResponse = "";
var userInput = $('#search-bar').val();
var input = document.getElementById("search-bar");

$('#displayPanel').hide();

// Execute a function when the user click on search glyphicon
$("#submit-id").click(function(){
  // Cancel the default action, if needed
  event.preventDefault();
  console.log('User Input Captured: ' + userInput);
  getWeather(); //GETS WEATHER FOR THE SEARCH CITY
  getEventsToUI('music'); //DEFAULT CITY SEARCH WOULD DISPLAY MUSIC EVENTS
  displayOnMap(userInput); //DISPLAY THE SELECTED CITY ON THE MAP
  $("#weather-container").removeClass("hidden");
  $("#event-type-container").removeClass("hidden");
});

// // Execute a function when the user releases a key on the keyboard
// input.addEventListener("keyup", function(event) {
//   // Cancel the default action, if needed
//   event.preventDefault();
//   // Number 13 is the "Enter" key on the keyboard
//   if (event.keyCode === 13) {
//     // Trigger the button element with a click
//     console.log('input Captured: ' + input);
//     document.getElementById("submit-id").click();
//   }
// });

//using weather api key getting weather details
  function getWeather(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+userInput+"&units=imperial&appid=" + APIKey;
    //console.log(queryURL);
    var iconImg;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {
        // Transfer content to HTML
        $(".city").html( response.name + ', ');
        $(".country").html(response.sys.country);
        $(".humidity").html("Humidity: " + response.main.humidity+" %");
        $(".temp").html(Math.round(response.main.temp)+" &#x2109");


        var sunrise = response.sys.sunrise;
        var x = moment(sunrise*1000).format('h:mm A');
        var sunset = response.sys.sunset;
        var y = moment(sunset*1000).format('h:mm A');

        $(".sunrise").html('Sunrise ' + x);
        $(".sunset").html(' Sunset ' + y);

      var lat = response.coord.lat;
      //console.log(lat);
      var lng = response.coord.lon;
      // console.log(long);
      var api_key = "G1LHK198LBCB";
      queryURLTime = "https://vip.timezonedb.com/v2/get-time-zone?key="+ api_key + "&format=json&by=position&lng=" + lng + "&lat=" + lat;
        console.log(queryURLTime);
        $.ajax({
           url: queryURLTime,
           method: "GET"
        }).done(function(response) {
          console.log(response);
        //appends the country name to the html
        $('.localTime').html(moment(response.formatted).format("hh:mm A") + ' (Local Time) - ');
        });

        cbHandler(response);
      });
  }

  function cbHandler(weatherDetails){
    callBackResponse = weatherDetails;
  }

// clock function
(function () {
  var clockElement = document.getElementById("clock");
  function updateClock(clock) {
    clock.innerHTML = new Date().toLocaleTimeString();
  }
  setInterval(function() {
      updateClock(clockElement);
  }, 1000);
}());

// ========== Smooth Scroll To Top Button - https://codepen.io/kruxor/pen/CwpFq ========== //

$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $('.scrolltop:hidden')
      .stop(true, true)
      .fadeIn();
  } else {
    $('.scrolltop')
      .stop(true, true)
      .fadeOut();
  }
});

$(function() {
  $('.scroll-btn').click(function() {
    $('html,body').animate({ scrollTop: $('#page-top-anchor').offset().top - 50}, '500');
    return false;
  });
});
