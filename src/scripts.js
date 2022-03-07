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

/* ~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~ */
const welcome = document.getElementById("welcome");
const today = document.getElementById("today");
const annualSpent = document.getElementById("annualSpent");
const tripsList = document.getElementById("tripsList");
const errorMessage = document.getElementById("errorMessage");

/* ~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~ */
const createTraveler = (id) => {
  currentTraveler = new Traveler(
    allTravelersData.find((traveler) => traveler.id === id)
  );
};

const getAllData = () => {
  Promise.all([
    getData("http://localhost:3001/api/v1/travelers/"),
    getData("http://localhost:3001/api/v1/trips"),
    getData("http://localhost:3001/api/v1/destinations")
  ]).then((data) => {
    allTravelersData = data[0].travelers;
    console.log(allTravelersData);
    allTripsData = data[1].trips;
    console.log(allTripsData);
    allDestinationsData = data[2].destinations;
    console.log(allDestinationsData);
    const id = 2;
    createTraveler(id);
    // currentTraveler.getMyTrips(allTripsData)
    console.log(currentTraveler)
    domUpdates.greetUser(currentTraveler);
    domUpdates.updateTravelerScr()
  });
};

const loadPage = () => {
  getAllData();
  domUpdates.displayTodayDate(currentDate)
};

window.onload = loadPage;
