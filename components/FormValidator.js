export class FormValidator {
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

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._settings.errorClass);
    errorElement.classList.add(this._settings.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
    inputElement.classList.remove(this._settings.errorClass);
    errorElement.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasValidInputs() {
    return this._inputList.every((input) => input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasValidInputs()) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  disableButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
