import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../utils/config.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

const formEditing = document.forms.formExplorers; //переменная полей формы РП//

const formAdding = document.forms.formCards; //переменная полей формы ДК//

const addUser = new UserInfo(".lead__title", ".lead__subtitle");

//кнопка открытия попапа редактирования профиля
document.querySelector(".lead__pencil").addEventListener("click", () => {
  editProfPopup._form.initialExplorer.value = addUser.getUserInfo().name;
  editProfPopup._form.rankExplorer.value = addUser.getUserInfo().description;
  editProfPopup.open();
});
//кнопка отгрытия попапа добавления карточки
document.querySelector(".lead__button").addEventListener("click", () => {
  addCardfPopup.open();
});

const editProfPopup = new PopupWithForm(".profile-popup", (data) => {
  const{name,description}=data;
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
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
