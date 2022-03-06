import Trip from "./Trip";
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

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
    this.todayDate = dayjs().format('YYYY/MM/DD')
  }

  getMyTrips({ trips }) {
    this.trips = trips.filter((trip) => trip.userID === this.id);
  }

  getMyAnnualSpending({ trips }, { destinations }) {
    const year = dayjs().subtract(1, 'year').format('YYYY/MM/DD')
    // console.log(dayjs("2022/03/06"))
    console.log(year)
    // this.trips = trips.filter((trip) => trip.userID === this.id);
    // console.log("filterd by user!!!", this.trips)
    this.trips = trips.filter(trip => dayjs(trip.date).isBetween(year, this.todayDate, 'year'))
    console.log(this.trips)
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

  // makeTripRequest(destinationID, travelers, date, duration) {
  //   this.tripRequest = new Trip(this.id, destinationID, travelers, date, duration)
    
  // }


}

export default Traveler;
