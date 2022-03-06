


let domUpdates = {
  showError(message) {
    errorMessage.innerText = message;
    modal.style.display = "block";
  },

  greetUser(currentUser) {
    welcome.innerText = `Welcome, ${currentUser.getFirstName()}`;
  },
}

export default domUpdates;