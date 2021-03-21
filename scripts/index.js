import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";
//ПЕРЕМЕННЫЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ (РП)//
const profileEditButton = document.querySelector(".lead__pencil"); //кнопка с карандашом// //крест закрытия попапа//
/* const crossClosePopup = document.querySelector(".popup__close-cross"); */ const leadElementInitial = document.querySelector(
  ".lead__title"
); //имя исследователя//
const leadElementExplorer = document.querySelector(".lead__subtitle"); //звание исследователя//

const formEditing = document.forms.formExplorers; //переменная полей формы РП//
const inputName = formEditing.elements.initialExplorer; //поле ввода имени исследователя//
const inputExplorer = formEditing.elements.rankExplorer; //поле ввода звания исследователя//
const profilePopup = document.querySelector(".profile-popup"); //подложка попапа//
const submitButton = document.querySelector(".popup__submit-btn"); //кнопка сохранить изменения//
const formElements = document.querySelector(".popup__inputs"); //поля ввода//
const titleAddCardForm = document.querySelector(".popup__title"); //название формы//
const popupContainer = document.querySelector(".popup__container"); //форма РП// //крест закрытия формы ДК//

//ПЕРЕМЕННЫЕ ФОРМЫ ДОБАВЛЕНИЯ  КАРТОЧКИ(ДК)//
const formAdding = document.forms.formCards; //переменная полей формы ДК//
const inputPlace = formAdding.elements.placeName;
const inputFoto = formAdding.elements.linkName;
const popupCard = document.querySelector(".popup-card"); //подложка формы ДК//
const submitButtonCard = document.querySelector(".popup-card__submit-btn"); //кнопка создать карточку//
const formElementsCard = document.querySelector(".popup-card__inputs"); //поля ввода формы ДК//
const addCardButton = document.querySelector(".lead__button"); //кнопка открытия формы ДК//
const popups = document.querySelectorAll(".popup"); //NODE лист всех попапов//
const sectionGrid = document.querySelector(".foto-grid"); //cекция для карточек//

//закрытие всех форм  через крест и оверлей//
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-cross")) {
      closePopup(popup);
    }
  });
});

//функция обработчик кнопки ESC//
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened"); //Переменная стиля закрытия попапов//
    closePopup(openedPopup);
  }
}

//функция открытия  попапов и добавления слушателей ESC//
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
//функция закрытия  попапов и удаления слушателей ESC//
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

//слушатель открытия  формы РП  и вывод предыдущих значений//
profileEditButton.addEventListener("click", function () {
  openPopup(profilePopup);
  inputName.value = leadElementInitial.textContent;
  inputExplorer.value = leadElementExplorer.textContent;
});

// слушатель открытия формы ДК//
addCardButton.addEventListener("click", function () {
  openPopup(popupCard);
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
//функция генерации карточек из массива//
initialCards.forEach((item) => {
  const card = new Card(item, ".foto-grid__template_type_default");
  const cardElement = card.generateCard();
  sectionGrid.prepend(cardElement);
});

//функция генерации новой карточки//
function addNewCard() {
  const inputText = inputPlace.value;
  const inputLink = inputFoto.value;
  const cardItem = new Card(
    { name: inputText, link: inputLink },
    ".foto-grid__template_type_default"
  );
  sectionGrid.prepend(cardItem.generateCard());
}

//функция для отправки формы ДК//
function submitCardForm(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addNewCard();
  formAdding.reset();
}
//слушатель для отправки формы ДК//

formElementsCard.addEventListener("submit", submitCardForm);

//закрытие формы РП через "сохранить" и сохранение данных исследователей//
function handleFormSubmit(evt) {
  evt.preventDefault();
  leadElementInitial.textContent = inputName.value;
  leadElementExplorer.textContent = inputExplorer.value;
  closePopup(profilePopup);
}
formElements.addEventListener("submit", handleFormSubmit);

const config = {
  formSelector: ".popup__inputs",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__error_active",
};

const formList = document.querySelectorAll(config.formSelector);

formList.forEach((formElement) => {
  const validatorElement = new FormValidator(config, formElement);
  validatorElement.enableValidation();
});
