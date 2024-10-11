import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this.formElement = this.popup.querySelector(".popup__form");
    this._getInputValues = this._getInputValues.bind(this);
  }

  //input list
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

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this.submitCallback(data);
      this.close();
      this.resetForm();
    });
  }

  open() {
    super.open();
    this.resetForm();
  }

  resetForm() {
    this.formElement.reset();
  }
}
