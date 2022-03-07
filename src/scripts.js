/* ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~ */
import "./css/base.scss";
import {getData, postData} from "./api-calls"
import dayjs from "dayjs";
import domUpdates from "./dom-updates";
import Traveler from "./Traveler";

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
    getData("http://localhost:3001/api/v1/travelers/"),
    getData("http://localhost:3001/api/v1/trips"),
    getData("http://localhost:3001/api/v1/destinations")
  ]).then((data) => {
    allTravelersData = data[0].travelers;
    allTripsData = data[1].trips;
    allDestinationsData = data[2].destinations;
    const id = allTravelersData[getRandomIndex(allTravelersData)].id
    createTraveler(id);
    currentTraveler.getMyTrips(allTripsData)
    domUpdates.greetUser(currentTraveler);
    domUpdates.updateTravelerScr(currentTraveler, allTripsData, allDestinationsData)
    domUpdates.displayTrips(currentTraveler, allDestinationsData)

  });
};

const loadPage = () => {
  getAllData();
  domUpdates.displayTodayDate(currentDate)
};

window.onload = loadPage;
