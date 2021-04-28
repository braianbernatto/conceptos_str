export default class nivel {
  constructor() {
    this.events();
  }

  // events
  events() {
    // prevent from sending form data when pressing Enter key
    document
      .querySelector("#addNivelNro")
      .addEventListener("keydown", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("addNivelDescri").focus();
        }
      });
    document
      .querySelector("#updateNivelNro")
      .addEventListener("keydown", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("updateNivelDescri").focus();
        }
      });

    // end of events
  }

  // methods

  //end of methods
}
