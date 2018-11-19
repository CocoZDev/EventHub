// ====== BackGround Change Using day light saving
function dayAndNight(){

  var current = new Date();
  var day_night = current.getHours();
  // console.log(current);
  // console.log(day_night);

    if (day_night > 0 && day_night < 17){
      //Day
      document.body.style.backgroundImage = "url('assets/images/kyle-hinkson-498968-unsplash.jpg')";
    }
    else{
      //Night
      document.body.style.backgroundImage = "url('assets/images/lights-party-dancing-music.jpg')";
    }
}
dayAndNight();//======background change end code

//WEATHER API ADDED
var APIKey = "5e68d3fec5ccfb64ad77db9dcbc833c7";
var search = "";
var callBackResponse = "";
var userInput;
// var input = document.getElementById("search-bar");

console.log("userInput: " + userInput);
// console.log("input: " + input);

$('#displayPanel').hide();

// $( "#search-bar" )
//   .keyup(function() {
//     var value = $( this ).val();
//     $( ".city" ).text( value );
//   })
//   .keyup();

// Execute a function when the user click on search button
$("#submit-id").click(function(e){
  // Cancel the default action, if needed
  e.preventDefault();
  userInput = $("#search-bar").val();
  console.log('User Input Captured: ' + userInput);
  getEventsToUI(''); // Display events
  displayOnMap(userInput); //Display the selected city on the map
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
    $('html,body').animate({ scrollTop: $('#page-top-anchor').offset().top - 60}, '500');
    return false;
  });
});
