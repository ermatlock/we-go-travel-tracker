import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/Traveler";
import trips from "./test-data-trips";
import travelers from "./test-data-travelers";
import destinations from "./test-data-destinations";
import Trip from "../src/Trip";
import dayjs from "dayjs";

let traveler1;
let traveler2;
let allTrips;
let user2Trips;
let allDestinations;
let userInput;
let today;

describe("Traveler", () => {
  beforeEach(() => {
    allTrips = trips;
    allDestinations = destinations;
    user2Trips = [
      {
        id: 89,
        userID: 2,
        destinationID: 10,
        travelers: 5,
        date: "2019/09/27",
        duration: 13,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 100,
        userID: 2,
        destinationID: 6,
        travelers: 6,
        date: "2020/3/28",
        duration: 10,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 116,
        userID: 2,
        destinationID: 7,
        travelers: 3,
        date: "2020/04/03",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 166,
        userID: 2,
        destinationID: 7,
        travelers: 2,
        date: "2020/03/05",
        duration: 6,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 203,
        userID: 2,
        destinationID: 12,
        travelers: 6,
        date: "2022/03/05",
        duration: 7,
        status: "approved",
        suggestedActivities: [],
      },
    ];
    // userInput = new Trip(2, 1, 2, "2022/03/12", 4)
    today = dayjs().format("YYYY/MM/DD");

    traveler1 = new Traveler(travelers[1]);
    traveler2 = new Traveler(travelers[3]);
  });

  it("should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("should create an instance of Traveler", () => {
    expect(traveler1).to.be.instanceOf(Traveler);
  });

  it("should have a user id", () => {
    expect(traveler1.id).to.equal(2);
    expect(traveler2.id).to.equal(0);
  });

  it("should have a name", () => {
    expect(traveler1.name).to.equal("Rachael Vaughten");
    expect(traveler2.name).to.equal("not-submitted");
  });

  it("should have a traveler type", () => {
    expect(traveler1.travelerType).to.equal("thrill-seeker");
    expect(traveler2.travelerType).to.equal("not-submitted");
  });

  it("should have a login name", () => {
    expect(traveler1.userLogin).to.equal("traveler2");
    expect(traveler2.userLogin).to.equal("traveler0");
  });

  it("should have a password", () => {
    expect(traveler1.password).to.equal("travel");
    expect(traveler2.password).to.equal("travel");
  });

  it("should start with travelers trips as an empty array", () => {
    expect(traveler1.trips).to.eql([]);
    expect(traveler2.trips).to.eql([]);
  });

  it("should have today's date", () => {
    expect(traveler1.todayDate).to.equal(today);
    expect(traveler2.todayDate).to.equal(today);
  });

  it("should collect all traveler's trip data", () => {
    traveler1.getMyTrips(allTrips);
    traveler2.getMyTrips(allTrips);
    expect(traveler1.trips).to.eql(user2Trips);
    expect(traveler2.trips).to.eql([]);
  });

  it("should get a total of my annual spending", () => {
    traveler1.getMyTrips(allTrips)
    traveler2.getMyTrips(allTrips)
    const total1 = traveler1.getMyAnnualSpending(allTrips, allDestinations);
    const total2 = traveler2.getMyAnnualSpending(allTrips, allDestinations);
    expect(total1).to.equal(19308.3);
    expect(total2).to.equal(0);
  });

  it("should get a total a new trip", () => {
    traveler1.getMyTrips(allTrips)
    traveler2.getMyTrips(allTrips)
    const newTrip = {
      id: 1646717899163,
      userID: 2,
      destinationID: 10,
      travelers: 4,
      date: "2022/03/12",
      duration: 4,
      status: "pending",
      suggestedActivities: [],
    };
    const total1 = traveler1.getNewTrip(newTrip, allDestinations);
    const total2 = traveler2.getNewTrip(newTrip, allDestinations);
    expect(total1).to.equal(4754.2);
    expect(total2).to.equal(4754.2);
    expect(traveler1.pending).to.eql([newTrip])
  });
});
