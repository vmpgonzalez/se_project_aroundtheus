import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, formValidator) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this.formElement = this.popup.querySelector(".popup__form");
    this.formValidator = formValidator;
    this._submitButton = this.formElement.querySelector(".popup__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  get inputList() {
    return Array.from(this.formElement.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = this.formElement.querySelectorAll(".popup__input");
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setLoadingState(isLoading, loadingText = "Saving...") {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._defaultButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this.setLoadingState(true);
      this.submitCallback(inputValues);
    });
  }

  resetForm() {
    this.formElement.reset();
    if (this.formValidator) {
      this.formValidator.resetValidation();
    }
  }

  open() {
    if (this.formValidator) {
      this.formValidator.resetValidation();
    }
    super.open();
  }

  close() {
    super.close();
    this.resetForm();
  }
}
