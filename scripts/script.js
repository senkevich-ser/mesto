let profileEditButton = document.querySelector(".lead__pencil");
let crossClosePopup = document.querySelector(".popup__close");
let leadElementInitial = document.querySelector(".lead__title");
let leadElementExplorer = document.querySelector(".lead__subtitle");
let inputName = document.querySelector(".popup__input-text_type_name");
let inputExplorer = document.querySelector(".popup__input-text_type_explorer");
let popup = document.querySelector(".popup");
let submitButton = document.querySelector(".popup__submit-btn");
let formElement = document.querySelector(".popup__inputs");

function openPopup() {
  popup.classList.add("popup_opened");
}
function closePopup() {
  popup.classList.remove("popup_opened");
}
profileEditButton.addEventListener("click", function () {
  openPopap();
  inputName.value = leadElementInitial.textContent;
  inputExplorer.value = leadElementExplorer.textContent;
});

crossClosePopup.addEventListener("click", function () {
  closePopup();
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  leadElementInitial.textContent = inputName.value;
  leadElementExplorer.textContent = inputExplorer.value;
  closePopup();
}
formElement.addEventListener("submit", handleFormSubmit);
