import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  constructor(data,popupSelector){
    super(popupSelector);
    this._popup = document.querySelector(popupSelector)
    this._name = data.name;
    this._link = data.link;
  }
  open(){
    super.open();
    this._popup.querySelector(".foto-open__name").textContent = this._name;
    this._popup.querySelector(".foto-open__image").src = this._link;
  }
}