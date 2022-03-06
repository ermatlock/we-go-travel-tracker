import chai from "chai";
const expect = chai.expect;
import TravelerRepository from "../src/Traveler-Repo";
import trips from "./test-data-trips";
import travelers from "./test-data-travelers"
import destinations from "./test-data-destinations"


describe("TravelerRepo", () => {
  beforeEach(() => {
    
  });

  it('should be a function', () => {
    expect(TravelerRepo).to.be.a('function');
  });

  it('should create an instance of TravelerRepo', () => {
    expect(visitor).to.be.instanceOf(TravelerRepo);
  });
  });

