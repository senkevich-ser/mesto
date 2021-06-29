import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import { initialCards, popupElement } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../utils/config.js";
import Section from "../components/Section.js";
/* import Popup from '../components/Popup.js'; */
import PopupWithImage from "../components/popupWithImage.js";
//ПЕРЕМЕННЫЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ (РП)//
const openEditProfilePopupBtn = document.querySelector(".lead__pencil"); //кнопка с карандашом// //крест закрытия попапа//
/* const crossClosePopup = document.querySelector(".popup__close-cross"); */ const leadElementInitial =
  document.querySelector(".lead__title"); //имя исследователя//
const leadElementExplorer = document.querySelector(".lead__subtitle"); //звание исследователя//

const formEditing = document.forms.formExplorers; //переменная полей формы РП//
const inputName = formEditing.elements.initialExplorer; //поле ввода имени исследователя//
const inputExplorer = formEditing.elements.rankExplorer; //поле ввода звания исследователя//
const profilePopup = document.querySelector(".profile-popup"); //подложка попапа//
const editProfileForm = document.querySelector(".popup__inputs"); //поля ввода//

//ПЕРЕМЕННЫЕ ФОРМЫ ДОБАВЛЕНИЯ  КАРТОЧКИ(ДК)//
const formAdding = document.forms.formCards; //переменная полей формы ДК//
const inputPlace = formAdding.elements.placeName;
const inputFoto = formAdding.elements.linkName;
const popupCard = document.querySelector(".popup-card"); //подложка формы ДК// //кнопка создать карточку//
const addCardForm = document.querySelector(".popup-card__inputs"); //поля ввода формы ДК//
const openAddCardPopupBtn = document.querySelector(".lead__button"); //кнопка открытия формы ДК//

document.addEventListener("click", (evt) => {
  menagePopups(evt);
});

function menagePopups(evt) {
  if (evt.target.classList.contains("lead__pencil")) {
    const editProfPopup = new Popup(".popup");
    editProfPopup.open();
  }
  if (evt.target.classList.contains("lead__button")) {
    const addCardfPopup = new Popup(".popup-card");
    addCardfPopup.open();
  }
}

function handleCardClick(data) {
  const popupImage = new PopupWithImage(".foto-open");
  popupImage.open(data);
}
/* 
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
}); */

//ДОБАВЛЕНИЕ КАРТОЧЕК//
//добавление карточек из массива//

function cards(dataCards) {
  const cardOfList = new Section(
    {
      data: dataCards,
      renderer: (item) => {
        const card = new Card(item, ".foto-grid__template");
        const cardElement = card.generateCard();
        cardOfList.addItem(cardElement);
      },
    },
    ".foto-grid"
  );
  cardOfList.renderItems();
}
cards(initialCards);

//функция генерации новой карточки//
/* function addNewCard() {
  let cardData = [{}];
  cardData[0].name = inputPlace.value;
  cardData[0].link = inputFoto.value;
  cards(cardData)
  console.log(cardData)
} */

//функция для отправки формы ДК//
/* function submitCardForm(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addNewCard();
} */
//слушатель для отправки формы ДК//

/* addCardForm.addEventListener("submit", submitCardForm); */

//слушатель для отправки формы РП//

/* editProfileForm.addEventListener("submit", handleEditProfileFormSubmit); */

//закрытие формы РП через "сохранить" и сохранение данных исследователей//
/* function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  leadElementInitial.textContent = inputName.value;
  leadElementExplorer.textContent = inputExplorer.value;
  closePopup(profilePopup);
} */
const editFormValidator = new FormValidator(config, formEditing);
const cardFormValidator = new FormValidator(config, formAdding);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
