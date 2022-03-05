import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/Traveler";
import trips from "./test-data-trips";
import travelers from "./test-data-travelers"
import destinations from "./test-data-destinations"

let traveler1
let traveler2 //sad path
let userTrips
let userTrips2
describe("Traveler", () => {
  beforeEach(() => {
    userTrips = trips.trips.filter(trip => trip.userID === 2);
    traveler1 = new Traveler(travelers.travelers[1], userTrips);
    traveler2 = new Traveler(travelers.travelers[3], userTrips);

  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should create an instance of Traveler', () => {
    expect(traveler1).to.be.instanceOf(Traveler);
  });

  it('should have a user id', () => {
    expect(traveler1.id).to.equal(2);
    expect(traveler2.id).to.equal(0);
  });

  it('should have a name', () => {
    expect(traveler1.name).to.equal("Rachael Vaughten");
    expect(traveler2.name).to.equal("name not submitted")
  });

  it('should have a traveler type', () => {
    expect(traveler1.travelerType).to.equal("thrill-seeker");
    expect(traveler2.travelerType).to.equal("not selected")
  });

  });

