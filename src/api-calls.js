import domUpdates from "./dom-updates";

const getData = (address) => {
  return fetch(address)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      // domUpdates.showError(
      //   "Sorry, we were unable to retrieve your data. Please contact @nikseif to file a complaint"
      // );
    });
};

const post = (address, inputData) => {
  return fetch(address, {
    method: "POST",
    body: JSON.stringify(inputData),
    headers: { "Content-Type": "application/json" },
  }).catch((error) => {
    console.log(error);
    // domUpdates.showError(
    //   "Sorry, we were unable to record your data. Please contact @hfaerber to file a complaint"
    // );
  });
};

export {getData, post}