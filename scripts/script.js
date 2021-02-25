//ПЕРЕМЕННЫЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ (РП)//
const profileEditButton = document.querySelector(".lead__pencil"); //кнопка с карандашом//
const crossClosePopup = document.querySelector(".popup__close-cross"); //крест закрытия попапа//
const leadElementInitial = document.querySelector(".lead__title"); //имя исследователя//
const leadElementExplorer = document.querySelector(".lead__subtitle"); //звание исследователя//

const formEditing = document.forms.formExplorers; //переменная полей формы РП//
const inputName = formEditing.elements.initialExplorer; //поле ввода имени исследователя//
const inputExplorer = formEditing.elements.rankExplorer; //поле ввода звания исследователя//
const popup = document.querySelector(".popup"); //подложка попапа//
const submitButton = document.querySelector(".popup__submit-btn"); //кнопка сохранить изменения//
const formElements = document.querySelector(".popup__inputs"); //поля ввода//
const titleAddCardForm = document.querySelector(".popup__title"); //название формы//
const popupContainer = document.querySelector(".popup__container"); //форма РП//

//ПЕРЕМЕННЫЕ ФОРМЫ ДОБАВЛЕНИЯ  КАРТОЧКИ(ДК)//
const crossClosePopupCard = document.querySelector(".popup-card__close-cross"); //крест закрытия формы ДК//
const formAdding = document.forms.formCards; //переменная полей формы ДК//
const inputPlace = formAdding.elements.placeName;
const inputFoto = formAdding.elements.linkName;
const popupCard = document.querySelector(".popup-card"); //подложка формы ДК//
const submitButtonCard = document.querySelector(".popup-card__submit-btn"); //кнопка создать карточку//
const formElementsCard = document.querySelector(".popup-card__inputs"); //поля ввода формы ДК//
const fotoCard = document.querySelector(".foto-open"); //подложка попапа c фото//
const crossClosePopupFoto = document.querySelector(".foto-open__cross"); //крест закрытия попапа с фото//
const addCardButton = document.querySelector(".lead__button"); //кнопка открытия формы ДК//

//функция открытия попапов//
function openPopup(open) {
  open.classList.add("popup_opened");
}

//функция закрытия попапов//
function closePopup(close) {
  close.classList.remove("popup_opened");
}

//закрытие формы РП через крест и оверлей//
popup.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup__close-cross")) {
    closePopup(popup);
  }
  if (evt.target.classList.contains("popup")) {
    closePopup(popup);
  }
});
//закрытие форм РП, ДК, попапа с фото через ESC//
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(popup);
    closePopup(popupCard);
    closePopup(fotoCard);
  }
});

//закрытие формы ДК через крест и оверлей//
popupCard.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup-card__close-cross")) {
    closePopup(popupCard);
    formAdding.reset();
  }
  if (evt.target.classList.contains("popup-card")) {
    closePopup(popupCard);
    formAdding.reset();
  }
});
//закрытие попапа с фото через крест и оверлей//
fotoCard.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("foto-open__cross")) {
    closePopup(fotoCard);
  }
  if (evt.target.classList.contains("foto-open")) {
    closePopup(fotoCard);
  }
});

//слушатель открытия  формы РП  и вывод предыдущих значений//

profileEditButton.addEventListener("click", function () {
  openPopup(popup);
  inputName.value = leadElementInitial.textContent;
  inputExplorer.value = leadElementExplorer.textContent;
});

// слушатель открытия формы ДК//

addCardButton.addEventListener("click", function () {
  openPopup(popupCard);
});

//ДОБАВЛЕНИЕ КАРТОЧЕК//
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const sectionGrid = document.querySelector(".foto-grid"); //cекция для карточек//
const cardTemplate = document.querySelector(".foto-grid__template").content; //переменная темплейта//

//функция для генерации карточек из массива//
function addCard(Card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementFoto = cardElement.querySelector(".foto-grid__item");
  cardElement.querySelector(".foto-grid__name-title").textContent = Card.name;
  cardElementFoto.src = Card.link;
  cardElementFoto.alt = Card.name;

  //удаление карточки//
  const urnButton = cardElement.querySelector(".foto-grid__urn");
  urnButton.addEventListener("click", function (evt) {
    const deletUrnButton = evt.target.closest(".foto-grid__card");
    deletUrnButton.remove();
  });
  //лайки//
  const heartButton = cardElement.querySelector(".foto-grid__name-heart");
  heartButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("foto-grid__name-heart_black");
  });
  //открытие попапа с фото//
  const imageButton = cardElement.querySelector(".foto-grid__item");
  const imageLink = document.querySelector(".foto-open__image");
  const nameCard = document.querySelector(".foto-open__name");
  imageButton.addEventListener("click", function () {
    openPopup(fotoCard);
    nameCard.textContent = Card.name;
    imageLink.src = Card.link;
  });
  return cardElement;
}

function renderCard(Card) {
  sectionGrid.prepend(Card);
}
//функция генерации новой карточки//
function initialCard() {
  const inputText = inputPlace.value;
  const inputLink = inputFoto.value;
  const cardItem = addCard({ name: inputText, link: inputLink });
  sectionGrid.prepend(cardItem);
}

//цикл вставки массива карточек//

initialCards.forEach((item) => {
  renderCard(addCard(item));
});

//функция для отправки формы ДК//
function submitCardForm(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  initialCard();
  formAdding.reset();
}
//слушатель для отправки формы ДК//

formElementsCard.addEventListener("submit", submitCardForm);

//закрытие формы РП  и сохранение данных исследователей//
function handleFormSubmit(evt) {
  evt.preventDefault();
  leadElementInitial.textContent = inputName.value;
  leadElementExplorer.textContent = inputExplorer.value;
  closePopup(popup);
}
formElements.addEventListener("submit", handleFormSubmit);
