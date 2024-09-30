export class FormValidator {
  // Constructor to initialize validation settings and form elements
  constructor(settings, formElement) {
    this._settings = settings; // Validation settings
    this._formElement = formElement; // Form element
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    ); // List of input elements
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    ); // Submit button element
  }

  // Method to display input error message
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = inputElement.validationMessage; // Set error message
    inputElement.classList.add(this._settings.errorClass); // Add error class to input
    errorElement.classList.add(this._settings.inputErrorClass); // Add error class to error message
  }

  // Method to hide input error message
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = ""; // Clear error message
    inputElement.classList.remove(this._settings.errorClass); // Remove error class from input
    errorElement.classList.remove(this._settings.inputErrorClass); // Remove error class from error message
  }

  // Method to check input validity and show/hide error
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement); // Show error if input is invalid
    } else {
      this._hideInputError(inputElement); // Hide error if input is valid
    }
  }

  // Method to check if all inputs are valid
  _hasValidInputs() {
    return this._inputList.every((input) => input.validity.valid); // Check validity of all inputs
  }

  // Method to toggle submit button state based on input validity
  _toggleButtonState() {
    if (this._hasValidInputs()) {
      this._submitButton.disabled = false; // Enable button if valid
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.disabled = true; // Disable button if invalid
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    }
  }

  // Method to set up event listeners for input elements
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Check input validity
        this._toggleButtonState(); // Toggle button state
      });
    });
  }

  // Method to reset validation state
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // Hide all error messages
    });
    this._toggleButtonState(); // Update button state
  }

  // Method to disable the submit button
  disableButton() {
    this._submitButton.disabled = true; // Disable the button
    this._submitButton.classList.add(this._settings.inactiveButtonClass); // Add inactive class
  }

  // Method to enable form validation
  enableValidation() {
    this._setEventListeners(); // Set event listeners for inputs
    this._toggleButtonState(); // Initial button state check
  }
}
