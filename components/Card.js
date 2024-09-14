export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._getTemplate();
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true);
  }

  _setEventListeners() {
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }

  generateCard() {
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTextEl = this._cardElement.querySelector(".card__text");

    cardImageEl.src = this._data.link;
    cardImageEl.alt = this._data.name;
    cardTextEl.textContent = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
