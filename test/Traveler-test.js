import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/Traveler";
import trips from "./test-data-trips";
import travelers from "./test-data-travelers"
import destinations from "./test-data-destinations"

let traveler1
let traveler2 //sad path
let userTrips
let userTrips2 //sad path
describe("Traveler", () => {
  beforeEach(() => {
    userTrips = trips.trips.filter(trip => trip.userID === 2);
    userTrips2 = 
    traveler1 = new Traveler(travelers.travelers[1]);
    traveler2 = new Traveler(travelers.travelers[3]);

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

  it('should have a login name', () => {
    expect(traveler1.userLogin).to.equal("traveler2");
    expect(traveler2.userLogin).to.equal("traveler0")
  })

  it('should have a password', () => {
    expect(traveler1.password).to.equal("travel");
    expect(traveler2.password).to.equal("travel")
  })

  it('should start with travelers trips as an empty array', () => {
    expect(traveler1.trips).to.eql([]);
    expect(traveler2.trips).to.eql([]);
  })




  });

