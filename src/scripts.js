/* ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~ */
import './css/base.scss';
import dayjs from 'dayjs'
import domUpdates from './dom-updates'
import Traveler from './Traveler'

/* ~~~~~~~~~~~~~~~~~~Image Imports~~~~~~~~~~~~~~~~~~~~~ */
import './images/turing-logo.png'
import Traveler from './Traveler';


/* ~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~ */
const tripsList = document.getElementById(tripsList)
const annualSpent = document.getElementById(annualSpent)
const welcome = document.getElementById(welcome) 
const today = document.getElementById(today)

/* ~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~ */
let allTravelersData, travelerData, allTripsData, allDestinationsData, /* travelerTrips, newTripId, currentTrip, userList */;
let currentDate = dayjs().format('dddd, MMM D, YYYY');

/* ~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~ */
const createTraveler (id, travelers) => {
  currentTraveler = new Traveler(travelers.find(traveler => traveler.id === id)));
}

const getAllData = () => {
  Promise.all([
    fetch("http://localhost:3001/api/v1/travelers/"),
    fetch("http://localhost:3001/api/v1/trips"),
    fetch("http://localhost:3001/api/v1/destinations"),
  ]).then((data) => {
    allTravelersData = data[0];
    allTripsData = data[1];
    allDestinationsData = data[2];
    const id = 2
    createTraveler(id, travelers)
  })
}

const loadPage = () => {
  getAllData();
};


window.onload = loadPage;