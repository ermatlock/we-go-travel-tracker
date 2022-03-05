import { ids } from "webpack"

class Traveler {
  constructor(const {id = 0, name = 'Name not submitted', travelerType = 'Not selected'} = travelerData, userTrips) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.trips = userTrips
    this.tripRequests;

  }
}

export default Traveler