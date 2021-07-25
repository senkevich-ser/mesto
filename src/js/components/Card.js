export default class Card {
  constructor(item, ownerID, cardSelector, handleCardClick,
    {handleDeleteCard,handleClickLike}) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes.length;
    this._itemOwnerId = item.owner._id;
    this._ownerId = ownerID;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleClickLike = handleClickLike;
  }
  //метод возвращения разметки//
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".foto-grid__card")
      .cloneNode(true);
    return cardElement;
  }
  //метод установки кнопок удаления карточек//
  _getView() {
    if (this._ownerId === this._itemOwnerId) {
    this._element.querySelector('.foto-grid__urn').classList.add('foto-grid__urn_show');
}
}
  //метод подготовки карточки к публикации//
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".foto-grid__item").src =
      this._link;
    this._element.querySelector(
      ".foto-grid__name-title"
    ).textContent = this._name;
    this._element.querySelector(".foto-grid__item").alt =
      this._name;
      this._element.querySelector(".foto-grid__likesQty").textContent =
      this._likes;
      this._getView()
    return this._element;
  }
  //метод удаления карточки//
  cardDelete() {
    this._element.remove();
    this._element = null;
}
isLiked() {
  return this._isLiked;
}
//метод для добавления лайков//
setLike(data) {
  this._isLiked = data.likes.filter((item) => { return item._id == this._ownerId }).length > 0;//проверка на наличие моих лайков
  this._element.querySelector(".foto-grid__likesQty").textContent = data.likes.length;
  if (this._isLiked) {
      this._element.querySelector(".foto-grid__name-heart").classList.add("foto-grid__name-heart_black");
  } else {
      this._element.querySelector(".foto-grid__name-heart").classList.remove("foto-grid__name-heart_black");
  }
}
  
  //СПИСОК СЛУШАТЕЛЕЙ//

  _setEventListeners() {
    //слушатель удаления карточки//
    this._element
      .querySelector(".foto-grid__urn")
      .addEventListener("click", () => {
        this._handleDeleteCard()
      });
    //слушатель лайка//
    this._element
      .querySelector(".foto-grid__name-heart")
      .addEventListener("click", (evt) => {
        this._handleClickLike();
      });
    //слушатель превью карточки//
    this._element
      .querySelector(".foto-grid__item")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });
  }
}
