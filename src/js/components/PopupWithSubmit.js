import Popup from './Popup.js';

export default class PopupWithSubmit  extends Popup{
  constructor(popupSelector){
    super(popupSelector)
    this._form = document.querySelector('.popup-deleteCard')
  }
  setFormSubmit(handler){
    this.setFormSubmit = handler;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.setFormSubmit();
    });
}
}