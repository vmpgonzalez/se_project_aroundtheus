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
const popupOpened = document.querySelector(".popup");
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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");

/* Functions */

// Close popup
function closePopup(Popup) {
  Popup.classList.remove("popup_opened");
}

// Get card element
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", function () {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewImageCaption.textContent = cardData.name;
    openPopup(previewImagePopupWindow);
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTextEl.textContent = cardData.name;

  return cardElement;
}

// Open popup
function openPopup(Popup) {
  Popup.classList.add("popup_opened");
}

// Handle Escape key press
function handleEscKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Close popup with optional event handling
function closePopup(Popup, event) {
  if (event) {
    event.stopPropagation();
  }
  Popup.classList.remove("popup_opened");
}

// Render card
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/* Event Handlers */

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
  renderCard({ name, link }, cardListEL);
  e.target.reset();
  closePopup(addCardPopup);
}

/* Event Listeners */

// Open profile edit popup
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

// Close profile edit popup
profilePopupCloseButton.addEventListener("click", () =>
  closePopup(profileEditPopup)
);

// Handle profile edit form submission
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Handle add card form submission
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Open add card popup
addNewCardButton.addEventListener("click", () => openPopup(addCardPopup));

// Close add card popup
addCardPopupCloseButton.addEventListener("click", () =>
  closePopup(addCardPopup)
);

// Close preview image popup
previewImageCloseButton.addEventListener("click", () =>
  closePopup(previewImagePopupWindow)
);

// Handle Escape key press
document.addEventListener("keydown", handleEscKey);

// Render initial cards
initialCards.forEach((cardData) => renderCard(cardData, cardListEL));

// Close popups when clicking outside of them
profileEditPopup.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(profileEditPopup);
  }
});

addCardPopup.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(addCardPopup);
  }
});

previewImagePopupWindow.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(previewImagePopupWindow);
  }
});
