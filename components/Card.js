

export default class Card {
  constructor(item, cardSelector,handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  //метод возвращения разметки//
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".foto-grid__card")
      .cloneNode(true);
    return cardElement;
  }
  //метод подготовки карточки к публикации//
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._image = this._element.querySelector(".foto-grid__item").src = this._link;
    this._place = this._element.querySelector(".foto-grid__name-title").textContent = this._name;
    this._image = this._element.querySelector(".foto-grid__item").alt = this._name;
    return this._element;
  }
  
  //метод удаления карточки//
  _handleDeletUrnButton(evt) {
    const deletUrnButton = evt.target.closest(".foto-grid__card");
    deletUrnButton.remove();
  }
  //метод для добавления лайка//
  _handleAddLike(evt) {
    evt.target.classList.toggle("foto-grid__name-heart_black");
  }

  //СПИСОК СЛУШАТЕЛЕЙ//
  
  _setEventListeners() {
    
    //слушатель удаления карточки//
    this._element
      .querySelector(".foto-grid__urn")
      .addEventListener("click", (evt) => {
        this._handleDeletUrnButton(evt);
      });
    //слушатель лайка//
    this._element
      .querySelector(".foto-grid__name-heart")
      .addEventListener("click", (evt) => {
        this._handleAddLike(evt);
      });
  }
}

