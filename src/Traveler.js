
class Traveler {
  constructor({id = 0, name = "name not submitted", travelerType = "not selected"}) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.userLogin = `traveler${this.id}`
    this.password = "travel" 
    // this.trips = userTrips
    // this.tripRequests;
  }
}

export default Traveler