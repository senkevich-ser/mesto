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

const addUser = new UserInfo(".lead__title", ".lead__subtitle");

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
  viewLoading(true, editAvatar);
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
      viewLoading(false, editAvatar);
    });
});
//редактирование профиля//
const editProfile = new PopupWithForm(".profile-popup", (data) => {
  viewLoading(true, editProfile);
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
      viewLoading(false, editProfile);
    });
});

//добавление карточки через попап//
const addCardfPopup = new PopupWithForm(".popup-card", (data) => {
  viewLoading(true, addCardfPopup);
  const cardData = [{}];
  cardData[0].name = data.placeName;
  cardData[0].link = data.linkName;
  api
    .addCard(cardData[0])
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
      viewLoading(false, addCardfPopup);
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

//функция вида кнопки сабмита при загрузке данных//
function viewLoading(isLoading, form) {
  if (isLoading) {
    form._form.querySelector(".popup__submit-btn").textContent =
      "Сохранение...";
  } else {
    form._form.querySelector(".popup__submit-btn").textContent = "Сохранить";
  }
}
let currentUserId;
//функция создания карточек//
function createCard(dataCard) {
  const card = new Card({
    item: dataCard,
    ownerID: currentUserId,
    cardSelector: ".foto-grid__template",
    handleClickLike: (name, link) => {
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
    avatarImg.src = userData.avatar;
    currentUserId = userData._id;
    cardOfList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err}`);
  });
