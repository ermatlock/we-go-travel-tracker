/*~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~*/
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const errorMessage = document.getElementById("errorMessage");

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
    today.innerText = currentDate
  }
  
  // displayTrips(currentTraveler, allTripsData, allDestinationsData) {
  //   tripsList.innerHTML = ""
  //   tripsList.innerHTML = `
  //   `
  // }

  // updateTravelerScr() {
  //   const result = currentTraveler.getMyAnnualSpending(allTripsData,
  //     allDestinationsData)
  //     annualSpent.innerText = `You spent ${result} this year.`
  // }
};

export default domUpdates;
