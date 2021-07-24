import './index.css';
import UserInfo from "../js/components/UserInfo.js";
import PopupWithForm from "../js/components/PopupWithForm.js";
import Card from "../js/components/Card.js";
import { editProfBtn, addCardBtn, editAvatarBtn, url, token,likesQty } from "../js/utils/constants.js";
import FormValidator from "../js/components/FormValidator.js";
import { config } from "../js/utils/config.js";
import Section from "../js/components/Section.js";
import PopupWithImage from "../js/components/PopupWithImage.js";
import UserAvatar from '../js/components/UserAvatar.js';
import Api from '../js/components/Api.js';


const formEditing = document.forms.formExplorers; //переменная полей формы РП//
const formAdding = document.forms.formCards; //переменная полей формы ДК//
const formAvatar = document.forms.formAvatar; //переменная полей формы РА//

const api = new Api({
  url: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  }
});
//полученние данных о пользователе при загрузке страницы//
api.getInfoAboutUser().then(
  data => {
    editUserAvatar.setUserAvatar(data);
    addUser.setUserInfo(data);
  }
).catch(err=>{
  console.log('Ошибка получения информации о пользователе')
})




const addUser = new UserInfo(".lead__title", ".lead__subtitle");

const editUserAvatar = new UserAvatar(".lead__image");

//кнопка открытия попапа редактирования профиля
editProfBtn.addEventListener("click", () => {
  formEditing.elements.name.value = addUser.getUserInfo().name;
  formEditing.elements.about.value = addUser.getUserInfo().description;
  editProfile.open();
  editFormValidator.enableValidation();
});

//кнопка открытия попапа редактирования аватара
editAvatarBtn.addEventListener("click", () => {
  editAvatar.open();
  avatarFormValidator.enableValidation();
});

//кнопка открытия попапа добавления карточки
addCardBtn.addEventListener("click", () => {
  addCardfPopup.open();
  cardFormValidator.enableValidation();
});

//редактирование автара//
const editAvatar = new PopupWithForm(".popup-avatar", (data) => {
  api.setAvatarUser(data)
  .then(res=>{
    console.log(res)
  })
  editUserAvatar.setUserAvatar(data);
  editAvatar.close();
});
//редактирование профиля//
const editProfile = new PopupWithForm(".profile-popup", (data) => {
  api.setInfoAboutUser(data)
  .then(res=>{
    addUser.setUserInfo(res);
  })
  editProfile.close();
});



//добавление карточки через попап//
const addCardfPopup = new PopupWithForm(".popup-card", (data) => {
  const cardData = [{}];
  cardData[0].name = data.placeName;
  cardData[0].link = data.linkName;

  api.addCard(cardData[0])
    .then(cardData => {
      cards([cardData])
    })
    .catch(err => {
      console.log("Ошибка при отправлении данных карточек")
    })

  addCardfPopup.close();
});



const popupImage = new PopupWithImage(".foto-open");

editProfile.setEventListeners();
editAvatar.setEventListeners();
popupImage.setEventListeners();
addCardfPopup.setEventListeners();

//функция создания карточек//
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
//получение данных первоначальных карточек с сервера//
api.getCards()
  .then(cardsData => {
    cards(cardsData);
  }).catch(err => {
    console.log("Ошибка при получения данных карточек")
  })

//валидация формы редактирования профиля//
const editFormValidator = new FormValidator(config, formEditing);
//валидация формы добавления карточки//
const cardFormValidator = new FormValidator(config, formAdding);
//валидация формы редактирования аватара//
const avatarFormValidator = new FormValidator(config, formAvatar);

