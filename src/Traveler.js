import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

class Traveler {
  constructor({ id, name, travelerType }) {
    this.id = id || 0;
    this.name = name || "not-submitted";
    this.travelerType = travelerType || "not-submitted";
    this.userLogin = `traveler${this.id}`;
    this.password = "travel";
    this.trips = [];
    this.pending = [];
    this.todayDate = dayjs().format("YYYY/MM/DD");
  }

  getFirstName() {
    const firstName = this.name.split(" ")[0];
    return firstName;
  }

  getMyTrips(trips) {
    this.trips = trips.filter((trip) => trip.userID === this.id);
  }

  getMyAnnualSpending(trips, destinations) {
    const year = dayjs().subtract(1, "year").format("YYYY/MM/DD");
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

  getNewTrip(newTrip, destinations) {
    this.pending.push(newTrip);
    let subTotal = destinations.reduce((sum, location) => {
      if (newTrip.destinationID === location.id) {
        let travelersPerRoom = Math.ceil(newTrip.travelers / 2);
        let lodging =
          location.estimatedLodgingCostPerDay *
          travelersPerRoom *
          newTrip.duration;
        let flights =
          location.estimatedFlightCostPerPerson * 2 * newTrip.travelers;
        sum += travelersPerRoom + lodging + flights;
      }
      return sum;
    }, 0);
    let result = subTotal + subTotal * 0.1;
    return result;
  }
}

export default Traveler;
