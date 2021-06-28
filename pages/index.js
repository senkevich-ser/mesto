import Card from '../components/Card.js';
import { initialCards, popupElement, popupImage, popupCloseButton, popupElementName } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../utils/config.js";
import Section from "../components/Section.js";
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
openEditProfilePopupBtn.addEventListener("click", function () {
  openPopup(profilePopup);
  editFormValidator.disableForm();
  inputName.value = leadElementInitial.textContent;
  inputExplorer.value = leadElementExplorer.textContent;
});

// слушатель открытия формы ДК//
openAddCardPopupBtn.addEventListener("click", function () {
  openPopup(popupCard);
  cardFormValidator.disableForm();
});

//ДОБАВЛЕНИЕ КАРТОЧЕК//
//добавление карточек из массива//

  const cardOfList = new Section(
  {
    data:initialCards,
    renderer: (item) => {
      const card = new Card(item, ".foto-grid__template");
      const cardElement = card.generateCard();
      cardOfList.addItem(cardElement);
    },
  },
  ".foto-grid"
);
cardOfList.renderItems();
/* cards(initialCards) */


//функция генерации новой карточки//
function addNewCard() {
  let cardData = [{}];
  cardData.name  = inputPlace.value;
  cardData.link= inputFoto.value;
  const cardOfForm = new Section(
    {
      data:cardData,
      renderer: (item) => {
        const card = new Card(item, ".foto-grid__template");
        const cardElement = card.generateCard();
        cardOfForm.addItem(cardElement);
      },
    },
    ".foto-grid"
  );
  cardOfForm.renderItems();
  /* cards(initialCards) */  
}

//функция для отправки формы ДК//
function submitCardForm(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addNewCard();
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
const editFormValidator = new FormValidator(config, formEditing);
const cardFormValidator = new FormValidator(config, formAdding);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
