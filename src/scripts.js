/* ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~ */
import "./css/base.scss";
import { getData, postData } from "./api-calls";
import dayjs from "dayjs";
import domUpdates from "./dom-updates";
import Traveler from "./Traveler";
import Trip from "./Trip";
import MicroModal from "micromodal";

/* ~~~~~~~~~~~~~~~~~~Image Imports~~~~~~~~~~~~~~~~~~~~~ */
import "./images/wego-logo.svg"
/* ~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~ */
let allTravelersData,
  allTripsData,
  allDestinationsData,
  currentTraveler,
  currentId,
  travelerData,
  newTrip;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
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

const getAllData = (id) => {
  Promise.all([
    getData("travelers"),
    getData("trips"),
    getData("destinations"),
  ]).then((data) => {
    allTravelersData = data[0].travelers;
    allTripsData = data[1].trips;
    allDestinationsData = data[2].destinations;
    const id = allTravelersData[getRandomIndex(allTravelersData)].id;
    // const id = 2
    createTraveler(id);
    currentTraveler.getMyTrips(allTripsData);
    domUpdates.greetUser(currentTraveler);
    domUpdates.updateTravelerScr(
      currentTraveler,
      allTripsData,
      allDestinationsData
    );
    domUpdates.displayTrips(currentTraveler, allDestinationsData);
    domUpdates.populateOptions(allDestinationsData);
  });
};

const submitTrip = (e) => {
  e.preventDefault;
  newTrip = {
    id: Date.now(),
    userID: currentTraveler.id,
    destinationID: parseInt(inputDestination.value),
    travelers: parseInt(inputTravelers.value),
    date: dayjs(inputDate.value).format("YYYY/MM/DD"),
    duration: parseInt(inputDuration.value),
    status: "pending",
    suggestedActivities: [],
  };

  domUpdates.showNewTripRequest(newTrip, allDestinationsData);

  // addNewTrip(newTrip)
  // domUpdates.clearForm(allDestinationsData)
};

const addNewTrip = (e) => {
  e.preventDefault;
  domUpdates.hide(newTripModal)
  postData("trips", newTrip);
  currentTraveler.trips.push(newTrip);
  console.log(currentTraveler);
  domUpdates.updateTravelerScr(
    currentTraveler,
    allTripsData,
    allDestinationsData
  );
  domUpdates.displayTrips(currentTraveler, allDestinationsData);
  domUpdates.showNewTripCost(newTrip, currentTraveler, allDestinationsData);
};

const loadPage = () => {
  getAllData();
  domUpdates.displayTodayDate(currentDate);
};

const getUserId = () => {
  currentId = loginNameInput.value.slice(8);
  verifyLogIn();
};

const verifyLogIn = () => {
  let userLogin = loginNameInput.value.slice(0, 8);
  if (userLogin === 'traveler' && loginPassword.value === 'travel') {
    domUpdates.loginSubmit();
  } else {
    domUpdates.showError("Sorry, your user ID or password is invalid. please try again");
  }
};



/*~~~~~~~~~~~~~~~INITIAL LOADER~~~~~~~~~~~~~~~~~*/
window.onload = 

/*~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~*/
submitTripBtn.addEventListener("click", addNewTrip)
letsGoBtn.addEventListener("click", submitTrip);
cancelBtn.addEventListener("click", function() {
  domUpdates.hide(newTripModal)
})

export {
  allTravelersData,
  allTripsData,
  allDestinationsData,
  currentTraveler,
  formatter,
  currentDate,
  newTrip
};
