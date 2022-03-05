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
  }

  getMyTrips({ trips }) {
    this.trips = trips.filter((trip) => trip.userID === this.id);
  }

  // getMyAnnualSpending({trips}, {destinations}) {
  //   this.trips = trips.filter((trip) => trip.userID === this.id);
  //   this.trips.reduce((sum, trip) {
  //     trip.
  //   return sum
  //   }, 0)  
  // }
}

export default Traveler;
