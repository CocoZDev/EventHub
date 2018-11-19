// Default API Setting
var eventType = "music";
var address;
var dateRange = "future";
var noOfRecords = 4;

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

// FUNCTION TO DISPLAY EVENTS FOR A GIVEN CITY NAME
function queryEvents(eventType, address, noOfRecords, dateRange)
{
   var oArgs = {
      app_key: "Gp5KnQs4HTZ9gpPJ", //APP KEY FOR USING "EVENTFUL" API
      q: eventType, //SEARCH ON THE TYPE OF EVENT e.g, MUSIC, FAMILY, BUSINESS
      where: address, //THIS COULD BE CITY NAME OR ADDRESS
      "date": dateRange, //"2017080100-2017103000" or "THIS-MONTH" or "FUTURE"
      page_size: noOfRecords, //NO. OF RECORDS TO FETCH FROM THE QUERY
      sort_order: "popularity", //SORTING RELEVANCE
      within: "50", // WITHIN HOW MANY MILES
   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
      var cloneEvent;
      for (var i=0; i<oData.events.event.length; i++){

         event.title = oData.events.event[i].title;
         event.url = oData.events.event[i].url;
         if(oData.events.event[i].image.medium.url !== null){
            event.imgSrc = oData.events.event[i].image.medium.url;
         }
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
      }
   });
}

function createEventDiv(event){
    var eventDIV = 
        `<div class='row eventList'>
            <div class="col-xs-3">
                <a href='${event.url}' target='_blank'>
                <img class='img-rounded project' src='${event.imgSrc}'alt='event image' width='100%'></a>
            </div>
            <div class="col-xs-6" id="event-details">
                <h3 class='title'>${event.title}</h3>
                <br>${event.start_time}
                <br>${event.venue_address}, ${event.city}, ${event.region}
                <br>Venue: ${event.venue_name}
                <br>
                <a class='link' href='#'  target='_blank' onclick='displayAddressOnMap(this);return false;' data-info='${event.venue_address}'>View Map</a> | 
                <a class='link' href='${event.url}' target='_blank'>Event Details</a>
            </div>
        </div>`;
       
    var eventsHolder = $('#eventsDisplay');
    eventsHolder.append(eventDIV);

}

//TO DISPLAY THE SELECTED EVENT ADDRESS ON THE ADJACENT MAP
function displayAddressOnMap(item){
   displayOnMap(item.getAttribute('data-info'));
   //console.log(item.getAttribute('data-info'));
}

//CALLABLE FUNCTION FROM UI BASED UPON THE EVENT TYPE
function getEventsToUI(eventType){
   $("#eventsDisplay").empty();
   address = $("#search-bar").val();
   if((address == null) || (address == "")) {
      alert("Please provide City and State to search nearby events.")
   } else {
       queryEvents(eventType, address, noOfRecords, dateRange);
   };
}
