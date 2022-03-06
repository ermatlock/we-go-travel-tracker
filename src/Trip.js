class Trip {
  constructor({destinationID = 0, travelers = 0, date = "date missing", duration = 0, status = 'pending', suggestedActivities []}) {
    this.id = Date.now();
    this.userID = id;
    this.destinationID = destinationID
    this.travelers = travelers
    this.date = date
    this.duration = duration
    this.status = status
    this.suggestedActivities = suggestedActivities
  }
}