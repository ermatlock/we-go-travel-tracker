import Trip from "./Trip";

class Traveler {
  constructor({
    id = 0,
    name = "name not submitted",
    travelerType = "not selected",
  }) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.userLogin = `traveler${this.id}`;
    this.password = "travel";
    this.trips = [];
    this.tripRequest = {}
  }

  getMyTrips({ trips }) {
    this.trips = trips.filter((trip) => trip.userID === this.id);
  }

  getMyAnnualSpending({ trips }, { destinations }) {
    this.trips = trips.filter((trip) => trip.userID === this.id);
    let subTotal = destinations.reduce((sum, location) => {
      this.trips.forEach((trip) => {
        if (trip.destinationID === location.id) {
          let travelersPerRoom = Math.ceil(trip.travelers / 2);
          let lodging =
            location.estimatedLodgingCostPerDay *
            travelersPerRoom *
            trip.duration;
          let flights =
            location.estimatedFlightCostPerPerson * 2 * trip.travelers;
          sum += travelersPerRoom + lodging + flights;
        }
      });
      return sum  
    }, 0);
    let result = subTotal + (subTotal * .10)
    return result.toFixed(2)
  }

  makeTripRequest(destinationID, travelers, date, duration) {
    this.tripRequest = new Trip(this.id, destinationID, travelers, date, duration)
    
  }


}

export default Traveler;
