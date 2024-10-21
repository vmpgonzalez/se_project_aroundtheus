import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, formValidator) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this.formElement = this.popup.querySelector(".popup__form");
    this.formValidator = formValidator;
    this._getInputValues = this._getInputValues.bind(this);
  }

  // Method to collect input values from the form
  _getInputValues() {
    const values = {};
    this.inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Input list
  get inputList() {
    return Array.from(this.formElement.querySelectorAll(".popup__input"));
  }

  // Method to set event listeners for form interactions
  setEventListeners() {
    super.setEventListeners();

    // Handle form submission
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this.submitCallback(data);
      this.resetForm();
      this.close();
    });
  }

  // Method to open the popup and reset button state
  open() {
    super.open();
    this.formValidator.resetValidation();
  }

  // Method to reset the form
  resetForm() {
    this.formElement.reset();
    this.formValidator.resetValidation();
  }
}
