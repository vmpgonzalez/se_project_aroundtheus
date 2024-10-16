import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this.formElement = this.popup.querySelector(".popup__form");
    this._submitButton = this.formElement.querySelector(".popup__button");
    this._getInputValues = this._getInputValues.bind(this);
  }

  // input list
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
    const hasEmptyFields = this.inputList.some((input) => !input.value.trim());
    if (hasEmptyFields) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add("popup__button_disabled");
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove("popup__button_disabled");
    }
  }

  setEventListeners() {
    super.setEventListeners();

    // Add event listener to each input
    this.inputList.forEach((input) => {
      input.addEventListener("input", () => this._toggleSubmitButtonState());
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

  open() {
    super.open();
    this._toggleSubmitButtonState();
  }

  resetForm() {
    this.formElement.reset();
  }
}
