/* Helper Functions */

// Show input error
const showInputError = (input, formEl, { errorClass }) => {
  const errorSpan = formEl.querySelector("#" + input.id + "-error");
  console.log(input.validationMessage);
  errorSpan.textContent = input.validationMessage;
  input.classList.add(errorClass);
};

// Hide input error
const hideInputError = (input, formEl, { errorClass }) => {
  const errorSpan = formEl.querySelector("#" + input.id + "-error");
  errorSpan.textContent = "";
  input.classList.remove(errorClass);
};

// Check if input is valid
const checkInputValidity = (formEl, input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formEl, settings);
  } else {
    showInputError(input, formEl, settings);
  }
};

// Check if all inputs are valid
const hasValidInputs = (inputList) =>
  inputList.every((input) => input.validity.valid === true);

// Toggle button state based on input validity
const toggleButton = (inputList, button, settings) => {
  if (hasValidInputs(inputList)) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  }
};

// Set event listeners for form inputs
const setEventListeners = (formEl, settings) => {
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
  const submitButton = formEl.querySelector(settings.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formEl, input, settings);
      toggleButton(inputList, submitButton, settings);
    });
  });
};

/* Main Validation Function */

// Enable validation for all forms
const enableValidation = (settings) => {
  const formElements = [...document.querySelectorAll(settings.formSelector)];

  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, settings);
  });
};

/* Initialize Validation */
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
