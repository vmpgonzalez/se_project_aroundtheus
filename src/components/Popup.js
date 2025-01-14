export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this.popup.querySelector(".popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }
    this.popup.addEventListener("pointerdown", (evt) => {
      if (evt.target === this.popup) {
        this.close();
      }
    });
  }
}
