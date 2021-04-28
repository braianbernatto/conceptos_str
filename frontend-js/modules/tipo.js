export default class tipo {
  constructor() {
    this.events();
  }

  // events
  events() {
    // prevent from sending form data when pressing Enter key
    document
      .querySelector("#addTipoNro")
      .addEventListener("keydown", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.querySelector("#addProgramaNro").focus();
        }
      });
    document
      .querySelector("#addProgramaNro")
      .addEventListener("keydown", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.querySelector("#addTipoProgramaDescri").focus();
        }
      });

    // end of events
  }

  // methods

  //end of methods
}
