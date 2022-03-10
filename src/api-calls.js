import domUpdates from "./dom-updates";

const getData = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error.message);
      domUpdates.showError(
        "Sorry, we were unable to retrieve your data. Please contact @nikseif to file a complaint"
      );
    });
};

const postData = (address, inputData) => {
  return fetch(`http://localhost:3001/api/v1/${address}`, {
    method: "POST",
    body: JSON.stringify(inputData),
    headers: { "Content-Type": "application/json" },
  }).catch((error) => {
    console.warn(error.message);
    domUpdates.showError(
      "Sorry, we were unable to record your data. Please contact @hfaerber to file a complaint"
    );
  });
};

export {getData, postData}