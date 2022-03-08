/* ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~ */
import "./css/base.scss";
import {getData, postData} from "./api-calls"
import dayjs from "dayjs";
import domUpdates from "./dom-updates";
import Traveler from "./Traveler";
import Trip from "./Trip"

/* ~~~~~~~~~~~~~~~~~~Image Imports~~~~~~~~~~~~~~~~~~~~~ */
import "./images/turing-logo.png";

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
    // const id = allTravelersData[getRandomIndex(allTravelersData)].id
    const id = 2
    createTraveler(id);
    currentTraveler.getMyTrips(allTripsData)
    domUpdates.greetUser(currentTraveler);
    domUpdates.updateTravelerScr(currentTraveler, allTripsData, allDestinationsData)
    domUpdates.displayTrips(currentTraveler, allDestinationsData)
    domUpdates.populateOptions(allDestinationsData)

  });
};

const addNewTrip = (newTrip) => {
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
  console.log(newTrip)
  // currentTraveler.addNewTrip(newTrip)
  addNewTrip(newTrip)
  postData("trips", newTrip)
  // domUpdates.updateTravelerScr(currentTraveler, allTripsData, allDestinationsData)
  // domUpdates.displayTrips(currentTraveler, allDestinationsData)

  
}

const loadPage = () => {
  getAllData();
  domUpdates.displayTodayDate(currentDate)
};

window.onload = loadPage;

/*~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~*/
submitTripBtn.addEventListener("click", submitTrip)
// tripForm.addEventListener("submit", submitTrip)
