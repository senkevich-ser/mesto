import Popup from "./popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }
  open({ name, link }) {
    super.open();
    this._popup.querySelector(".foto-open__name").textContent = name;
    this._popup.querySelector(".foto-open__image").src = link;
    this._popup.querySelector(".foto-open__image").alt = name;
  }
}
