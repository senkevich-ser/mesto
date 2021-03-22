import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";
//ПЕРЕМЕННЫЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ (РП)//
const openEditProfilePopupBtn = document.querySelector(".lead__pencil"); //кнопка с карандашом// //крест закрытия попапа//
/* const crossClosePopup = document.querySelector(".popup__close-cross"); */ const leadElementInitial = document.querySelector(
  ".lead__title"
); //имя исследователя//
const leadElementExplorer = document.querySelector(".lead__subtitle"); //звание исследователя//

const formEditing = document.forms.formExplorers; //переменная полей формы РП//
const inputName = formEditing.elements.initialExplorer; //поле ввода имени исследователя//
const inputExplorer = formEditing.elements.rankExplorer; //поле ввода звания исследователя//
const profilePopup = document.querySelector(".profile-popup"); //подложка попапа//
const editProfileForm = document.querySelector(".popup__inputs"); //поля ввода//
const titleAddCardForm = document.querySelector(".popup__title"); //название формы//
const popupContainer = document.querySelector(".popup__container"); //форма РП// //крест закрытия формы ДК//

//ПЕРЕМЕННЫЕ ФОРМЫ ДОБАВЛЕНИЯ  КАРТОЧКИ(ДК)//
const formAdding = document.forms.formCards; //переменная полей формы ДК//
const inputPlace = formAdding.elements.placeName;
const inputFoto = formAdding.elements.linkName;
const popupCard = document.querySelector(".popup-card"); //подложка формы ДК// //кнопка создать карточку//
const submitButtonCard = document.querySelector(".popup-card__submit-btn");
const addCardForm = document.querySelector(".popup-card__inputs"); //поля ввода формы ДК//
const openAddCardPopupBtn = document.querySelector(".lead__button"); //кнопка открытия формы ДК//
const popups = document.querySelectorAll(".popup"); //NODE лист всех попапов//
const sectionGrid = document.querySelector(".foto-grid"); //cекция для карточек//
const templateSelector = ".foto-grid__template_type_default"; //селектор темплейта//
const spanList = document.querySelectorAll(".popup__error"); //NodeList спанов//

//закрытие всех форм  через крест и оверлей//
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
      formNoActiv();
    }
    if (evt.target.classList.contains("popup__close-cross")) {
      closePopup(popup);
      formNoActiv();
    }
  });
});

//функция сброса полей формы и блокировки кнопки submit//
function formNoActiv() {
  submitButtonCard.classList.add("popup__submit-btn_disabled");
  submitButtonCard.disabled = "disabled";
  formAdding.reset();
}

//функция обработчик кнопки ESC//
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened"); //Переменная стиля закрытия попапов//
    closePopup(openedPopup);
    formNoActiv();
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
  spanList.forEach((errorElement) => {
    errorElement.classList.remove("popup__error_active");
  });
}

//слушатель открытия  формы РП  и вывод предыдущих значений//
openEditProfilePopupBtn.addEventListener("click", function () {
  openPopup(profilePopup);
  inputName.value = leadElementInitial.textContent;
  inputExplorer.value = leadElementExplorer.textContent;
  addFormValidator(formEditing);
});

// слушатель открытия формы ДК//
openAddCardPopupBtn.addEventListener("click", function () {
  openPopup(popupCard);
  addFormValidator(formAdding);
});

//ДОБАВЛЕНИЕ КАРТОЧЕК//

//функция генерации карточек //
function createCard(item, cardSelector) {
  const card = new Card(item, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

//функция генерации карточек из массива//
initialCards.forEach((item) => {
  sectionGrid.prepend(createCard(item, templateSelector));
});

//функция генерации новой карточки//
function addNewCard() {
  const inputText = inputPlace.value;
  const inputLink = inputFoto.value;
  sectionGrid.prepend(
    createCard({ name: inputText, link: inputLink }, templateSelector)
  );
}

//функция для отправки формы ДК//
function submitCardForm(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addNewCard();
  formNoActiv();
}
//слушатель для отправки формы ДК//

addCardForm.addEventListener("submit", submitCardForm);

//слушатель для отправки формы РП//

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

//закрытие формы РП через "сохранить" и сохранение данных исследователей//
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  leadElementInitial.textContent = inputName.value;
  leadElementExplorer.textContent = inputExplorer.value;
  closePopup(profilePopup);
}

const config = {
  formSelector: ".popup__inputs",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__error_active",
};

function addFormValidator(formElement) {
  const validatorElement = new FormValidator(config, formElement);
  validatorElement.enableValidation();
}
