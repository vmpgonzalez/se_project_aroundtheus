export class Popup {
  // Constructor to initialize popup element and event handler
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Public method to open the popup
  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Public method to close the popup
  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Private method to handle Esc key closing
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Public method to set event listeners for the close button and overlay click
  setEventListeners() {
    const closeButton = this.popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => this.close());

    // Close popup when clicking on the overlay (outside the popup content)
    this.popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this.popup) {
        this.close();
      }
    });
  }
}
