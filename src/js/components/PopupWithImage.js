import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupName = this._popup.querySelector(".foto-open__name");
    this._popupImage = this._popup.querySelector(".foto-open__image");
  }
  open(name, link) {
    super.open();
    this._popupName.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}
