/*~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~*/
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const errorMessage = document.getElementById("errorMessage");
const welcome = document.getElementById("welcome");
const today = document.getElementById("today");
const annualSpent = document.getElementById("annualSpent");
const tripsList = document.getElementById("tripsList");
const tripForm = document.getElementById("tripForm")
const inputDate = document.getElementById("inputDate")
const inputDuration = document.getElementById("inputDuration")
const inputTravelers = document.getElementById("inputTravelers")
const inputDestination = document.getElementById("inputDestination")
const submitTripBtn = document.getElementById("submitTripBtn")


/*~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~*/
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const domUpdates = {
  showError(message) {
    errorMessage.innerText = message;
    modal.style.display = "block";
  },

  greetUser(currentTraveler) {
    welcome.innerText = `Welcome, ${currentTraveler.getFirstName()}!`;
  },

  displayTodayDate(currentDate) {
    today.innerText = currentDate;
  },

  displayTrips(currentTraveler, allDestinationsData) {
    tripsList.innerHTML = "";
    const sorted = currentTraveler.trips.sort((a, b) => new Date(b.date) - new Date(a.date))
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
              <p class="tag tag-${color}" >status: ${trip.status}</p>
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
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    annualSpent.innerText = `You spent ${formatter.format(result)} this year.`;
  },

  populateOptions(allDestinationsData) {
    inputDestination.innerHTML = `<option value="" disabled selected>--Select a destination--</option>`
    allDestinationsData.forEach(location => {
      inputDestination.innerHTML += `<option value="${location.id}" >${location.destination}</option>`
    })
  },

  clearForm(allDestinationsData) {
    inputTravelers.value = '1'
    inputDuration.value = '1'
    inputDate.value = 'mm/dd/yyyy'
    this.populateOptions(allDestinationsData)
  },

  showNewTripCost(newTrip, currentTraveler, allDestinationsData) {
    currentTraveler.getNewTrip(newTrip, allDestinationsData)
  }
};

export default domUpdates;
