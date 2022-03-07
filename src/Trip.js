class Trip {
  constructor(id, destinationID, travelers, date, duration) {
    this.id = Date.now();
    this.userID = id || 0;
    this.destinationID = destinationID || 0;
    this.travelers = travelers || 0;
    this.date = date || 'no date'
    this.duration = duration || 0
    this.status = 'pending'
    this.suggestedActivities = []
    // this.estimatedLodgingCostPerDay = 
    // this.estimatedFlightCostPerPerson
    // this.destination = 
  }
}

export default Trip