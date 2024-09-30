export class Card {
  // Constructor to initialize card data and elements
  constructor(data, cardSelector, handleImageClick) {
    this._data = data; // Card data
    this._cardSelector = cardSelector; // Card template selector
    this._handleImageClick = handleImageClick; // Function to handle image clicks
    this._cardElement = this._getTemplate(); // Card element created from template
    this._cardImageEl = this._cardElement.querySelector(".card__image"); // Image element
    this._likeButton = this._cardElement.querySelector(".card__like-button"); // Like button element
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    ); // Delete button element
    this._cardTextEl = this._cardElement.querySelector(".card__text"); // Text element
  }

  // Method to get the card template from the DOM
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true); // Clone the template
  }

  // Method to set up event listeners for card interactions
  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data); // Handle image click
    });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active"); // Toggle like state
    });

    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove(); // Remove card from DOM
    });
  }

  // Method to generate the card with data and set up listeners
  generateCard() {
    this._cardImageEl.src = this._data.link; // Set image source
    this._cardImageEl.alt = this._data.name; // Set image alt text
    this._cardTextEl.textContent = this._data.name; // Set card text

    this._setEventListeners(); // Initialize event listeners

    return this._cardElement; // Return the fully constructed card
  }
}
