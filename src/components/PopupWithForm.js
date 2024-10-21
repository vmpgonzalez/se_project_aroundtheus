import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  // Constructor to initialize popup, submit callback, and form validator
  constructor(popupSelector, submitCallback, formValidator) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this.formElement = this.popup.querySelector(".popup__form");
    this._submitButton = this.formElement.querySelector(".popup__button");
    this.formValidator = formValidator;
    this._getInputValues = this._getInputValues.bind(this);
  }

  // Input list
  get inputList() {
    return Array.from(this.formElement.querySelectorAll(".popup__input"));
  }

  // Method to collect input values from the form
  _getInputValues() {
    const values = {};
    this.inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Method to toggle the submit button state
  _toggleSubmitButtonState() {
    // Check if any fields are invalid
    const isValidForm = this.formValidator._hasValidInputs();

    if (isValidForm) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove("popup__button_disabled");
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add("popup__button_disabled");
    }
  }

  // Method to set event listeners for form interactions
  setEventListeners() {
    super.setEventListeners();

    // Add event listener to each input
    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this.formValidator._checkInputValidity(input);
        this._toggleSubmitButtonState();
      });
    });

    // Handle form submission
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this.submitCallback(data);
      this.resetForm();
      this._toggleSubmitButtonState();
      this.close();
    });
  }

  // Method to open the popup and update button state
  open() {
    super.open();
    this._toggleSubmitButtonState();
  }

  // Method to reset the form and validation state
  resetForm() {
    this.formElement.reset();
    this.formValidator.resetValidation();
  }
}
