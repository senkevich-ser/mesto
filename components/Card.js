

export default class Card {
  constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
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
  //метод открытия попапа с фото//
  /* _handleOpenFotoPopup() {
    popupImage.src = this._link;
    popupElementName.textContent = this._name;
    popupElementName.alt = `Фото места ${this._name}`;
    popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
  } */

  //метод закрытия попапа с фото//
  /* _handleCloseFotoPopup() {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
  } */
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
  //слушатель открытия попапа с фото//
  _setEventListeners() {
    /* this._element
      .querySelector(".foto-grid__item")
      .addEventListener("click", () => {
        this._handleOpenFotoPopup();
      }); */

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
//функция обработчик кнопки ESC//
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    popupElement.classList.remove("popup_opened");
  }
}
