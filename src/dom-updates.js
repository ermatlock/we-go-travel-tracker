import {
  allTravelersData,
  allTripsData,
  allDestinationsData,
  currentTraveler,
  formatter,
  currentDate,
} from "./scripts";
/*~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~*/
const errorModal = document.getElementById("errorModal");
const newTripModal = document.getElementById("newTripModal");
const newTripContent = document.getElementById("newTripContent");
const span = document.getElementsByClassName("close")[0];
const errorMessage = document.getElementById("errorMessage");
const welcome = document.getElementById("welcome");
const today = document.getElementById("today");
const annualSpent = document.getElementById("annualSpent");
const tripsList = document.getElementById("tripsList");
const tripForm = document.getElementById("tripForm");
const inputDate = document.getElementById("inputDate");
const inputDuration = document.getElementById("inputDuration");
const inputTravelers = document.getElementById("inputTravelers");
const inputDestination = document.getElementById("inputDestination");
const letsGoBtn = document.getElementById("letsGoBtn");
const submitTripBtn = document.getElementById("submitTripBtn");
const cancelBtn = document.getElementById("cancelBtn")
const loginPage = document.querySelector('.login-page');
const dashboard = document.querySelector('.dashboard');
const loginBtn = document.getElementById("login")
const formSection = document.querySelector(".form-section")
const inputUserName = document.getElementById("userName")
const inputPassword = document.getElementById("inputPassword")
const header = document.querySelector(".header")

/*~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~*/
span.onclick = function () {
  domUpdates.undisplay(errorModal)
};
window.onclick = function (event) {
  if (event.target == errorModal) {
    domUpdates.undisplay(errorModal)
  }
};

const domUpdates = {

  display(element) {
    element.style.display = "block";
  },

  undisplay(element) {
    element.style.display = "none"
  },

  show(element) {
    element.classList.remove("hidden");
  },

  hide(element) {
    element.classList.add("hidden");
  },

  showError(message) {
    errorMessage.innerText = message;
    this.display(errorModal)
  },

  greetUser(currentTraveler) {
    welcome.innerText = `Welcome, ${currentTraveler.getFirstName()}!`;
  },

  displayTodayDate(currentDate) {
    today.innerText = currentDate;
  },

  displayTrips(currentTraveler, allDestinationsData) {
    tripsList.innerHTML = "";
    const sorted = currentTraveler.trips.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    sorted.forEach((trip) => {
      allDestinationsData.forEach((location) => {
        if (trip.destinationID === location.id) {
          let color = trip.status === "approved" ? "teal" : "pink";
          tripsList.innerHTML += `
          <div class="card" tabindex="0" id="${trip.id}">
            <div class="card-header">
              <img src=${location.image} alt=${location.alt}/>
            </div>
            <div class="card-body">
              <p class="tag font-med tag-${color}" >status: ${trip.status}</p>
              <p>${location.destination}</p>
              <p>Trip Date: ${trip.date}</p>
              <p>Travelers: ${trip.travelers}</p>
              <p>Days: ${trip.duration}</p>
            </div>
          </div>`;
        }
      });
    });
  },

  updateTravelerScr(currentTraveler, allTripsData, allDestinationsData) {
    const result = currentTraveler.getMyAnnualSpending(
      allTripsData,
      allDestinationsData
    );

    annualSpent.innerText = `You spent ${formatter.format(result)} this year.`;
  },

  populateOptions(allDestinationsData) {
    inputDestination.innerHTML = `<option value="" disabled selected>--Select a destination--</option>`;
    allDestinationsData.forEach((location) => {
      inputDestination.innerHTML += `<option value="${location.id}" >${location.destination}</option>`;
    });
  },

  clearForm(allDestinationsData) {
    inputTravelers.value = "1";
    inputDuration.value = "1";
    inputDate.value = "mm/dd/yyyy";
    this.populateOptions(allDestinationsData);
  },

  showNewTripCost(newTrip, currentTraveler, allDestinationsData) {
    currentTraveler.getNewTrip(newTrip, allDestinationsData);
  },

  showNewTripRequest(trip, allDestinationsData) {
    const cost = currentTraveler.getNewTrip(trip, allDestinationsData);
    this.display(newTripModal);
    allDestinationsData.forEach((location) => {
      if (trip.destinationID === location.id) {
        let color = trip.status === "approved" ? "teal" : "pink";
        newTripContent.innerHTML = `
        <p>Estimated Cost: ${formatter.format(cost)}</p>
        <div class="card-no-hover" tabindex="0" id="${trip.id}">
          <div class="card-header">
            <img src=${location.image} alt=${location.alt}/>
          </div>
          <div class="card-body">
            <p class="tag tag-${color}" >status: ${trip.status}</p>
            <p>${location.destination}</p>
            <p>Trip Date: ${trip.date}</p>
            <p>Travelers: ${trip.travelers}</p>
            <p>Days: ${trip.duration}</p>
          </div>
        </div>`;
      }
    });
  },
  loginSubmit() {
    this.show(formSection)
    this.show(tripsList)
    this.show(header)
    this.hide(loginPage)
  },
};

export default domUpdates;
