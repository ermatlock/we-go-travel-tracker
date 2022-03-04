import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/Traveler";

describe("User", () => {
  let userData1;
  let userData2;
  let user1;
  let user2;

  beforeEach(() => {
    user1Data = {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer",
    };
    user2Data = {
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker",
    };
    user3Data = {
      id: undefined,
      name: undefined,
      travelerType: undefined,
    };

    user1 = new User(user1Data);
    user2 = new User(user2Data);
    user3 = new User(user3Data);
  });
});
