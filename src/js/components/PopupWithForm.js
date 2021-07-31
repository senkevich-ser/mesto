import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSbmForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__inputs");
    this._inputs = this._form.querySelectorAll(".input");
    this._handleSbmForm = handleSbmForm;
  }
  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSbmForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._form.querySelector(".popup__submit-btn").textContent =
        "Сохранение...";
    } else {
      this._form.querySelector(".popup__submit-btn").textContent = "Сохранить";
    }
  }
}
