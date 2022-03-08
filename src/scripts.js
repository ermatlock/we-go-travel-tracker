/* ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~ */
import "./css/base.scss";
import {getData, postData} from "./api-calls"
import dayjs from "dayjs";
import domUpdates from "./dom-updates";
import Traveler from "./Traveler";
import Trip from "./Trip"
import MicroModal from 'micromodal';

/* ~~~~~~~~~~~~~~~~~~Image Imports~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~ */
let allTravelersData,
  allTripsData,
  allDestinationsData,
  currentTraveler,
  travelerData;
/* travelerTrips, newTripId, currentTrip, userList */
let currentDate = dayjs().format("dddd, MMM D, YYYY");

/* ~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~ */
const createTraveler = (id) => {
  currentTraveler = new Traveler(
    allTravelersData.find((traveler) => traveler.id === id)
  );
};

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};


const getAllData = () => {
  Promise.all([
    getData("travelers"),
    getData("trips"),
    getData("destinations")
  ]).then((data) => {
    allTravelersData = data[0].travelers;
    allTripsData = data[1].trips;
    allDestinationsData = data[2].destinations;
    const id = allTravelersData[getRandomIndex(allTravelersData)].id
    // const id = 2
    createTraveler(id);
    currentTraveler.getMyTrips(allTripsData)
    domUpdates.greetUser(currentTraveler);
    domUpdates.updateTravelerScr(currentTraveler, allTripsData, allDestinationsData)
    domUpdates.displayTrips(currentTraveler, allDestinationsData)
    domUpdates.populateOptions(allDestinationsData)

  });
};

const addNewTrip = (newTrip) => {
  postData("trips", newTrip)
  currentTraveler.trips.push(newTrip)
  console.log(currentTraveler)
  domUpdates.updateTravelerScr(currentTraveler, allTripsData, allDestinationsData)
  domUpdates.displayTrips(currentTraveler, allDestinationsData)
}

const submitTrip = (e) => {
  e.preventDefault;
  const newTrip = {
    id: Date.now(),
    userID: currentTraveler.id,
    destinationID: parseInt(inputDestination.value),
    travelers: parseInt(inputTravelers.value),
    date: dayjs(inputDate.value).format("YYYY/MM/DD"),
    duration: parseInt(inputDuration.value),
    status: 'pending',
    suggestedActivities: []
  }
  addNewTrip(newTrip)
  domUpdates.clearForm(allDestinationsData)
}

const loadPage = () => {
  getAllData();
  domUpdates.displayTodayDate(currentDate)
};

/* ~~~~~~~~~~~~~~~MICROMODAL~~~~~~~~~~~~~~~~~~ */
document.addEventListener("DOMContentLoaded", function() {
  try {
    MicroModal.init({
      awaitCloseAnimation: true, // set to false, to remove close animation
      onShow: function(modal) {
        console.log("micromodal open");
        addModalContentHeight('short');
      },
      onClose: function(modal) {
        console.log("micromodal close");
      }
    });
  } catch (e) {
    console.log("micromodal error: ", e);
  }
});

function addModalContentHeight(type) {
  var type = (arguments[0] != null) ? arguments[0] : 'short';
  var modalContainer = $("#modal-container");
  var modalHeader = $("#modal-header");
  var modalContentContent = $("#modal-content-content");
  var modalContent = $("#modal-content");
  var modalFooter = $("#modal-footer");

  var modalIsDefined =
    modalContainer.length &&
    modalHeader.length && 
    modalContent.length &&
    modalFooter.length;

  if (modalIsDefined) {
    var modalContainerHeight = modalContainer.outerHeight();
    var modalHeaderHeight = modalHeader.outerHeight();
    var modalFooterHeight = modalFooter.outerHeight();

    console.log("modalContainerHeight: ", modalContainerHeight);
    console.log("modalHeaderHeight: ", modalHeaderHeight);
    console.log("modalFooterHeight: ", modalFooterHeight);
    
    var offset = 80;
    
    var height = modalContainerHeight - (modalHeaderHeight + modalFooterHeight + offset);
    
    console.log('height: ',height);
    
    if(!isNaN(height)){
      height = height > 0 ? height: 20;
      if(type == 'short'){
        modalContent.css({'height': height + 'px'});
      }
      else{
        modalContainer.css({'height': '100%', 'overflow-y': 'hidden', 'margin-top': '40px'});
        modalContentContent.css({'height': '100%', 'overflow-y': 'auto'});
        modalContent.css({'overflow-y': 'visible'});
        modalFooter.css({'margin-bottom': '120px'});
      }
      setTimeout(function(){
        modalContent.css({'display': 'block'});
        var modalContentDOM = document.querySelector('#modal-content');
        modalContentDOM.scrollTop = 0;
      });
    }
    
  }
  
}

/*~~~~~~~~~~~~~~~INITIAL LOADER~~~~~~~~~~~~~~~~~*/
window.onload = loadPage;

/*~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~*/
submitTripBtn.addEventListener("click", submitTrip)
// tripForm.addEventListener("submit", submitTrip)
