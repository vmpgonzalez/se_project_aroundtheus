import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  // Constructor to initialize popup and form
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this.formElement = this.popup.querySelector(".popup__form");
    this._getInputValues = this._getInputValues.bind(this);
  }

  // Private method to collect input values from the form
  _getInputValues() {
    const inputs = this.formElement.querySelectorAll(".popup__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Override the setEventListeners method to add a submit event listener
  setEventListeners() {
    super.setEventListeners();

    // Add a submit event listener to the form
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this.submitCallback(data);
      this.close();
    });
  }

  // Method to reset the form fields
  resetForm() {
    this.formElement.reset();
  }
}
