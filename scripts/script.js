const profileEditButton = document.querySelector(".lead__pencil"); //кнопка с карандашом//
const crossClosePopup = document.querySelector(".popup__close-cross"); //крест закрытия попапа//
const leadElementInitial = document.querySelector(".lead__title"); //имя исследователя//
const leadElementExplorer = document.querySelector(".lead__subtitle"); //звание исследователя//
const inputName = document.querySelector(".popup__input-text_type_name"); //поле ввода имени исследователя//
const inputExplorer = document.querySelector(
  ".popup__input-text_type_explorer"
); //поле ввода звания исследователя//
const popup = document.querySelector(".popup"); //подложка попапа//
const submitButton = document.querySelector(".popup__submit-btn"); //кнопка сохранить изменения//
const formElements = document.querySelector(".popup__inputs"); //поля ввода//
const titleAddCardForm = document.querySelector(".popup__title"); //название формы//
const crossClosePopupFoto = document.querySelector(".foto-open__cross"); //крест закрытия попапа с фото//

//функция открытия попапа//
function openPopup() {
  popup.classList.add("popup_opened");
}
//функция закрытия попапа//
function closePopup() {
  popup.classList.remove("popup_opened");
  /* clearForm(); */
}
//функция закрытия попапа с фото//
function closePopupFoto() {
  fotoCard.classList.remove("popup_opened");
}

//закрытие формы через крест//
crossClosePopup.addEventListener("click", closePopup);
//закрытие попапа с фото//
crossClosePopupFoto.addEventListener("click", closePopupFoto);

//ПЕРЕМЕННЫЕ для ПОПАПА C ФОРТО//

const fotoCard = document.querySelector(".foto-open"); //подложка попапа c фото//
const addCardButton = document.querySelector(".lead__button"); //кнопка открытия попапа для изменения карточки//

//слушатель открытия  формы заполнения и вывод предыдущих значений//

profileEditButton.addEventListener("click", function () {
  openPopup();
  inputName.value = leadElementInitial.textContent;
  inputExplorer.value = leadElementExplorer.textContent;
  titleAddCardForm.textContent = "Редактировать профиль";
  submitButton.textContent = "Сохранить";
  formElements.removeEventListener("submit", cardFormSubmit);
  formElements.addEventListener("submit", handleFormSubmit);
});

// слушатель открытия попапа для добавления карточек//

addCardButton.addEventListener("click", function () {
  openPopup();
  titleAddCardForm.textContent = "Новое место";
  inputName.setAttribute("placeholder", "Название");
  inputExplorer.setAttribute("placeholder", "Ссылка на картинку");
  submitButton.textContent = "Создать";
  formElements.addEventListener("submit", cardFormSubmit);
  formElements.removeEventListener("submit", handleFormSubmit);
});

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
const sectionGrid = document.querySelector(".foto-grid"); //cекция для карточек//
const cardTemplate = document.querySelector(".foto-grid__template").content; //переменная темплейта//

//функция для генерации карточек//
function addCard(Card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".foto-grid__name-title").textContent = Card.name;
  cardElement.querySelector(".foto-grid__item").src = Card.link;
  cardElement.querySelector(".foto-grid__item").alt = Card.name;

  //удаление карточки//
  const urnButton = cardElement.querySelector(".foto-grid__urn");
  urnButton.addEventListener("click", function (evt) {
    const deletUrnButton = evt.target.closest(".foto-grid__card");
    deletUrnButton.remove();
  });
  //лайки//
  const heartButton = cardElement.querySelector(".foto-grid__name-heart");
  heartButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("foto-grid__name-heart_black");
  });
  //открытие попапа с фото//
  const imageButton = cardElement.querySelector(".foto-grid__item");
  const imageLink = document.querySelector(".foto-open__image");
  const nameCard = document.querySelector(".foto-open__name");
  imageButton.addEventListener("click", function () {
    fotoCard.classList.add("popup_opened");
    nameCard.textContent = Card.name;
    imageLink.src = Card.link;
  });
  return cardElement;
}

function renderCard(Card) {
  sectionGrid.prepend(Card);
}
//функция генерации новой карточки//
function inatialCard() {
  const inputText = inputName.value;
  const inputLink = inputExplorer.value;
  const cardItem = addCard({ name: inputText, link: inputLink });
  sectionGrid.prepend(cardItem);
  clearForm();
}

//цикл вставки массива карточек//

initialCards.forEach((item) => {
  renderCard(addCard(item));
});

//функция очистки формы//
function clearForm() {
  inputName.value = "";
  inputExplorer.value = "";
}

//функция для отправки формы//
function cardFormSubmit(evt) {
  evt.preventDefault();
  closePopup();
  inatialCard();
}
//слушатель для отправки формы//

formElements.addEventListener("submit", cardFormSubmit);

//закрытие формы  и сохранение данных исследователей//
function handleFormSubmit(evt) {
  evt.preventDefault();
  leadElementInitial.textContent = inputName.value;
  leadElementExplorer.textContent = inputExplorer.value;
  closePopup();
  clearForm();
}
formElements.addEventListener("submit", handleFormSubmit);
