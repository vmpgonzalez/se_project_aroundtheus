import { Popup } from "../components/Popup.js"; // Adjust the path based on your project structure

export class PopupWithImage extends Popup {
  // Constructor to initialize popup and image elements
  constructor(popupSelector) {
    super(popupSelector); // Call the parent constructor
    this.imageElement = this.popup.querySelector(".popup__preview-image"); // Select the image element in the popup
    this.captionElement = this.popup.querySelector(".popup__preview-title"); // Select the caption element
  }

  // Override the open method to set the image source and caption
  open(data) {
    this.imageElement.src = data.link; // Set the image src attribute
    this.imageElement.alt = data.name; // Set the image alt attribute
    this.captionElement.textContent = data.name; // Set the caption text
    super.open(); // Call the parent's open method to display the popup
  }
}
