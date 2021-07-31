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
} from "../js/utils/constants.js";
import FormValidator from "../js/components/FormValidator.js";
import { config } from "../js/utils/config.js";
import Section from "../js/components/Section.js";
import PopupWithImage from "../js/components/PopupWithImage.js";
import UserAvatar from "../js/components/UserAvatar.js";
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

let userData;

//полученние данных о пользователе при загрузке страницы//
api
  .getInfoAboutUser()
  .then((data) => {
    editUserAvatar.setUserAvatar(data);
    addUser.setUserInfo(data);
    return data;
  })
  .then((data) => {
    userData = data;
  })
  .catch((err) => {
    console.log("Ошибка получения информации о пользователе");
  });

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
  viewLoading(true);
  api
    .setAvatarUser(data)
    .then(() => {
      editUserAvatar.setUserAvatar(data);
    })
    .then(() => {
      editAvatar.close();
    })
    .catch((err) => {
      console.log("Ошибка при отправлении данных аватара");
    })
    .finally(() => {
      viewLoading(false);
    });
});
//редактирование профиля//
const editProfile = new PopupWithForm(".profile-popup", (data) => {
  viewLoading(true);
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
      viewLoading(false);
    });
});

//добавление карточки через попап//
const addCardfPopup = new PopupWithForm(".popup-card", (data) => {
  const cardData = [{}];
  cardData[0].name = data.placeName;
  cardData[0].link = data.linkName;
  viewLoading(true);
  api
    .addCard(cardData[0])
    .then((cardData) => {
      cards([cardData]);
    })
    .then(() => {
      addCardfPopup.close();
    })
    .catch((err) => {
      console.log("Ошибка при отправлении данных карточек");
    })
    .finally(() => {
      viewLoading(false);
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
function viewLoading(isLoading) {
  if (isLoading) {
    Array.from(savedSubmits).forEach((submit) => {
      submit.textContent = "Сохранение...";
    });
  } else {
    Array.from(savedSubmits).forEach((submit) => {
      submit.textContent = "Сохранить";
    });
  }
}

//функция создания карточек//
function cards(dataCards) {
  const cardOfList = new Section(
    {
      renderer: (item) => {
        const card = new Card({
          item: item,
          ownerID: userData._id,
          cardSelector: ".foto-grid__template",
          handleClickLike: (name, link) => {
            popupImage.open(name, link);
          },
          handleDeleteCard: () => cardDelete(card),
          handleClickLike: () => handleClickLike(card, item),
        });
        const cardElement = card.generateCard();
        cardOfList.addItem(cardElement);
      },
    },
    ".foto-grid"
  );
  cardOfList.renderItems(dataCards);
}
//получение данных первоначальных карточек с сервера//
api
  .getCards()
  .then((cardsData) => {
    cards(cardsData);
  })
  .catch((err) => {
    console.log("Ошибка при получения данных карточек");
  });

//валидация формы редактирования профиля//
const editFormValidator = new FormValidator(config, formEditing);
//валидация формы добавления карточки//
const cardFormValidator = new FormValidator(config, formAdding);
//валидация формы редактирования аватара//
const avatarFormValidator = new FormValidator(config, formAvatar);
