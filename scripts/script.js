let profileEditButton = document.querySelector(".lead__pencil"); //кнопка с карандашом//
let crossClosePopup = document.querySelector(".popup__close-cross"); //крест закрытия попапа//
let leadElementInitial = document.querySelector(".lead__title"); //имя исследователя//
let leadElementExplorer = document.querySelector(".lead__subtitle"); //звание исследователя//
let inputName = document.querySelector(".popup__input-text_type_name"); //поле ввода имени исследователя//
let inputExplorer = document.querySelector(".popup__input-text_type_explorer"); //поле ввода звания исследователя//
let popup = document.querySelector(".popup"); //подложка попапа//
let submitButton = document.querySelector(".popup__submit-btn"); //кнопка сохранить изменения//
let formElement = document.querySelector(".popup__inputs"); //поля ввода//
let titleAddCardForm = document.querySelector(".popup__title"); //название формы//

//функция открытия попапа//
function openPopup() {
  popup.classList.add("popup_opened");
}
//функция закрытия попапа//
function closePopup() {
  popup.classList.remove("popup_opened");
}
//открытие формы заполнения и вывод предыдущих значений//
profileEditButton.addEventListener("click", function () {
  openPopup();
  inputName.value = leadElementInitial.textContent;
  inputExplorer.value = leadElementExplorer.textContent;
});
//закрытие формы через крест//
crossClosePopup.addEventListener("click", closePopup);

//закрытие формы  и сохранение данных исследователей//
function handleFormSubmit(evt) {
  evt.preventDefault();
  leadElementInitial.textContent = inputName.value;
  leadElementExplorer.textContent = inputExplorer.value;
  closePopup();
}
formElement.addEventListener("submit", handleFormSubmit);

//ПЕРЕМЕННЫЕ для ПОПАПА ИЗМЕНЕНИЯ  КАРТОЧКИ//

let crossClosePopupCard = document.querySelector(".popup-card__close-cross"); //крест закрытия попапа для карточек//
let popupCard = document.querySelector(".popup-card"); //подложка попапа для карточек//
let addCardButton = document.querySelector(".lead__button"); //кнопка добавления/изменения карточки//
let addImageNode = document.querySelectorAll(".foto-grid__item"); //список блоков изображений карточек//
let formElementCard = document.querySelector(".popup-card__inputs"); //поля ввода формы для карточек//
let sectionGrid = document.querySelector(".foto-grid"); //cекция для карточек//
//ДОБАВЛЕНИЕ КАРТОЧЕК//
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

let addLinkPoint = document.querySelector(".popup-card__input-text_type_link"); //поле ввода ссылки на картинку//
let addPlacePoint = document.querySelector(".popup-card__input-text_type_place");//поле для ввода имени карточки)

const cardTemplate = document.querySelector(".foto-grid__template").content;//темплейт для создания карточек//

//функция для вставки новой карточки//

function addCard() {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(
    ".foto-grid__name-title"
  ).textContent = addPlacePoint.value;
  cardElement.querySelector(".foto-grid__item").src = addLinkPoint.value;
  sectionGrid.prepend(cardElement);
}

//функция вставки массива карточек//

initialCards.forEach(function add(item){
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".foto-grid__name-title").textContent = item.name;
  cardElement.querySelector(".foto-grid__item").src = item.link;
  //удаление карточки//
  let urnButton = cardElement.querySelector(".foto-grid__urn");
  urnButton.addEventListener("click", function (evt) {
    let deletUrnButton = evt.target.closest(".foto-grid__card");
    deletUrnButton.remove();
    console.logg(add);
  });
 //лайки//
  let heartButton = cardElement.querySelector(".foto-grid__name-heart");
  heartButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("foto-grid__name-heart_black");
  });
  sectionGrid.append(cardElement);
});

//функция очистки формы//
function clearForm() {
  addPlacePoint.value = "";
  addLinkPoint.value = "";
}

//функция для отправки формы//
function cardFormSubmit(evt) {
  evt.preventDefault();
  addCard();
  closePopupCard();
  clearForm();
}
//слушатель для отправки формы//
formElementCard.addEventListener("submit", cardFormSubmit);

//ФУНКЦИИ ФОРМЫ ДЛЯ  ЗАМЕНЫ КАРТОЧЕК//

//функция открытия формы для создания карточек//
function openPopupCard() {
  popupCard.classList.add("popup_opened");
}

//функция закрытия формы для создания карточек//
function closePopupCard() {
  popupCard.classList.remove("popup_opened");
  clearForm();
}
//открытие формы для создания карточек//
addCardButton.addEventListener("click", function () {
  addPlacePoint.setAttribute("placeholder", "Название");
  addLinkPoint.setAttribute("placeholder", "Ссылка на картинку");
  openPopupCard();
});

//закрытие формы для создания карточек крестом//
crossClosePopupCard.addEventListener("click", closePopupCard);


