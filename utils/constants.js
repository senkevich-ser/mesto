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
const popupElement = document.querySelector(".foto-open"); //подложка попапа c фото/
const popupImage = document.querySelector(".foto-open__image"); //элемент увеличенного фото  карточки//
const popupCloseButton = document.querySelector(".popup__close-cross"); //крест закрытия увеличенного фото//
const popupElementName = document.querySelector(".foto-open__name"); //элемент названия места  увеличенной карточки//
export{initialCards,popupElement,popupImage,popupCloseButton,popupElementName}
