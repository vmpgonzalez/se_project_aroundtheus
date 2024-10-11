// Imports
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import "../pages/index.css";

// Select DOM elements
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardFormElement = document.querySelector(
  "#profile-add-popup .popup__form"
);
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");

// Instances
const section = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const profileEditPopup = new PopupWithForm(
  "#profile-edit-popup",
  handleProfileEditSubmit
);

const addCardPopup = new PopupWithForm(
  "#profile-add-popup",
  handleAddCardFormSubmit
);

const imagePopup = new PopupWithImage(".js-preview-popup");

// Event listeners for popups
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

// Function to handle image clicks
function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

// Function to create a new card
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

// Handle profile edit form submission
function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({
    name: data.title || "",
    job: data.description || "",
  });
}

// Handle add card form submission
function handleAddCardFormSubmit(data) {
  const cardElement = createCard({ name: data.title, link: data.url });
  section.addItem(cardElement);
}

// Event listeners for buttons
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileEditPopup.open();

  // Set input values after opening the popup
  profileEditPopup.inputList.forEach((input) => {
    if (input.name === "title") {
      input.value = currentUserInfo.name || "";
    } else if (input.name === "description") {
      input.value = currentUserInfo.job || "";
    }
  });
});
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Initialize form validators
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(validationSettings.formSelector);
  forms.forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
  });
});

// Render initial cards
section.renderItems();
