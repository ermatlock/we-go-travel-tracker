import Trip from "./Trip";
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

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
    // this.past = [];
    // this.present = [];
    // this.pending = [];
    this.todayDate = dayjs().format('YYYY/MM/DD')
  }

  getFirstName() {
    const firstName = this.name.split(" ")[0];
    return firstName;
  }

  getMyTrips({ trips }) {
    this.trips = trips.filter((trip) => trip.userID === this.id);
    // this.past = this.trips.filter(trip => dayjs())
  }

  getMyAnnualSpending({ trips }, { destinations }) {
    const year = dayjs().subtract(1, 'year').format('YYYY/MM/DD')
    this.trips = trips.filter((trip) => trip.userID === this.id);
    const annualTrips = this.trips.filter(trip => dayjs(trip.date).format('YYYY') === dayjs().format('YYYY'))
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
      return sum  
    }, 0);
    let result = subTotal + (subTotal * .10)
    return result.toFixed(2)
  }
}

export default Traveler;
