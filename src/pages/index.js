import "./index.css";
import UserInfo from "../js/components/UserInfo.js";
import PopupWithForm from "../js/components/PopupWithForm.js";
import Card from "../js/components/Card.js";
import {
  editProfBtn,
  addCardBtn,
  editAvatarBtn,
  url,
  token,
  savedSubmits,
  avatarImg,
} from "../js/utils/constants.js";
import FormValidator from "../js/components/FormValidator.js";
import { config } from "../js/utils/config.js";
import Section from "../js/components/Section.js";
import PopupWithImage from "../js/components/PopupWithImage.js";
import Api from "../js/components/Api.js";
import PopupWithSubmit from "../js/components/PopupWithSubmit.js";

const formEditing = document.forms.formExplorers; //переменная полей формы РП//
const formAdding = document.forms.formCards; //переменная полей формы ДК//
const formAvatar = document.forms.formAvatar; //переменная полей формы РА//

const api = new Api({
  url: url,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

const addUser = new UserInfo(".lead__title", ".lead__subtitle", ".lead__image");

//кнопка открытия попапа редактирования профиля
editProfBtn.addEventListener("click", () => {
  editFormValidator.disableForm();
  formEditing.elements.name.value = addUser.getUserInfo().name;
  formEditing.elements.about.value = addUser.getUserInfo().description;
  editProfile.open();
});

//кнопка открытия попапа редактирования аватара
editAvatarBtn.addEventListener("click", () => {
  avatarFormValidator.disableForm();
  editAvatar.open();
});

//кнопка открытия попапа добавления карточки
addCardBtn.addEventListener("click", () => {
  cardFormValidator.disableForm();
  addCardfPopup.open();
});

//редактирование автара//
const editAvatar = new PopupWithForm(".popup-avatar", (data) => {
  console.log(data)
  editAvatar.renderLoading(true);
  api
    .setAvatarUser(data)
    .then((data) => {
      avatarImg.src = data.avatar;
    })
    .then(() => {
      editAvatar.close();
    })
    .catch((err) => {
      console.log("Ошибка при отправлении данных аватара");
    })
    .finally(() => {
      editAvatar.renderLoading(false);
    });
});
//редактирование профиля//
const editProfile = new PopupWithForm(".profile-popup", (data) => {
  editProfile.renderLoading(true);
  api
    .setInfoAboutUser(data)
    .then((res) => {
      addUser.setUserInfo(res);
    })
    .then(() => {
      editProfile.close();
    })
    .catch((err) => {
      console.log("Ошибка при отправлении данных профиля");
    })
    .finally(() => {
      editProfile.renderLoading(false);
    });
});

//добавление карточки через попап//
const addCardfPopup = new PopupWithForm(".popup-card", (data) => {
  addCardfPopup.renderLoading(true);
  const cardData = {};
  cardData.name = data.placeName;
  cardData.link = data.linkName;
  api
    .addCard(cardData)
    .then((cardData) => {
      cardOfList.addItem(createCard(cardData));
    })
    .then(() => {
      addCardfPopup.close();
    })
    .catch((err) => {
      console.log("Ошибка при отправлении данных карточек");
    })
    .finally(() => {
      addCardfPopup.renderLoading(false);
    });
});

//фунукция добавления лайков//
function handleClickLike(card, data) {
  const promise = card.isLiked()
    ? api.dislikeCard(data._id)
    : api.likeCard(data._id);
  promise
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

const popupImage = new PopupWithImage(".foto-open");

editProfile.setEventListeners();
editAvatar.setEventListeners();
popupImage.setEventListeners();
addCardfPopup.setEventListeners();

const popupDeleteCard = new PopupWithSubmit(".popup-deleteCard");
popupDeleteCard.setEventListeners();

function cardDelete(card) {
  popupDeleteCard.setFormSubmit(() => {
    api
      .deleteCard(card._item._id)
      .then(() => {
        card.cardDelete();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  });
  popupDeleteCard.open();
}

let currentUserId;
//функция создания карточек//
function createCard(dataCard) {
  const card = new Card({
    item: dataCard,
    ownerID: currentUserId,
    cardSelector: ".foto-grid__template",
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleDeleteCard: () => cardDelete(card),
    handleClickLike: () => handleClickLike(card, dataCard),
  });
  return card.generateCard();
}

const cardOfList = new Section(
  {
    renderer: (item) => {
      cardOfList.addItem(createCard(item));
    },
  },
  ".foto-grid"
);

//валидация формы редактирования профиля//
const editFormValidator = new FormValidator(config, formEditing);
editFormValidator.enableValidation();

//валидация формы добавления карточки//
const cardFormValidator = new FormValidator(config, formAdding);
cardFormValidator.enableValidation();
//валидация формы редактирования аватара//
const avatarFormValidator = new FormValidator(config, formAvatar);
avatarFormValidator.enableValidation();

//получение персональных данных с сервера и массива карточек
Promise.all([api.getCards(), api.getInfoAboutUser()])
  .then(([cards, userData]) => {
    addUser.setUserInfo(userData);
    addUser.setAvatar(userData);
    currentUserId = addUser.setId(userData);
    cardOfList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err}`);
  });
