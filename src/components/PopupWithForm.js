import { Popup } from "./Popup.js"; // Adjust the import path as needed

export class PopupWithForm extends Popup {
  // Constructor to initialize popup and form
  constructor(popupSelector, submitCallback) {
    super(popupSelector); // Call the parent constructor
    this.submitCallback = submitCallback; // Store the callback function for form submission
    this.formElement = this.popup.querySelector(".popup__form"); // Select the form element
    this._getInputValues = this._getInputValues.bind(this); // Bind method for use in event listener
  }

  // Private method to collect input values from the form
  _getInputValues() {
    const inputs = this.formElement.querySelectorAll(".popup__input"); // Select all input fields
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value; // Collect input values into an object
    });
    return values; // Return the collected values
  }

  // Override the setEventListeners method to add a submit event listener
  setEventListeners() {
    super.setEventListeners(); // Call the parent's setEventListeners method

    // Add a submit event listener to the form
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission
      const data = this._getInputValues(); // Get the input values
      this.submitCallback(data); // Call the submission handler with the input values
      this.close(); // Close the popup after submission
    });
  }

  // Method to reset the form fields
  resetForm() {
    this.formElement.reset(); // Reset the form fields
  }
}
