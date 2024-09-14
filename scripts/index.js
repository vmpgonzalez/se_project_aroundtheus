import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";

// Function to handle image clicks
function handleImageClick(cardData) {
  previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageCaption.textContent = cardData.name;
  openPopup(previewImagePopupWindow);
}

// Render card
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card.generateCard());
}

/* Initial Cards Data */
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* DOM Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditPopup = document.querySelector("#profile-edit-popup");
const addCardPopup = document.querySelector("#profile-add-popup");
const addCardFormElement = addCardPopup.querySelector(".popup__form");
const previewImagePopupWindow = document.querySelector(".js-preview-popup");
const previewImageElement = document.querySelector(".popup__preview-image");
const previewImageCaption = document.querySelector(".popup__preview-title");

const profilePopupCloseButton = profileEditPopup.querySelector(".popup__close");
const addCardPopupCloseButton = addCardPopup.querySelector(".popup__close");
const previewImageCloseButton =
  previewImagePopupWindow.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTitleInput = addCardFormElement.querySelector(
  ".popup__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".popup__input_type_url");
const profileEditForm = profileEditPopup.querySelector(".popup__form");

const cardListEL = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");


let addCardFormValidator;

/* Functions */
// Open popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}

// Close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}

// Handle Esc key press
function handleEscKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Handle profile edit form submission
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
}

// Handle add card form submission
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  // Render the new card
  renderCard({ name, link }, cardListEL);

  // Reset the form and validation state
  e.target.reset();
  addCardFormValidator.resetValidation();

  closePopup(addCardPopup);
}

/* Event Listeners */
// Open profile edit popup
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

// Handle profile edit form submission
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Handle add card form submission
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Open add card popup
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation(); // Reset validation state
  openPopup(addCardPopup);
});

// Close popups when clicking outside of them
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

// Validation settings
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Initialize form validators
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(validationSettings.formSelector);
  forms.forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
    // Special handling for the add card form
    if (formElement === addCardFormElement) {
      addCardFormValidator = formValidator;
    }
  });
});

// Render initial cards
initialCards.forEach((cardData) => renderCard(cardData, cardListEL));
