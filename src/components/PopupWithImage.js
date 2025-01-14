import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imageElement = this.popup.querySelector(".popup__preview-image");
    this.captionElement = this.popup.querySelector(".popup__preview-title");
  }

  open(data) {
    this.imageElement.src = data.link;
    this.imageElement.alt = data.name;
    this.captionElement.textContent = data.name;
    super.open();
  }
}
