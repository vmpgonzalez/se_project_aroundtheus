export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    const cardImageEl = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    deleteButton.addEventListener("click", () => {
      console.log("delete");
      cardElement.remove();
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTextEl = cardElement.querySelector(".card__text");

    cardImageEl.src = this._data.link;
    cardImageEl.alt = this._data.name;
    cardTextEl.textContent = this._data.name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
