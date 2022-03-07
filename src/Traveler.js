import Trip from "./Trip";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

class Traveler {
  constructor({
    id,
    name,
    travelerType
  }) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.userLogin = `traveler${this.id}`;
    this.password = "travel";
    this.trips = [];
    this.todayDate = dayjs().format("YYYY/MM/DD");
  }

  getFirstName() {
    const firstName = this.name.split(" ")[0];
    return firstName;
  }

  getMyTrips(trips, destinations) {
    this.trips = trips.filter((trip) => trip.userID === this.id);
  }

  getMyAnnualSpending(trips, destinations) {
    const year = dayjs().subtract(1, "year").format("YYYY/MM/DD");
    this.trips = trips.filter((trip) => trip.userID === this.id);
    const annualTrips = this.trips.filter(
      (trip) => dayjs(trip.date).format("YYYY") === dayjs().format("YYYY")
    );
    let subTotal = destinations.reduce((sum, location) => {
      annualTrips.forEach((trip) => {
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
      return sum;
    }, 0);
    let result = subTotal + subTotal * 0.1;
    return result;
  }

  createTripRequest(date, duration, numTravelers, destination) {
    const trip = new Trip(id, destinationID, travelers, date, duration)
    return trip
  }
}


export default Traveler;
