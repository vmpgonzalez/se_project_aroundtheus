export class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    { handleLikeClick, handleDeleteClick }
  ) {
    this._data = data;
    this._id = data._id;
    this._isLiked = Boolean(data.isLiked);
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTextEl = this._cardElement.querySelector(".card__text");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked);
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
  }

  generateCard() {
    this._cardImageEl.src = this._data.link;
    this._cardImageEl.alt = this._data.name;
    this._cardTextEl.textContent = this._data.name;
    this.updateLikes(this._isLiked);
    this._setEventListeners();
    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
