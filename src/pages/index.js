import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { validationSettings } from "../utils/utils.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import "../pages/index.css";

// Instances
const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
deleteCardPopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "61ecb13e-4f99-4418-af88-5f3fba3801df",
    "Content-Type": "application/json",
  },
});

// DOM elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit-icon");
const avatarForm = document.querySelector("#avatar-edit-form");

// User info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Form validators
const profileEditFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#profile-edit-popup .popup__form")
);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#profile-add-popup .popup__form")
);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationSettings, avatarForm);
avatarFormValidator.enableValidation();

// Popups
const profileEditPopup = new PopupWithForm(
  "#profile-edit-popup",
  handleProfileEditSubmit,
  profileEditFormValidator
);
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#profile-add-popup",
  handleAddCardFormSubmit,
  addCardFormValidator
);
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".js-preview-popup");
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  "#edit-avatar-popup",
  handleAvatarFormSubmit,
  avatarFormValidator
);
avatarPopup.setEventListeners();

// Functions
function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

function createCard(cardData) {
  const card = new Card(
    { ...cardData, currentUserId: userInfo.getUserInfo()._id },
    "#card-template",
    handleImageClick,
    {
      handleLikeClick: (cardId, isCurrentlyLiked) => {
        const likePromise = isCurrentlyLiked
          ? api.dislikeCard(cardId)
          : api.likeCard(cardId);
        likePromise
          .then((updatedCard) => {
            card.updateLikes(updatedCard.isLiked);
          })
          .catch((err) => {
            console.error("Error toggling like:", err);
          });
      },
      handleDeleteClick: (cardId) => {
        deleteCardPopup.open();
        deleteCardPopup.setSubmitAction(() => {
          api
            .deleteCard(cardId)
            .then(() => {
              card.removeCard();
              deleteCardPopup.close();
            })
            .catch((err) => console.error("Error deleting card:", err));
        });
      },
    }
  );
  return card.generateCard();
}

function handleProfileEditSubmit(data) {
  profileEditPopup.setLoadingState(true);
  api
    .updateUserProfile({ name: data.title, about: data.description })
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        job: updatedUser.about,
      });
      profileEditPopup.close();
    })
    .catch((err) => console.error("Error updating profile:", err))
    .finally(() => {
      profileEditPopup.setLoadingState(false);
    });
}

function handleAddCardFormSubmit(data) {
  addCardPopup.setLoadingState(true);
  api
    .addCard({ name: data.title, link: data.url })
    .then((newCard) => {
      const cardElement = createCard(newCard);
      section.addItem(cardElement, "prepend");
      addCardPopup.close();
    })
    .catch((err) => console.error("Error adding card:", err))
    .finally(() => {
      addCardPopup.setLoadingState(false);
    });
}

function handleAvatarFormSubmit(data) {
  avatarPopup.setLoadingState(true);
  api
    .updateAvatar(data.avatar)
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        job: updatedUser.about,
        avatar: updatedUser.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => {
      avatarPopup.setLoadingState(false);
    });
}

// Section for cards
const section = new Section(
  { items: [], renderer: createCard },
  ".cards__list"
);

// Load initial data
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, cards]) => {
    userInfo.setUserInfo({
      name: userInfoData.name,
      job: userInfoData.about,
      avatar: userInfoData.avatar,
      _id: userInfoData._id,
    });
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error loading initial data:", err);
  });

// Event listeners
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});
