/*~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~*/
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const errorMessage = document.getElementById("errorMessage");
const welcome = document.getElementById("welcome");
const today = document.getElementById("today");
const annualSpent = document.getElementById("annualSpent");
const tripsList = document.getElementById("tripsList");

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
    welcome.innerText = `Welcome, ${currentTraveler.getFirstName()}`;
  },

  displayTodayDate(currentDate) {
    today.innerText = currentDate;
  },

  displayTrips(currentTraveler, allDestinationsData) {
    tripsList.innerHTML = "";
    currentTraveler.trips.forEach((trip) => {
      allDestinationsData.forEach((location) => {
        if (trip.destinationID === location.id) {
          let color = trip.status === "approved" ? "teal" : "pink";
          tripsList.innerHTML += `
          <div class="card" id="${trip.id}">
            <div class="card-header">
              <img src=${location.image} alt=${location.alt}/>
            </div>
            <div class="card-body">
              <span class="tag tag-${color}" >status: ${trip.status}</span>
              <h4>${location.destination}</h4>
              <p>Trip Date: ${trip.date}</p>
              <p>Travelers: ${trip.travelers}</p>
              <p>${trip.duration} nights</p>
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
    console.log(result);
    annualSpent.innerText = `You spent ${result} this year.`;
  },
};

export default domUpdates;
