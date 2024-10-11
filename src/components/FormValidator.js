export class FormValidator {
  // Constructor to initialize validation settings and form elements
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  // Method to display input error message
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._settings.errorClass);
    errorElement.classList.add(this._settings.inputErrorClass);
  }

  // Method to hide input error message
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
    inputElement.classList.remove(this._settings.errorClass);
    errorElement.classList.remove(this._settings.inputErrorClass);
  }

  // Method to check input validity and show/hide error
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Method to check if all inputs are valid
  _hasValidInputs() {
    return this._inputList.every((input) => input.validity.valid);
  }

  // Method to toggle submit button state based on input validity
  _toggleButtonState() {
    if (this._hasValidInputs()) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    } else {
      this.disableButton();
    }
  }

  // Method to set up event listeners for input elements
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Method to reset validation state
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  // Method to disable the submit button
  disableButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
  }

  // Method to enable form validation
  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
