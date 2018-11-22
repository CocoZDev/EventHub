// ====== BackGround Change Using day light saving
function dayAndNight(){

  var current = new Date();
  var day_night = current.getHours();
  // console.log(current);
  // console.log(day_night);

    if (day_night > 0 && day_night < 16){
      //Day
      document.body.style.backgroundImage = "url('assets/images/kyle-hinkson-498968-unsplash-2.jpg')";
    }
    else{
      //Night
      document.body.style.backgroundImage = "url('assets/images/artist-1838653_1920.jpg')";
    }
}

dayAndNight();//======background change end code

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
