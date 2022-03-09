/* ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~ */
import "./css/base.scss";
import { getData, postData } from "./api-calls";
import dayjs from "dayjs";
import domUpdates from "./dom-updates";
import Traveler from "./Traveler";

/* ~~~~~~~~~~~~~~~~~~Image Imports~~~~~~~~~~~~~~~~~~~~~ */
import "./images/wego-logo.svg";

/* ~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~ */
let allTravelersData,
  allTripsData,
  allDestinationsData,
  currentTraveler,
  newTrip;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
/* travelerTrips, newTripId, currentTrip, userList */
let currentDate = dayjs().format("dddd, MMM D, YYYY");
// let now = dayjs()


/* ~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~ */
const createTraveler = (id) => {
  currentTraveler = new Traveler(
    allTravelersData.find((traveler) => traveler.id === id)
  );
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

const submitTrip = () => {
  if (!inputDate.value || !inputDestination.value) {
    domUpdates.showError("Please enter all information before continuing");
  } else {
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
  }
};

const addNewTrip = (e) => {
  e.preventDefault;
  domUpdates.hide(newTripModal);
  postData("trips", newTrip);
  currentTraveler.trips.push(newTrip);
  domUpdates.updateTravelerScr(
    currentTraveler,
    allTripsData,
    allDestinationsData
  );
  domUpdates.displayTrips(currentTraveler, allDestinationsData);
  domUpdates.showNewTripCost(newTrip, currentTraveler, allDestinationsData);
};

const verifyLogIn = (e) => {
  e.preventDefault();
  let userLogin = inputUserName.value.slice(0, 8);
  let currentId = inputUserName.value.slice(8);
  if (userLogin === "traveler" && inputPassword.value === "travel") {
    domUpdates.loginSubmit();
    getAllData(parseInt(currentId));
    domUpdates.displayTodayDate(currentDate);
  } else {
    domUpdates.showError(
      "Sorry, your user ID or password is invalid. please try again"
    );
    inputUserName.value = "";
    inputPassword.value = "";
  }
};

/*~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~*/
submitTripBtn.addEventListener("click", addNewTrip);
letsGoBtn.addEventListener("click", submitTrip);
cancelBtn.addEventListener("click", function () {
  domUpdates.undisplay(newTripModal);
});
loginBtn.addEventListener("click", verifyLogIn);

export {
  allTravelersData,
  allTripsData,
  allDestinationsData,
  currentTraveler,
  currentDate,
  formatter,
  newTrip
};
