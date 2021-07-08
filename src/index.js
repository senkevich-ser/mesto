import './index.css';
import UserInfo from "./js/components/UserInfo.js";
import PopupWithForm from "./js/components/PopupWithForm.js";
import Card from "./js/components/Card.js";
import { initialCards, editProfBtn,addCardBtn } from "./js/utils/constants.js";
import FormValidator from "./js/components/FormValidator.js";
import { config } from "./js/utils/config.js";
import Section from "./js/components/Section.js";
import PopupWithImage from "./js/components/PopupWithImage.js";

const formEditing = document.forms.formExplorers; //переменная полей формы РП//

const formAdding = document.forms.formCards; //переменная полей формы ДК//

const addUser = new UserInfo(".lead__title", ".lead__subtitle");

//кнопка открытия попапа редактирования профиля
  editProfBtn.addEventListener("click", () => {
  formEditing.elements.initialExplorer.value= addUser.getUserInfo().name;
  formEditing.elements.rankExplorer.value= addUser.getUserInfo().description;
  editProfPopup.open();
  editFormValidator.enableValidation();
});
//кнопка отгрытия попапа добавления карточки
  addCardBtn.addEventListener("click", () => {
  addCardfPopup.open();
  cardFormValidator.enableValidation();
});

const editProfPopup = new PopupWithForm(".profile-popup", (data) => {
  addUser.setUserInfo(data);
  editProfPopup.close();
});


const addCardfPopup = new PopupWithForm(".popup-card", (data) => {
  const cardData = [{}];
  cardData[0].name = data.placeName;
  cardData[0].link = data.linkName;
  cards(cardData);
  addCardfPopup.close();
});

const popupImage = new PopupWithImage(".foto-open");

editProfPopup.setEventListeners();
popupImage.setEventListeners();
addCardfPopup.setEventListeners();

function cards(dataCards) {
  const cardOfList = new Section(
    {
      data: dataCards,
      renderer: (item) => {
        const card = new Card(item, ".foto-grid__template", (evt) => {
          const data = {};
          data.name = evt.target.alt;
          data.link = evt.target.src;
          popupImage.open(data);
        });
        const cardElement = card.generateCard();
        cardOfList.addItem(cardElement);
      },
    },
    ".foto-grid"
  );
  cardOfList.renderItems();
}
cards(initialCards);

const editFormValidator = new FormValidator(config, formEditing);
const cardFormValidator = new FormValidator(config, formAdding);
