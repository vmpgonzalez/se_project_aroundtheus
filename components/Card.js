export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._getTemplate();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardTextEl = this._cardElement.querySelector(".card__text");
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true);
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }

  generateCard() {
    this._cardImageEl.src = this._data.link;
    this._cardImageEl.alt = this._data.name;
    this._cardTextEl.textContent = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
