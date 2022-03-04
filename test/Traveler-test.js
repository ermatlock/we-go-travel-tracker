import chai from 'chai';
const expect = chai.expect;
import Traveler from "../src/Traveler";

describe("User", () => {
  let userData1;
  let userData2;
  let userData3;
  let user1;
  let user2;

  beforeEach(() => {
    userData1 = {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
      }
    userData2 = {
        id: 2,
        name: "Rachael Vaughten",
        travelerType: "thrill-seeker"
      }
    userData3 = {
        id": 3,
        name: "Sibby Dawidowitsch",
        travelerType: "shopper"
      }

    user1 = new User(userData1);
    user2 = new User(userData2);
  });

});
