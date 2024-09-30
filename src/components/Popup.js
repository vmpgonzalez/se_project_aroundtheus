export class Popup {
  // Constructor to initialize popup element and event handler
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector); // Select the popup element
    this._handleEscClose = this._handleEscClose.bind(this); // Bind Esc key handler
  }

  // Public method to open the popup
  open() {
    this.popup.classList.add("popup_opened"); // Add 'popup_opened' class
    document.addEventListener("keydown", this._handleEscClose); // Add Esc key listener
  }

  // Public method to close the popup
  close() {
    this.popup.classList.remove("popup_opened"); // Remove 'popup_opened' class
    document.removeEventListener("keydown", this._handleEscClose); // Remove Esc key listener
  }

  // Private method to handle Esc key closing
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(); // Close popup when 'Esc' is pressed
    }
  }

  // Public method to set event listeners for the close button and overlay click
  setEventListeners() {
    const closeButton = this.popup.querySelector(".popup__close"); // Select the close button
    closeButton.addEventListener("click", () => this.close()); // Close popup on close button click

    // Close popup when clicking on the overlay (outside the popup content)
    this.popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this.popup) {
        this.close(); // Close popup if clicking on overlay
      }
    });
  }
}
