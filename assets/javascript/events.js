// Default API Setting
var eventType;
var address;
var dateRange = "future";
var noOfRecords = 20;
var showLoader = false;
var pageNum = 1;

//CREATE AN EVENT OBJECT TO CAPTURE THE  EVENT RELATED INFORMAION

var event = {
   title:"",
   description:"",
   url:"",
   imgSrc:"",
   city:"",
   region:"",
   country:"",
   venue_name:"",
   venue_address:"",
   venue_url:"",
   start_time:""
};

//ARRAY OF EVENTS
var events = [];

// Check Loader Status to Add Loader and Hide Pager Buttons
function loaderStatusCheck() {
   if (showLoader == true) {
      $("#loader").removeClass("hidden");
      $("#next-events").addClass("hidden");
      $("#previous-events").addClass("hidden");
   } else if (showLoader == false && pageNum == 1) {
      $("#loader").addClass("hidden");
      $("#previous-events").addClass("hidden");
   } else if (showLoader == false && pageNum !== 1) {
      $("#loader").addClass("hidden");
      $("#previous-events").removeClass("hidden");
   };
   // alert("showLoader: " + showLoader);
   // console.log("showLoader: " + showLoader);
};

// FUNCTION TO DISPLAY EVENTS FOR A GIVEN CITY NAME
function queryEvents(eventType, address, noOfRecords, dateRange)
{
   var oArgs = {
      app_key: "Gp5KnQs4HTZ9gpPJ", //APP KEY FOR USING "EVENTFUL" API
      category: eventType, //SEARCH ON THE TYPE OF EVENT e.g, MUSIC, FAMILY, BUSINESS
      where: address, //THIS COULD BE CITY NAME OR ADDRESS
      "date": dateRange, //"2017080100-2017103000" or "THIS-MONTH" or "FUTURE"
      page_size: noOfRecords, //NO. OF RECORDS TO FETCH FROM THE QUERY
      sort_order: "popularity", //SORTING ORDER
      within: "50", // WITHIN HOW MANY MILES
      image_sizes: "medium,perspectivecrop290by250",
      page_number: pageNum
   };
   // console.log("API query URL example: http://api.eventful.com/json/events/search?category=music&app_key=Gp5KnQs4HTZ9gpPJ&location=Fullerton&date=future&page_size=12&page_number=1&within=50&sort_order=popularity&image_sizes=medium,perspectivecrop290by250&include=categories");

   console.log(`Current API query URL: http://api.eventful.com/json/events/search?category=${oArgs.category}&app_key=${oArgs.app_key}&location=${address}&date=${dateRange}&page_size=${noOfRecords}&page_number=${pageNum}&within=${oArgs.within}&sort_order=${oArgs.sort_order}&image_sizes=${oArgs.image_sizes}&include=categories`);

   EVDB.API.call("json/events/search", oArgs, function(oData) {
      var cloneEvent;
      for (var i=0; i<oData.events.event.length; i++){

         event.title = oData.events.event[i].title;
         event.url = oData.events.event[i].url;
         if ((oData.events.event[i].image !== null) && (oData.events.event[i].image.perspectivecrop290by250 !== undefined))
         {
            event.imgSrc = oData.events.event[i].image.perspectivecrop290by250.url;
         } else if(oData.events.event[i].image == null){
            event.imgSrc = "https://api.ballotpedia.org/v3/thumbnail/";
         } else if(oData.events.event[i].image.perspectivecrop290by250 == undefined){
            event.imgSrc = oData.events.event[i].image.medium.url;
         };
         event.city = oData.events.event[i].city_name;
         event.region = oData.events.event[i].region_name;
         event.country = oData.events.event[i].country_name;
         event.venue_name = oData.events.event[i].venue_name;
         event.venue_address = oData.events.event[i].venue_address;
         event.start_time = oData.events.event[i].start_time;

         // NEED TO CLONE THE EVENT OBJECT SINCE OBJECTS ARE PASSED BY REFERNCE
         cloneEvent = Object.assign({}, event);
         events.push(cloneEvent);
         createEventDiv(cloneEvent);
         // console.log("Event #" + (i+1) + " displayed.");
         showLoader = false;
         loaderStatusCheck();
         $("#next-events").removeClass("hidden");
      };

   });

}

function createEventDiv(event){
    var eventDIV = 
        `<div class="col-xs-12 col-md-6 event-item">
               <div class="event-details">
                  <div class="img-wrapper">
                     <img class='img-rounded img-responsive event-image' src='${event.imgSrc}'alt='event image'>
                  </div>
                  <h3 class='event-title'>${event.title}</h3>
                  <p>${event.start_time}
                     <br>${event.venue_address}, ${event.city}, ${event.region}
                     <br>
                     <a class='link' href='#'  target='_blank' onclick='displayAddressOnMap(this);return false;' data-info='${event.venue_address}'>View Map</a> | 
                     <a class='link' href='${event.url}' target='_blank'>Event Details</a>
                  </p>
               </div>
            </div>
            `;
       
    var eventsHolder = $('#event-list');
    eventsHolder.append(eventDIV);
}

//TO DISPLAY THE SELECTED EVENT ADDRESS ON THE ADJACENT MAP
function displayAddressOnMap(item){
   displayOnMap(item.getAttribute('data-info'));
   //console.log(item.getAttribute('data-info'));
}

//CALLABLE FUNCTION FROM UI BASED UPON THE EVENT TYPE
function getEventsToUI(eventType){
   $("#event-list").empty();
   address = $("#search-bar").val();
   if((address == null) || (address == "")) {
      alert("Please provide City Name or Zip Code to search events.")
   } else {
      showLoader = true;
      loaderStatusCheck();
       $("#mapDisplay").removeClass("hidden");
       displayOnMap(address); //Display the selected city on the map
       queryEvents(eventType, address, noOfRecords, dateRange);
   };
}

// Execute a function when the user click on search button

$(document).ready(function(){

   loaderStatusCheck();

   $("#submit-btn").click(function(e){
      // Cancel the default action, if needed
      e.preventDefault();
      address = $("#search-bar").val();
      console.log('User Input Captured: ' + address);
      getEventsToUI(''); // Display events
    });

   $("#next-events").click(function(e){
   // Cancel the default action, if needed
   e.preventDefault();
   $('html,body').animate({ scrollTop: $('#page-top-anchor').offset().top});
   pageNum ++;
   getEventsToUI(''); // Display events
   });

   $("#previous-events").click(function(e){
      // Cancel the default action, if needed
      e.preventDefault();
      $('html,body').animate({ scrollTop: $('#page-top-anchor').offset().top});
      pageNum --;
      getEventsToUI(''); // Display events
   });

});

 