import Popup from './popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSbmForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__inputs');
    this._handleSbmForm = handleSbmForm;

  }
  _getInputValues() {
    this._inputs = this._form.querySelectorAll('.input');
    this._formValues = {};
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      debugger;
      this._handleSbmForm(this._getInputValues())
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}