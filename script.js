let openPopup = document.querySelector(".lead__pencil");
let closePopup = document.querySelector(".popup__close");
let leadElementInitial = document.querySelector(".lead__title");
let leadElementExplorer = document.querySelector(".lead__subtitle");
let inputs = document.querySelectorAll("input");

openPopup.addEventListener("click", function () {
  let popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");
  inputs[0].value = leadElementInitial.textContent;
  inputs[1].value = leadElementExplorer.textContent;
});

closePopup.addEventListener("click", function () {
  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
});



  let submitButton = document.querySelector(".popup__submit-btn");
  submitButton.addEventListener("click", function () {
    leadElementInitial.textContent = inputs[0].value;
    leadElementExplorer.textContent = inputs[1].value;
    popup = document.querySelector(".popup");
    popup.classList.remove("popup_opened");
  });
  