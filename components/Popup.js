export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseListener = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleCloseClick(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-cross")
    ) {
      this.close();
    }
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleCloseListener);
    this.setEventListeners();
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleCloseListener);
  }
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      this._handleCloseClick(evt);
    });
  }
}
