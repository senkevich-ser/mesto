import UserInfo from "../components/userInfo.js";
import PopupWithForm from "../components/popupWithForm.js";
import Card from "../components/card.js";
import { initialCards } from "../utils/constants.js";
import FormValidator from "../components/formValidator.js";
import { config } from "../utils/config.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";

const formEditing = document.forms.formExplorers; //переменная полей формы РП//

const formAdding = document.forms.formCards; //переменная полей формы ДК//

document.addEventListener("click", (evt) => {
  menagePopups(evt);
});

function menagePopups(evt) {
  if (evt.target.classList.contains("lead__pencil")) {
    const editProfPopup = new PopupWithForm(".popup", (data) => {
      addUser.setUserInfo(data);

      editProfPopup.close();
    });
    const addUser = new UserInfo(".lead__title", ".lead__subtitle");
    editProfPopup._form.initialExplorer.value = addUser.getUserInfo().name;
    editProfPopup._form.rankExplorer.value = addUser.getUserInfo().rank;
    editProfPopup.open();
  }
  if (evt.target.classList.contains("lead__button")) {
    const addCardfPopup = new PopupWithForm(".popup-card", (data) => {
      const cardData = [{}];
      cardData[0].name = data.placeName;
      cardData[0].link = data.linkName;
      cards(cardData);
      addCardfPopup.close();
    });
    addCardfPopup.open();
  }
}

function cards(dataCards) {
  const cardOfList = new Section(
    {
      data: dataCards,
      renderer: (item) => {
        const card = new Card(item, ".foto-grid__template", (evt) => {
          const popupImage = new PopupWithImage(".foto-open");
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
